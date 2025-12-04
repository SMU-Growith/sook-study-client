import { Modal } from '@/components/ui/Modal';
import CloseSvg from '@/assets/icons/close.svg';
import { InputField } from '@/components/ui/InputField';
import { TextAreaField } from '@/components/ui/TextAreaField';
import { useState } from 'react';
import HeartReactionSvg from '@/assets/reactions/heartReaction.svg';
import LikeReactionSvg from '@/assets/reactions/likeReaction.svg';
import QuestionReactionSvg from '@/assets/reactions/questionReaction.svg';
import SmileReactionSvg from '@/assets/reactions/smileReaction.svg';
import SurpriseReactionSvg from '@/assets/reactions/surpriseReaction.svg';
import type { MyStudyLog } from './MyStudyLogCard';
import LikeCountSvg from '@/assets/reactions/likeCount.svg';
import HeartCountSvg from '@/assets/reactions/heartCount.svg';
import HeartFillSvg from '@/assets/reactions/heartFill.svg';
import SurpriseFillSvg from '@/assets/reactions/surpriseFill.svg';
import QuestionFillSvg from '@/assets/reactions/questionFill.svg';
import StudyLog1 from '@/assets/studyLogs/studyLog1.svg';
import StudyLog2 from '@/assets/studyLogs/studyLog2.svg';
import StudyLog3 from '@/assets/studyLogs/studyLog3.svg';
import { CarouselNavButtons } from '@/components/ui/CarouselNavButtons';

const CARDS_PER_VIEW = 1;
const MOVE_BY = 1;

interface StudyLogReadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sessionId?: number;
  logData?: MyStudyLog;
}
export function StudyLogReadModal({
  isOpen,
  onClose,
  sessionId,
  logData,
}: StudyLogReadModalProps) {
  const [isHearted, setIsHearted] = useState(false);
  const [isSurprised, setIsSurprised] = useState(false);
  const [isQuestioned, setIsQuestioned] = useState(false);
  const [heartCount, setHeartCount] = useState(logData?.heartCount || 0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [StudyLog1, StudyLog2, StudyLog3];
  const totalStudies = images.length;

  const handleLikeClick = () => {
    setIsHearted(!isHearted);
    setHeartCount(isHearted ? heartCount - 1 : heartCount + 1);
  };

  const handleSurpriseClick = () => {
    setIsSurprised(!isSurprised);
  };

  const handleQuestionClick = () => {
    setIsQuestioned(!isQuestioned);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - MOVE_BY, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + MOVE_BY, totalStudies - CARDS_PER_VIEW));
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < totalStudies - CARDS_PER_VIEW;
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[550px]">
      <div className="flex flex-col text-left relative pt-4">
        <button onClick={onClose} className="absolute top-[-10px] right-0">
          <img src={CloseSvg} alt="닫기" className="w-6 h-6" />
        </button>
        <h3 className="heading-3 mb-2">스터디 일지 작성하기</h3>
        <hr className="border-t-3 border-gray-100 mb-[22px]" />
        <p className="text-gray-300 text-body-1-semibold mb-[22px]">{sessionId}회차</p>
        <div className="flex flex-col gap-4">
          <InputField
            label="스터디 일지"
            placeholder="이번 회차에는 어떤 스터디 일지를 작성할 지 입력해주세요."
            value="React + Zustand 구조 잡기"
            disabled
            readOnly
          />
          <TextAreaField
            label="스터디 내용"
            placeholder="이번 주차에 어떤 스터디를 했는지 작성해주세요."
            rows={6}
            value={logData?.content}
            readOnly
          />
          <InputField label="링크" placeholder="따로 정리한 링크가 있다면 첨부해주세요." />
          <InputField
            label="첨부파일"
            placeholder="사진 및 파일을 첨부해주세요."
            value={logData?.attachments.map((att) => att.name).join(', ')}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="mt-4 w-full">
            <div className="w-full h-[260px] overflow-hidden flex items-center justify-center">
              <img
                src={images[currentIndex]}
                alt={`스터디 로그 이미지 ${currentIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="flex gap-1">
            <CarouselNavButtons
              onPrev={handlePrev}
              onNext={handleNext}
              canGoPrev={canGoPrev}
              canGoNext={canGoNext}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex items-center">
              <img src={HeartCountSvg} alt="Heart Count" />
              <span className="text-body-2-semibold text-gray-400 ml-1">{heartCount}</span>
            </div>
            <div className="flex items-center">
              <img src={LikeCountSvg} alt="Like Count" />
              <span className="text-body-2-semibold text-gray-400 ml-1">{logData?.likeCount}</span>
            </div>
          </div>
          <hr className="border-t-3 border-gray-100" />
          <div className="flex gap-3">
            <img
              src={isHearted ? HeartFillSvg : HeartReactionSvg}
              alt="하트 아이콘"
              onClick={handleLikeClick}
            />
            <img src={LikeReactionSvg} alt="좋아요 아이콘" />
            <img src={SmileReactionSvg} alt="웃음 아이콘" />
            <img
              src={isSurprised ? SurpriseFillSvg : SurpriseReactionSvg}
              alt="놀람 아이콘"
              onClick={handleSurpriseClick}
            />
            <img
              src={isQuestioned ? QuestionFillSvg : QuestionReactionSvg}
              alt="궁금해요 아이콘"
              onClick={handleQuestionClick}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
