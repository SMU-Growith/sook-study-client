import { AuthHeader } from "@/components/layout/AuthHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import SettingsSvg from "@/assets/settings.svg";
import StudyLeaderSvg from "@/assets/studyLeader.svg";
import StudyMemberSvg from "@/assets/studyMember.svg";
import UserProfileSvg from "@/assets/icons/userProfile.svg";
import BlueCircleSvg from "@/assets/blueCircle.svg";
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
  fetchStudySessionsApi,
  studyChangeLeaderApi,
} from "../api/study";
import type { Rules, StudyMember, StudySessionDetail } from "../api/studyType";
import { defaultStudyMembers } from "../studyMembers";
import { StudyRuleModal } from "../component/StudyRuleModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApplicationHistoryModal } from "../component/ApplicationHistoryModal";
import { MemberDetailModal } from "@/components/ui/MemberDetailModal";

interface StampLevel {
  stampId: number;
  level: "NONE" | "LEVEL_1" | "LEVEL_2";
  levelName: string;
  levelDescription: string;
  isAchieved: boolean;
}

export interface Stamp {
  stampType: "WELCOME" | "LEADER" | "RECORD" | "CHEER" | "SUPERSTAR ";
  stampName: string;
  description: string;
  achievedLevel: "NONE" | "LEVEL_1" | "LEVEL_2";
  isAchieved: boolean;
  isCompleted: boolean;
  levels?: StampLevel[];
}

const exampleStampData: Stamp[] = [
  {
    stampType: "WELCOME",
    stampName: "웰컴숙",
    description:
      "숙터디 회원가입을 축하해요! 숙터디에서 다양한 활동을 이용해보세요.",
    achievedLevel: "NONE",
    isAchieved: true,
    isCompleted: true,
  },
  {
    stampType: "LEADER",
    stampName: "리더숙",
    description:
      "스터디 개설을 하셨네요. 스터디장은 스터디 일지를 회차별로 생성할 수 있어요.",
    achievedLevel: "LEVEL_1",
    isAchieved: true,
    isCompleted: false,
    levels: [
      {
        stampId: 1,
        level: "LEVEL_1",
        levelName: "과대송",
        levelDescription: "스터디 1회 개설",
        isAchieved: true,
      },
    ],
  },
];

