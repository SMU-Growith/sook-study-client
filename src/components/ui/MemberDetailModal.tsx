import { Modal } from "@/components/ui/Modal";
import CloseSvg from "@/assets/icons/close.svg";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/InputField";
import UserProfileSvg from "@/assets/icons/userProfile.svg";
import type { Stamp } from "@/features/study/pages/StudySession";
import BadgeWelcomOn from "@/assets/badges/badgeWelcomeOn.svg";
import BadgeWelcomOff from "@/assets/badges/badgeWelcomeOn.svg";
import BadgeLeaderOn from "@/assets/badges/badgeLeaderOn.svg";
import BadgeLeaderOff from "@/assets/badges/badgeLeaderOff.svg";
import BadgeWriteOn from "@/assets/badges/badgeWriteOn.svg";
import BadgeWriteOff from "@/assets/badges/badgeWriteOff.svg";
import BadgeCheerOn from "@/assets/badges/badgeCheerOn.svg";
import BadgeCheerOff from "@/assets/badges/badgeCheerOff.svg";
import BadgeSuperOn from "@/assets/badges/badgeSuperOn.svg";
import BadgeSuperOff from "@/assets/badges/badgeSuperOff.svg";
import { CarouselNavButtons } from "./CarouselNavButtons";

interface MemberDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  stamps: Stamp[] | null;
  nickname?: string;
}
export function MemberDetailModal({
  isOpen,
  onClose,
  onConfirm,
  stamps,
  nickname,
}: MemberDetailModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[670px]">
      <div className="flex flex-col text-left relative px-5 py-6">
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
                스터디 스탬프{" "}
                <span className="text-primary-500 text-body-1-semibold">
                  4개{" "}
                </span>{" "}
                | 완료한 스탬프{" "}
                <span className="text-primary-500 text-body-1-semibold">
                  6개{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr className="border-t-3 border-gray-100 mb-[22px]" />

        <div className="flex justify-end">
          <CarouselNavButtons
            onPrev={function (): void {}}
            onNext={function (): void {}}
            canGoPrev={false}
            canGoNext={false}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto justify-center mt-3">
          <img src={BadgeWelcomOn} alt="웰컴 스탬프" />
          <img src={BadgeLeaderOn} alt="리더 스탬프" />
          <img src={BadgeSuperOn} alt="슈퍼숙타 스탬프" />
        </div>
        <Button variant="default" onClick={onClose} className="mt-6">
          닫기
        </Button>
      </div>
    </Modal>
  );
}
