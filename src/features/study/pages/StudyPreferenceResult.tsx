import { AuthHeader } from "@/components/layout/AuthHeader";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { StudyPreferenceRegisterModal } from "../component/StudyPreferenceRegisterModal";
import CarefulSong from "@/assets/testResult2/속성 1=꼼꼼송이.svg";
import PalrangSong from "@/assets/testResult2/속성 1=팔랑송이.svg";
import DoranSong from "@/assets/testResult2/속성 1=도란송이.svg";
import BeonjjeokSong from "@/assets/testResult2/속성 1=번쩍송이.png";
import AlsongSong from "@/assets/testResult2/속성 1=알쏭송이.svg";
import DeundeunSong from "@/assets/testResult2/속성 1=든든송이.svg";
import KkankkanSong from "@/assets/testResult2/속성 1=깐깐송이.svg";
import BanggeutSong from "@/assets/testResult2/속성 1=방긋송이.svg";
import ToktokSong from "@/assets/testResult2/속성 1=톡톡송이.svg";
import EusseukSong from "@/assets/testResult2/속성 1=으쓱송이.svg";
import AllrounderSong from "@/assets/testResult2/속성 1=올라운더송이.svg";

import TestSmile from "@/assets/testResult/testSmile.svg";
import TestWarning from "@/assets/testResult/testWarning.svg";
import { useMutation } from "@tanstack/react-query";
import type { PreferenceResult, PreferenceSave } from "../api/studyType";
import type { ApiResponse } from "@/lib/api/apiClient";
import type { AxiosError } from "axios";
import { saveStudyPreferenceProfileApi } from "../api/study";

export function StudyPreferenceResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { result?: PreferenceResult } | null;
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

  const { mutate: saveStudyPreference } = useMutation<
    PreferenceSave,
    AxiosError<ApiResponse<null>>,
    { testId: number }
  >({
    mutationFn: ({ testId }) => saveStudyPreferenceProfileApi(testId),
    onSuccess: async (_data) => {
      // alert("스터디 성향이 저장되었습니다.");
      console.log("Study Preference Result:", _data);
      setRegisterStudyPreferenceModalOpen(false);
      navigate("/my-page");
    },
    onError: (error) => {
      alert(
        error.response?.data?.message || "스터디 성향 저장에 실패했습니다."
      );
    },
  });

  const registerStudyPreference = () => {
    saveStudyPreference({ testId: result.testId });
  };

  const retryTest = () => {
    navigate("/study/preference-test/question/1", { replace: true });
  };

  // testId와 이미지 경로 맵핑
  const testResultImageMap: Record<number, string> = {
    1: CarefulSong, // 꼼꼼송이
    2: PalrangSong, // 팔랑송이
    3: DoranSong, // 도란송이
    4: BeonjjeokSong, // 번쩍송이
    5: AlsongSong, // 알쏭송이
    6: DeundeunSong, // 든든송이
    7: KkankkanSong, // 깐깐송이
    8: BanggeutSong, // 방긋송이
    9: ToktokSong, // 톡톡송이
    10: EusseukSong, // 으쓱송이
    11: AllrounderSong, // 올라운더송이
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <AuthHeader />

      <main className="flex flex-col w-full max-w-[730px] mt-[88px] px-10 py-10 gap-y-10 overflow-y-auto justify-center">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-1">
            <h1 className="heading-1 text-primary-500">
              {result.resultType.typeName}
            </h1>
            <span className="text-gray-300 text-body-1">
              {" "}
              {result.resultType.typeCategory}
            </span>
          </div>
          <p className="text-gray-500 text-body-1-semibold">
            {result.resultType.tagline}
          </p>
        </div>

        <img
          src={testResultImageMap[result.testId]}
          alt="꼼꼼송이 이미지"
          className="mx-auto"
        />
        <div className="flex gap-[12px]">
          <div className="bg-primary-100 rounded-[10px] px-5 py-5 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <img src={TestSmile} alt="긍정적인 면" />
              <p className="text-primary-500 text-body-2-semibold">
                나의 숙터디 성향이에요
              </p>
            </div>
            <p className="text-gray-400 text-body-1">
              {result.resultType.description}
            </p>
          </div>
          <div className="bg-error-100 rounded-[10px] px-5 py-5 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <img src={TestWarning} alt="조심할 점" />
              <p className="text-error-200 text-body-2-semibold">조심하숙!</p>
            </div>
            <p className="text-gray-400 text-body-1">
              {result.resultType.caution}
            </p>
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
