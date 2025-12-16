// import { useAuthStore } from '@/store/authStore';
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import BurgerIconSvg from "@/assets/burgerIcon.svg";
import People from "@/assets/people.svg";
import { useState } from "react";
import { DropdownList } from "../../../components/ui/DropdownList";
import { StudySessionUpdateModal } from "@/features/study/component/StudySessionUpdateModal";
import type { StudySessionDetail } from "../api/studyType";
import type { ApiResponse } from "@/lib/api/apiClient";
import type { AxiosError } from "axios";
import { updateStudySessionApi } from "../api/study";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studyQueryKeys } from "../api/queries";

interface MyStudySessionCardProps {
  isLeader: boolean;
  studySession: StudySessionDetail;
}

export function StudySessionCard({ studySession }: MyStudySessionCardProps) {
  const { studyId } = useParams<{ studyId: string }>();
  const studyIdNum = Number(studyId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 버거 아이콘 클릭되었는지 상태 관리
  const [isBurgerIconClicked, setIsBurgerIconClicked] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleCardClick = () => {
    navigate(`/study/my/${studyId}/${studySession.sessionId}`);
  };

  const { mutate: updateStudySession } = useMutation<
    ApiResponse<null>,
    AxiosError<ApiResponse<null>>,
    { sessionId: number; title: string }
  >({
    mutationFn: ({ sessionId, title }) =>
      updateStudySessionApi(sessionId, title),
    onSuccess: async () => {
      alert("스터디 일지가 수정되었습니다.");
      setIsUpdateModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: studyQueryKeys.studySessions(studyIdNum),
      });
    },
    onError: (error) => {
      alert(
        error.response?.data?.message || "스터디 일지 수정에 실패했습니다."
      );
    },
  });

  const handleUpdateStudySession = (title: string) => {
    console.log("Updating study session:", studySession.sessionId, title);
    updateStudySession({ sessionId: studySession.sessionId, title });
  };

  const handleBurgerIconSelect = (option: string) => {
    console.log(`선택된 옵션: ${option}`);
    if (option == "수정하기") {
      setIsUpdateModalOpen(true);
    } else if (option == "삭제하기") {
      // TODO 삭제하기 기능 구현
    } else if (option == "상태변경") {
      // TODO 상태변경 기능 구현
    }
    setIsBurgerIconClicked(false);
  };

  return (
    <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
      <div className="flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-5">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <p className="text-gray-300 text-body-1-semibold">
                {studySession.sessionNumber}회차
              </p>
              <h3 className="heading-3">{studySession.title}</h3>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsBurgerIconClicked(!isBurgerIconClicked)}
                className="relative"
              >
                <img
                  src={BurgerIconSvg}
                  alt="버거 아이콘"
                  className="w-6 h-6"
                />
              </button>
              {isBurgerIconClicked && (
                <div className="absolute top-full left-[-90px] mt-1 w-[200px]">
                  <DropdownList
                    options={["상태변경", "수정하기", "삭제하기"]}
                    onSelect={handleBurgerIconSelect}
                  />
                </div>
              )}
            </div>
          </div>
          <hr className="border-t-3 border-gray-100" />
          <div className="flex items-center gap-1">
            <img src={People} alt="People" className="px-[2px] w-5 h-5" />
            <span className="text-body-2-semibold text-gray-400">
              제출 멤버 {studySession.submittedCount}명
            </span>
          </div>
          <Button variant="solid" onClick={handleCardClick}>
            스터디 일지 보기
          </Button>
        </div>
      </div>
      <StudySessionUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleUpdateStudySession}
        currSessionId={studySession.sessionId}
        currTitle={studySession.title}
      />
    </div>
  );
}
