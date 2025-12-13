import { Modal } from "@/components/ui/Modal";
import CloseSvg from "@/assets/icons/close.svg";
import { InputField } from "@/components/ui/InputField";
import { TextAreaField } from "@/components/ui/TextAreaField";
import { useEffect, useState } from "react";

import HeartReactionSvg from "@/assets/reactions/heartReaction.svg";
import LikeReactionSvg from "@/assets/reactions/likeReaction.svg";
import SmileReactionSvg from "@/assets/reactions/smileReaction.svg";
import SurpriseReactionSvg from "@/assets/reactions/surpriseReaction.svg";
import CuriosityReactionSvg from "@/assets/reactions/questionReaction.svg";

import HeartCountSvg from "@/assets/reactions/heartCount.svg";
import LikeCountSvg from "@/assets/reactions/likeCount.svg";
import LaughCountSvg from "@/assets/reactions/laughCount.svg";
import SurpriseCountSvg from "@/assets/reactions/surpriseCount.svg";
import CuriosityCountSvg from "@/assets/reactions/questionCount.svg";

import HeartFillSvg from "@/assets/reactions/heartFill.svg";
import LikeFillSvg from "@/assets/reactions/likeFill.svg";
import LaughFillSvg from "@/assets/reactions/laughFill.svg";
import SurpriseFillSvg from "@/assets/reactions/surpriseFill.svg";
import CuriosityFillSvg from "@/assets/reactions/questionFill.svg";

import StudyLog1 from "@/assets/studyLogs/studyLog1.svg";
import StudyLog2 from "@/assets/studyLogs/studyLog2.svg";
import StudyLog3 from "@/assets/studyLogs/studyLog3.svg";
import { CarouselNavButtons } from "@/components/ui/CarouselNavButtons";
import type { EmojiCounts, StudyLogDetail } from "../api/studyType";
import { Badge } from "@/components/ui/Badge";
import StudyLeader from "@/assets/studyLeader.svg";
import StudyMember from "@/assets/studyMember.svg";
import type { ApiResponse } from "@/lib/api/apiClient";
import type { AxiosError } from "axios";
import { toggleStudyLogEmojiApi } from "../api/study";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { studyQueryKeys } from "../api/queries";

const CARDS_PER_VIEW = 1;
const MOVE_BY = 1;

type EmojiType = "heart" | "like" | "laugh" | "surprise" | "curiosity";

