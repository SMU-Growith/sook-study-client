import { Modal } from "@/components/ui/Modal";
import CloseSvg from "@/assets/icons/close.svg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UserProfileSvg from "@/assets/icons/userProfile.svg";
import type { Applier } from "../api/studyType";

interface ApplicationHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeApplicationStatus: (applicationId: number, newStatus: string) => void;
  studyId?: number;
  appliers?: Applier[];
}
export function ApplicationHistoryModal({
  isOpen,
  onClose,
  onChangeApplicationStatus,
  studyId,
  appliers,
}: ApplicationHistoryModalProps) {
  // 기본값을 members의 첫번째 값으로 설정
  const [selectedMember, setSelectedMember] = useState<Applier | null>(
    appliers && appliers.length > 0 ? appliers[0] : null
  );
  const handleMemberClick = (member: Applier) => {
    setSelectedMember(member);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[550px]">
      <div className="flex flex-col text-left relative pt-4">
        <button onClick={onClose} className="absolute top-[-10px] right-0">
          <img src={CloseSvg} alt="닫기" className="w-6 h-6" />
        </button>
        <h3 className="heading-3 mb-2">지원 내역</h3>
        <hr className="border-t-3 border-gray-100 mt-2 mb-2" />
        <div className="flex gap-2">
          <div className="flex flex-col gap-[10px]">
            <div className="flex gap-2">
              <div className="flex flex-col gap-[10px] w-[170px]">
                {appliers?.map((member) => (
                  <button
                    key={member.userId}
                    className={`h-[40px] px-[12px] rounded-[8px] hover:bg-gray-100 ${selectedMember?.userId === member.userId ? "bg-gray-100" : ""}`}
                    onClick={() => handleMemberClick(member)}
                  >
                    <div className="flex items-center">
                      <img src={UserProfileSvg} alt="User Profile" />
                      <span className="text-body-2-semibold text-gray-400 ml-1">
                        {member.nickName}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              {selectedMember ? (
                <div className="flex-1 bg-gray-50 px-5 py-5 rounded-[14px]">
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-body-2-semibold text-bk mb-1">
                        닉네임
                      </p>
                      <p className="text-body-2 text-gray-400">
                        {selectedMember.nickName}
                      </p>
                    </div>

                    <div>
                      <p className="text-body-2-semibold text-bk mb-1">
                        학적 상태
                      </p>
                      <p className="text-body-2 text-gray-400">
                        {selectedMember.studentStatus}
                      </p>
                    </div>
                    <div>
                      <p className="text-body-2-semibold text-bk mb-1">전공</p>
                      <p className="text-body-2 text-gray-400">
                        {selectedMember.major}
                      </p>
                    </div>

                    <div>
                      <p className="text-body-2-semibold text-bk mb-1">
                        연락처
                      </p>
                      <p className="text-body-2 text-gray-400">
                        {selectedMember.phoneNumber}
                      </p>
                    </div>

                    <div>
                      <p className="text-body-2-semibold text-bk mb-1">
                        지원 동기
                      </p>
                      <p className="text-body-2 text-gray-400">
                        {selectedMember.motivation}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-[10px] mt-[12px] mb-[12px]">
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={() =>
              selectedMember != null &&
              onChangeApplicationStatus(
                selectedMember.applicationId,
                "REJECTED"
              )
            }
          >
            거절하기
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={() =>
              selectedMember != null &&
              onChangeApplicationStatus(
                selectedMember.applicationId,
                "ACCEPTED"
              )
            }
          >
            승인하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
