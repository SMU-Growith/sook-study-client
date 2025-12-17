import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import UserProfileSvg from "@/assets/icons/userProfile.svg";
import type { Stamp, StampList } from "@/features/study/api/studyType";
import { StampCard } from "@/features/auth/components/StampCard";
import { useState } from "react";
import { StampDetailModal } from "@/features/auth/components/StampDetailModal";

interface MemberDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  stampList?: StampList;
  nickname?: string;
}

export function MemberDetailModal({
  isOpen,
  onClose,
  stampList,
  nickname,
}: MemberDetailModalProps) {
  const [isStampDetailModalOpen, setIsStampDetailModalOpen] = useState(false);
  const [selectedStamp, setSelectedStamp] = useState<Stamp["stampType"] | null>(
    null
  );

  const openModal = (stampType: Stamp["stampType"]) => {
    setSelectedStamp(stampType);
    setIsStampDetailModalOpen(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[800px]">
      <div className="flex flex-col text-left relative px-3 py-2">
        <div className="h-[90px] bg-gray-100 rounded-[10px] mb-6">
          <div className="flex items-center h-full gap-5">
            <img
              src={UserProfileSvg}
              alt="User Profile"
              className="ml-5 w-10 h-10"
            />
            <div className="flex flex-col">
              <p className="text-body-1-semibold">{nickname}</p>
              <p className="text-body-1">
                진행중인 스탬프{" "}
                <span className="text-primary-500 text-body-1-semibold">
                  {stampList?.inProgressCount ?? 0}개{" "}
                </span>{" "}
                | 완료한 스탬프{" "}
                <span className="text-primary-500 text-body-1-semibold">
                  {stampList?.completedCount ?? 0}개{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr className="border-t-3 border-gray-100 mb-[22px]" />
        <div className="grid grid-cols-4 gap-5 mb-10">
          {stampList?.stamps.map((stamp) => (
            <StampCard
              key={stamp.stampType}
              stamp={stamp}
              onCardClick={openModal}
            />
          ))}
        </div>
        <StampDetailModal
          isOpen={isStampDetailModalOpen}
          stamp={
            stampList?.stamps.find(
              (stamp) => stamp.stampType === selectedStamp
            ) ?? null
          }
          onClose={() => setIsStampDetailModalOpen(false)}
        />
        <Button variant="default" onClick={onClose}>
          닫기
        </Button>
      </div>
    </Modal>
  );
}
