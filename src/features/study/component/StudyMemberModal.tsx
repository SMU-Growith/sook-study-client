import { Modal } from "@/components/ui/Modal";
import CloseSvg from "@/assets/icons/close.svg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import StudyLeaderSvg from "@/assets/studyLeader.svg";
import StudyMemberSvg from "@/assets/studyMember.svg";
import UserProfileSvg from "@/assets/icons/userProfile.svg";
import type { StudyMember } from "../api/studyType";
import CheckboxOff from "@/assets/checkBoxOff.svg";
import CheckboxOn from "@/assets/checkBoxOn.svg";

interface StudyMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeRole: (newLeaderMemberId: number) => void;
  studyId?: number;
  leader?: StudyMember;
  members?: StudyMember[];
}
export function StudyMemberModal({
  isOpen,
  onClose,
  onChangeRole,
  // studyId,
  leader,
  members,
}: StudyMemberModalProps) {
  const [selectedMember, setSelectedMember] = useState<StudyMember | null>(
    members && members.length > 0 ? members[0] : null
  );
  const handleMemberClick = (member: StudyMember) => {
    setSelectedMember(member);
  };
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [newLeaderMemberId, setNewLeaderMemberId] = useState<number | null>(
    null
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[550px]">
      <div className="flex flex-col text-left relative pt-4">
        <button onClick={onClose} className="absolute top-[-10px] right-0">
          <img src={CloseSvg} alt="닫기" className="w-6 h-6" />
        </button>
        <h3 className="heading-3 mb-2">스터디 멤버</h3>
        <div className="flex gap-3">
          <Badge variant="purple" icon={StudyLeaderSvg}>
            스터디장
          </Badge>
          <div className="flex items-center">
            <img src={UserProfileSvg} alt="User Profile" />
            <span className="text-body-2-semibold text-gray-400 ml-1">
              {leader?.nickName}
            </span>
          </div>
        </div>
        <hr className="border-t-3 border-gray-100 mt-2 mb-2" />
        {isSelectMode ? (
          <p className="text-body-1-semibold mt-1 mb-4">
            스터디원 중 누구와 역할을 바꿀까요?
          </p>
        ) : (
          ""
        )}
        <div className="flex gap-2">
          <div className="flex flex-col gap-[10px]">
            <Badge variant="yellow" icon={StudyMemberSvg}>
              스터디원
            </Badge>
            <div className="flex gap-2">
              <div className="flex flex-col gap-[10px] w-[170px]">
                {members?.map((member) => (
                  <button
                    key={member.userId}
                    className={`h-[40px] px-[12px] rounded-[8px] hover:bg-gray-100 ${selectedMember?.userId === member.userId ? "bg-gray-100" : ""}`}
                    onClick={() => handleMemberClick(member)}
                  >
                    <div className="flex items-center">
                      {isSelectMode ? (
                        <img
                          src={
                            newLeaderMemberId === member.userId
                              ? CheckboxOn
                              : CheckboxOff
                          }
                          alt="Checkbox"
                          className="w-5 h-5 mr-2"
                          onClick={() => setNewLeaderMemberId(member.userId)}
                        />
                      ) : (
                        ""
                      )}
                      <img src={UserProfileSvg} alt="User Profile" />
                      <span className="text-body-2-semibold text-gray-400 ml-1">
                        {member.nickName}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              {!isSelectMode && selectedMember ? (
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
                        스터디 참여 동기
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
          <Button variant="default" onClick={onClose}>
            닫기
          </Button>
          {!isSelectMode ? (
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => setIsSelectMode(true)}
            >
              역할 바꾸기
            </Button>
          ) : (
            <Button
              variant="primary"
              className="flex-1"
              onClick={() =>
                newLeaderMemberId !== null && onChangeRole(newLeaderMemberId)
              }
            >
              역할 바꾸기
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