export function MyStudySession() {
  const auth = useAuthStore();
  const { studyId } = useParams<{ studyId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStudyFinishModalOpen, setIsStudyFinishModalOpen] = useState(false);
  const [isStudyOutModalOpen, setIsStudyOutModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isMemberDetailModalOpen, setIsMemberDetailModalOpen] = useState(false);
  const [selectedMemberStamp, setSelectedMemberStamp] = useState<
    Stamp[] | null
  >(null);
  const [selectedMemberNickname, setSelectedMemberNickname] = useState<
    string | null
  >(null);

  const studyIdNum = Number(studyId);
  const { data: sessions = [] } = useQuery<StudySessionDetail[]>({
    queryKey: ["studySessions", studyId],
    queryFn: () => fetchStudySessionsApi(studyIdNum, 0, 10),
    enabled: Number.isFinite(studyIdNum),
  });

  const handleCreateStudySession = () => {
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

  // 스터디 멤버 역할 변경
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
    console.log("새로운 스터디장 멤버 ID:", newLeaderMemberId);
    setIsMemberModalOpen(false);
  };

  const updateRules = (updatedRules: Rules[]) => {
    console.log("업데이트된 규칙:", updatedRules);
    // changeRule(updatedRules); // 스터디 규칙 변경 api 호출
    setIsRuleModalOpen(false);
  };

  const updateApplicationStatus = (
    applicationId: number,
    newStatus: string
  ) => {
    console.log("지원서 ID:", applicationId, "새 상태:", newStatus);
    // changeApplicationStatus(applicationId, newStatus); // 스터디 승인 api 호출
    setIsApplyModalOpen(false);
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
                <button
                  onClick={() => {
                    // member.userId를 파라미터로 받는 멤버스탬프조회api 호출
                    setSelectedMemberNickname(leader?.nickname || null);
                    setSelectedMemberStamp(exampleStampData);
                    setIsMemberDetailModalOpen(true);
                  }}
                >
                  <div className="flex items-center">
                    <img src={UserProfileSvg} alt="User Profile" />
                    <span className="text-body-2-semibold text-gray-400 ml-1">
                      {leader?.nickname}
                    </span>
                  </div>
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <Badge variant="yellow" icon={StudyMemberSvg}>
                  스터디원
                </Badge>
                <div className="grid grid-cols-3 gap-3">
                  {members.map((member) => (
                    <button
                      key={member.userId}
                      onClick={() => {
                        // member.userId를 파라미터로 받는 멤버스탬프조회api 호출
                        setSelectedMemberNickname(member?.nickname || null);
                        setSelectedMemberStamp(exampleStampData);
                        setIsMemberDetailModalOpen(true);
                      }}
                    >
                      <div className="flex items-center">
                        <img src={UserProfileSvg} alt="User Profile" />
                        <span className="text-body-2-semibold text-gray-400 ml-1">
                          {member?.nickname}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                <MemberDetailModal
                  isOpen={isMemberDetailModalOpen}
                  onClose={() => setIsMemberDetailModalOpen(false)}
                  onConfirm={() => setIsMemberDetailModalOpen(false)}
                  stamps={selectedMemberStamp}
                  nickname={selectedMemberNickname || undefined}
                />
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
                {auth.isLeader && (
                  <img
                    src={SettingsSvg}
                    alt="설정 아이콘"
                    onClick={() => setIsRuleModalOpen(true)}
                  />
                )}
                <StudyRuleModal
                  isOpen={isRuleModalOpen}
                  onClose={() => setIsRuleModalOpen(false)}
                  onChangeRule={updateRules}
                  studyId={Number(studyId)}
                  rules={[
                    {
                      ruleCategory: "TIME",
                      description: "매주 월,수,금 아침 7시까지 출석",
                    },
                    {
                      ruleCategory: "FINE",
                      description: "지각당 1000원, 무단결석 5000원",
                    },
                    {
                      ruleCategory: "DAY_OFF",
                      description: "월 1회 자유롭게 휴무",
                    },
                    {
                      ruleCategory: "ATMOSPHERE",
                      description: "긍정적인 분위기 유지",
                    },
                    {
                      ruleCategory: "ETC",
                      description: "기타 등등",
                    },
                  ]}
                />
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
                    <div key={applierName} className="flex items-center">
                      <img src={UserProfileSvg} alt="User Profile" />
                      <span className="text-body-2-semibold text-gray-400 ml-1">
                        {applierName}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="solid"
                  size="md"
                  onClick={() => setIsApplyModalOpen(true)}
                >
                  관리하기
                </Button>
                <ApplicationHistoryModal
                  isOpen={isApplyModalOpen}
                  onClose={() => setIsApplyModalOpen(false)}
                  onChangeApplicationStatus={updateApplicationStatus}
                  studyId={Number(studyId)}
                  appliers={[
                    {
                      applicationId: 1,
                      studyId: Number(studyId),
                      userId: 101,
                      nickName: "지송이",
                      studentStatus: "재학",
                      major: "기계공학과",
                      phoneNumber: "010-1234-5678",
                      motivation:
                        "React 스터디를 통해 컴포넌트 설계 감을 잡고 싶어요.",
                      applicationStatus: "PENDING",
                    },
                    {
                      applicationId: 2,
                      studyId: Number(studyId),
                      userId: 102,
                      nickName: "지원송이",
                      studentStatus: "휴학",
                      major: "컴퓨터공학과",
                      phoneNumber: "010-2345-6789",
                      motivation:
                        "프로젝트 경험 쌓고 포트폴리오에 넣을 결과물을 만들고 싶어요.",
                      applicationStatus: "ACCEPTED",
                    },
                    {
                      applicationId: 3,
                      studyId: Number(studyId),
                      userId: 103,
                      nickName: "원송이",
                      studentStatus: "졸업",
                      major: "소프트웨어학과",
                      phoneNumber: "010-3456-7890",
                      motivation:
                        "실무 감각 유지하려고 사이드로 스터디 같이 하고 싶습니다.",
                      applicationStatus: "REJECTED",
                    },
                  ]}
                />
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
                  key={study.sessionId}
                  sessionId={study.sessionId}
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
        nextSessionId={sessions.length + 1}
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
