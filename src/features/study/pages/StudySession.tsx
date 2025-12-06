import { AuthHeader } from "@/components/layout/AuthHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import SettingsSvg from "@/assets/settings.svg";
import StudyLeaderSvg from "@/assets/studyLeader.svg";
import StudyMemberSvg from "@/assets/studyMember.svg";
import UserProfileSvg from "@/assets/icons/userProfile.svg";
import BlueCircleSvg from "@/assets/blueCircle.svg";
import { myStudySessionListData } from "../studySession";
import PlusSvg from "@/assets/icons/plus.svg";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { StudySessionCreateModal } from "../component/StudySessionCreateModal";
import { StudySessionCard } from "@/features/study/component/MyStudySessionCard";
import { StudyFinishModal } from "../component/StudyFinishModal";
import { StudyOutModal } from "../component/StudyOutModal";
import { useNavigate, useParams } from "react-router";
import { StudyMemberModal } from "../component/StudyMemberModal";
import {
  fetchStudyById,
  fetchStudyMembersApi,
  studyChangeLeaderApi,
} from "../api/study";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/lib/api";
import type { Study } from "@/components/ui/StudyCard";
import type { StudyMember } from "../api/studyType";
import { defaultStudyMembers } from "../studyMembers";

export function MyStudySession() {
  const auth = useAuthStore();
  const { studyId } = useParams<{ studyId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStudyFinishModalOpen, setIsStudyFinishModalOpen] = useState(false);
  const [isStudyOutModalOpen, setIsStudyOutModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [sessions, setSessions] = useState(myStudySessionListData);

  const handleCreateStudySession = () => {
    const newSession = {
      id: myStudySessionListData.length + 1,
      title: "React 컴포넌트 아키텍처 분석하기",
      submittedMembers: 0,
      status: "진행중",
    };

    setSessions([...sessions, newSession]);
    setIsModalOpen(false);
    // 스터디 일지 하나 추가하기
  };
  const navigate = useNavigate();

  // 스터디 멤버 조회
  // const { data: studyMember } = useQuery<ApiResponse<StudyMember[]>>({
  //   queryKey: ['StudyMember', studyId],
  //   queryFn: () => fetchStudyMembersApi(Number(studyId)),
  //   enabled: !!studyId,
  // });

  // const members = StudyMember?.result || [];
  const memberList = defaultStudyMembers;

  const leader = memberList.find((m) => m.studyRole === "leader");
  const members = memberList.filter((m) => m.studyRole === "member") ?? [];

  // type ChangeLeaderVariables = { studyId: number; memberId: number };
  // const { mutate: changeRole } = useMutation<
  //   ApiResponse<Study[]>,               // 성공
  //   AxiosError<ApiResponse<null>>,      // 실패
  //   ChangeLeaderVariables
  // >({
  //   mutationFn: ({ studyId, memberId }) => studyChangeLeaderApi(studyId, memberId),
  //   onSuccess: (res) => {
  //     alert('역할이 변경되었습니다.');
  //     // 필요하면 res.result 로 Study[] 접근 가능
  //   },
  //   onError: (error) => {
  //     alert(error.response?.data?.message || '역할 변경에 실패했습니다.');
  //   },
  // });

  const changeMemberRole = (newLeaderMemberId: number) => {
    // 스터디 멤버 역할 변경 로직 구현
    // changeRole({ studyId: Number(studyId), memberId: newLeaderMemberId });
    setIsMemberModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-white w-full">
      <AuthHeader />
      <main className="flex w-full mt-[88px]">
        <div className="flex flex-col px-[18px] py-6 gap-5 w-[336px]">
          <h2 className="heading-2">React 실력 키우실 분! 초보도 환영!</h2>
          {auth.isLeader && (
            <Button variant="default" size="md">
              모집글 수정하기
            </Button>
          )}
          <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
            <div className="flex flex-col gap-y-[12px]">
              <div className="flex justify-between items-center">
                <p className="text-body-1-semibold">스터디 멤버</p>
                {auth.isLeader && (
                  <img
                    src={SettingsSvg}
                    alt="설정 아이콘"
                    onClick={() => setIsMemberModalOpen(true)}
                  />
                )}
              </div>
              <hr className="border-t-3 border-gray-100" />
              <div className="flex gap-3">
                <Badge variant="purple" icon={StudyLeaderSvg}>
                  스터디장
                </Badge>
                <div className="flex items-center">
                  <img src={UserProfileSvg} alt="User Profile" />
                  <span className="text-body-2-semibold text-gray-400 ml-1">
                    {leader?.nickname}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Badge variant="yellow" icon={StudyMemberSvg}>
                  스터디원
                </Badge>
                <div className="grid grid-cols-3 gap-3">
                  {members.map((member) => (
                    <div className="flex items-center" key={member.userId}>
                      <img src={UserProfileSvg} alt="User Profile" />
                      <span className="text-body-2-semibold text-gray-400 ml-1">
                        {member?.nickname}
                      </span>
                    </div>
                  ))}
                </div>
                <StudyMemberModal
                  isOpen={isMemberModalOpen}
                  onClose={() => setIsMemberModalOpen(false)}
                  onChangeRole={changeMemberRole}
                  studyId={Number(studyId)}
                  leader={leader}
                  members={members}
                />
              </div>
            </div>
          </div>

          <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
            <div className="flex flex-col gap-y-[12px]">
              <div className="flex justify-between items-center">
                <p className="text-body-1-semibold">스터디 규칙</p>
                {auth.isLeader && <img src={SettingsSvg} alt="설정 아이콘" />}
              </div>
              <hr className="border-t-3 border-gray-100" />
              <div className="flex flex-col gap-1">
                <p className="text-body-1-semibold text-gray-300">시간</p>
                <p className="text-body-1 text-black">아침 7시 입실</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-body-1-semibold text-gray-300">벌금</p>
                <p className="text-body-1 text-black">
                  지각당 1000원 <br />
                  무단 결석 5000원
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-body-1-semibold text-gray-300">휴무</p>
                <p className="text-body-1 text-black">아침 7시 입실</p>
              </div>
            </div>
          </div>

          {auth.isLeader && (
            <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
              <div className="flex flex-col gap-y-[12px]">
                <div className="flex justify-between items-center">
                  <p className="text-body-1-semibold">지원 내역</p>
                  <div className="flex gap-1 items-start">
                    <p className="text-[#277AFF] text-caption-semibold cursor-pointer">
                      새로운 지원
                    </p>
                    <img src={BlueCircleSvg} alt="블루 동그라미 아이콘" />
                  </div>
                </div>
                <hr className="border-t-3 border-gray-100" />
                <div className="flex flex-col gap-3">
                  {["지송이", "지원송이", "원송이"].map((applierName) => (
                    <div className="flex items-center">
                      <img src={UserProfileSvg} alt="User Profile" />
                      <span className="text-body-2-semibold text-gray-400 ml-1">
                        {applierName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <Button
            variant="default"
            size="md"
            onClick={() => setIsStudyOutModalOpen(true)}
          >
            스터디 나가기
          </Button>
          {auth.isLeader && (
            <Button
              variant="deleted"
              size="md"
              onClick={() => setIsStudyFinishModalOpen(true)}
            >
              스터디 종료하기
            </Button>
          )}
        </div>
        <div className="flex flex-1 flex-col px-10 py-10 gap-5">
          <div className="flex justify-between items-center">
            <h2 className="heading-2">스터디 일지</h2>
            {auth.isLeader && (
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                >
                  <img src={PlusSvg} alt="플러스 아이콘" />
                  일지 생성하기
                </Button>
              </div>
            )}
          </div>
          <p className="text-subtitle-1">
            총 <span className="text-primary-500">5개</span>
          </p>
          <div className="grid grid-cols-2 gap-5">
            {sessions
              .slice()
              .reverse()
              .map((study) => (
                <StudySessionCard
                  id={study.id}
                  isLeader={true}
                  studySession={study}
                />
              ))}
          </div>
        </div>
      </main>
      <StudySessionCreateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onConfirm={handleCreateStudySession}
        nextSessionId={myStudySessionListData.length + 1}
      />
      <StudyOutModal
        isOpen={isStudyOutModalOpen}
        onClose={() => setIsStudyOutModalOpen(false)}
        onConfirm={() => {
          setIsStudyOutModalOpen(false);
          navigate(-1);
        }}
      />
      <StudyFinishModal
        isOpen={isStudyFinishModalOpen}
        onClose={() => setIsStudyFinishModalOpen(false)}
        onConfirm={() => {
          setIsStudyFinishModalOpen(false);
          // 이전페이지로 이동
          navigate(-1);
        }}
      />
    </div>
  );
}