interface StudyLogReadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sessionId: number;
  logDetail?: StudyLogDetail;
}
export function StudyLogReadModal({
  isOpen,
  onClose,
  sessionId,
  logDetail,
}: StudyLogReadModalProps) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isOpen || !logDetail) return;
  }, [isOpen, logDetail]);

  const { mutate: toggleEmoji } = useMutation<
    EmojiCounts,
    AxiosError<ApiResponse<null>>,
    { journalId: number; emojiType: EmojiType }
  >({
    mutationFn: ({ journalId, emojiType }) =>
      toggleStudyLogEmojiApi(journalId, emojiType),
    onSuccess: async (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: studyQueryKeys.studyLogDetail(vars.journalId),
      });
    },
    onError: (error) => {
      alert(
        error.response?.data?.message || "스터디 일지 반응 수정에 실패했습니다."
      );
    },
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [StudyLog1, StudyLog2, StudyLog3]; // TODO 실제 이미지 데이터로 교체 필요
  const totalStudies = images.length;

  if (!logDetail) return null;

  const journalId = logDetail.journalId;

  const emojiCounts = logDetail.emojiCounts;
  const emojiStatus = logDetail.emojiStatus;

  const heartCount = emojiCounts?.heart ?? 0;
  const likeCount = emojiCounts?.like ?? 0;
  const laughCount = emojiCounts?.laugh ?? 0;
  const surpriseCount = emojiCounts?.surprise ?? 0;
  const curiosityCount = emojiCounts?.curiosity ?? 0;

  const isHearted = Boolean(emojiStatus?.heart);
  const isLiked = Boolean(emojiStatus?.like);
  const isLaughing = Boolean(emojiStatus?.laugh);
  const isSurprised = Boolean(emojiStatus?.surprise);
  const isCuriosity = Boolean(emojiStatus?.curiosity);

  const handleToggle = (emojiType: EmojiType) => {
    if (!journalId) return;
    toggleEmoji({ journalId, emojiType });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - MOVE_BY, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + MOVE_BY, totalStudies - CARDS_PER_VIEW)
    );
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < totalStudies - CARDS_PER_VIEW;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[550px]">
      <div className="flex flex-col text-left relative pt-4">
        <button onClick={onClose} className="absolute top-[-10px] right-0">
          <img src={CloseSvg} alt="닫기" className="w-6 h-6" />
        </button>
        <p className="text-gray-300 text-body-1-semibold mb-[22px]">
          {sessionId}회차
        </p>
        <p className="text-gray-500 text-body-1-semibold mb-2">
          {logDetail.title}
        </p>
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant={logDetail?.studyRole === "MEMBER" ? "yellow" : "purple"}
            icon={logDetail?.studyRole === "MEMBER" ? StudyMember : StudyLeader}
          >
            {logDetail?.studyRole === "MEMBER" ? "스터디원" : "스터디장"}
          </Badge>
          <span className="text-body-2-semibold text-gray-300">
            {logDetail?.nickName}
          </span>
        </div>
        <hr className="border-t-3 border-gray-100 mb-[22px]" />
        <div className="flex flex-col gap-4">
          <TextAreaField
            label="스터디 내용"
            placeholder="이번 주차에 어떤 스터디를 했는지 작성해주세요."
            rows={6}
            value={logDetail?.content}
            readOnly
          />
          <InputField
            label="링크"
            placeholder="따로 정리한 링크가 있다면 첨부해주세요."
            value={logDetail?.url}
            readOnly
          />
          {/* <InputField
            label="첨부파일"
            placeholder="사진 및 파일을 첨부해주세요."
            value={logDetail?.attachments.map((att) => att.fileName).join(", ")}
            readOnly
          /> */}
        </div>
        <div className="flex flex-col gap-4">
          {/* <div className="mt-4 w-full">
            <div className="w-full h-[260px] overflow-hidden flex items-center justify-center">
              <img
                src={images[currentIndex]}
                alt={`스터디 로그 이미지 ${currentIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div> */}

          <div className="flex gap-1">
            {/* <CarouselNavButtons
              onPrev={handlePrev}
              onNext={handleNext}
              canGoPrev={canGoPrev}
              canGoNext={canGoNext}
            /> */}
          </div>
          <div className="flex gap-3">
            <div className="flex items-center">
              <img src={HeartCountSvg} alt="Heart Count" />
              <span className="text-body-2-semibold text-gray-400 ml-1">
                {heartCount}
              </span>
            </div>
            <div className="flex items-center">
              <img src={LikeCountSvg} alt="Like Count" />
              <span className="text-body-2-semibold text-gray-400 ml-1">
                {likeCount}
              </span>
            </div>
            <div className="flex items-center">
              <img src={LaughCountSvg} alt="Laugh Count" />
              <span className="text-body-2-semibold text-gray-400 ml-1">
                {laughCount}
              </span>
            </div>
            <div className="flex items-center">
              <img src={SurpriseCountSvg} alt="Surprise Count" />
              <span className="text-body-2-semibold text-gray-400 ml-1">
                {surpriseCount}
              </span>
            </div>
            <div className="flex items-center">
              <img src={CuriosityCountSvg} alt="Curiosity Count" />
              <span className="text-body-2-semibold text-gray-400 ml-1">
                {curiosityCount}
              </span>
            </div>
          </div>
          <hr className="border-t-3 border-gray-100" />
          <div className="flex gap-3">
            <img
              src={isHearted ? HeartFillSvg : HeartReactionSvg}
              alt="하트 아이콘"
              onClick={() => handleToggle("heart")}
            />
            <img
              src={isLiked ? LikeFillSvg : LikeReactionSvg}
              alt="좋아요 아이콘"
              onClick={() => handleToggle("like")}
            />
            <img
              src={isLaughing ? LaughFillSvg : SmileReactionSvg}
              alt="웃음 아이콘"
              onClick={() => handleToggle("laugh")}
            />
            <img
              src={isSurprised ? SurpriseFillSvg : SurpriseReactionSvg}
              alt="놀람 아이콘"
              onClick={() => handleToggle("surprise")}
            />
            <img
              src={isCuriosity ? CuriosityFillSvg : CuriosityReactionSvg}
              alt="궁금해요 아이콘"
              onClick={() => handleToggle("curiosity")}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
