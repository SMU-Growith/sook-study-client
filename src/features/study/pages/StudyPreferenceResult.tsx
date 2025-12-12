import { AuthHeader } from "@/components/layout/AuthHeader";
import Desc1 from "@/assets/preferences/carefulSongDesc1.svg";
import Desc2 from "@/assets/preferences/carefulSongDesc2.svg";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { StudyPreferenceRegisterModal } from "../component/StudyPreferenceRegisterModal";
import CarefulSong from "@/assets/testResult/carefulSong.svg";
import TestSmile from "@/assets/testResult/testSmile.svg";
import TestWarning from "@/assets/testResult/testWarning.svg";

type StudyPreferenceResultData = {
  name: string;
  type: string;
  ment: string;
  introduction: string;
  warning: string;
};

export function StudyPreferenceResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { result?: StudyPreferenceResultData } | null;
  const result = state?.result;
  const [
    registerStudyPreferenceModalOpen,
    setRegisterStudyPreferenceModalOpen,
  ] = useState(false);

  useEffect(() => {
    if (!result) {
      navigate("/study/preference-test/question/1", { replace: true });
    }
  }, [result, navigate]);

  if (!result) return null;

  const registerStudyPreference = () => {
    // 스터디성향 등록 api 호출
    setRegisterStudyPreferenceModalOpen(false);
    navigate("/my-page");
  };

  const retryTest = () => {
    navigate("/study/preference-test/question/1", { replace: true });
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <AuthHeader />

      <main className="flex flex-col w-full max-w-[730px] mt-[88px] px-10 py-10 gap-y-10 overflow-y-auto justify-center">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-1">
            <h1 className="heading-1 text-primary-500">{result.name}</h1>
            <span className="text-gray-300 text-body-1"> {result.type}</span>
          </div>
          <p className="text-gray-500 text-body-1-semibold">{result.ment}</p>
        </div>
        <img src={CarefulSong} alt="꼼꼼송이 이미지" className="mx-auto" />
        <div className="flex gap-[12px]">
          <div className="bg-primary-100 rounded-[10px] px-5 py-5 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <img src={TestSmile} alt="긍정적인 면" />
              <p className="text-primary-500 text-body-2-semibold">
                나의 숙터디 성향이에요
              </p>
            </div>
            <p className="text-gray-400 text-body-1">{result.introduction}</p>
          </div>
          <div className="bg-error-100 rounded-[10px] px-5 py-5 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <img src={TestWarning} alt="조심할 점" />
              <p className="text-error-200 text-body-2-semibold">조심하숙!</p>
            </div>
            <p className="text-gray-400 text-body-1">{result.warning}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => setRegisterStudyPreferenceModalOpen(true)}
          >
            내 성향과 일치해요!
          </Button>
          <Button variant="default" size="md" onClick={retryTest}>
            테스트 다시하기
          </Button>
          {registerStudyPreferenceModalOpen && (
            <StudyPreferenceRegisterModal
              isOpen={registerStudyPreferenceModalOpen}
              onClose={() => setRegisterStudyPreferenceModalOpen(false)}
              onConfirm={() => {
                registerStudyPreference();
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
