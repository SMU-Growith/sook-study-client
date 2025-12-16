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
import { StudySessionCreateModal } from "../component/StudySessionCreateModal";
import { StudySessionCard } from "@/features/study/component/MyStudySessionCard";
import { StudyFinishModal } from "../component/StudyFinishModal";
import { StudyOutModal } from "../component/StudyOutModal";
import { useNavigate, useParams } from "react-router";
import { StudyMemberModal } from "../component/StudyMemberModal";
import {
  createStudySessionApi,
  fetchMyApplicationsListApi,
  fetchMyStudyDetailApi,
  fetchStudyMembersApi,
  fetchStudyRulesApi,
  fetchStudySessionsApi,
  respondToStudyApplicationApi,
  studyChangeLeaderApi,
  studyFinishApi,
  studyLeaveApi,
  updateStudyRulesApi,
} from "../api/study";
import type {
  ApplicationStatus,
  Applier,
  MyStudyDetail,
  RespondToStudyApplication,
  RulesLabel,
  StudyMember,
  StudySessionDetail,
} from "../api/studyType";
import { StudyRuleModal } from "../component/StudyRuleModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApplicationHistoryModal } from "../component/ApplicationHistoryModal";
import { MemberDetailModal } from "@/components/ui/MemberDetailModal";
import type { ApiResponse } from "@/lib/api/apiClient";
import type { AxiosError } from "axios";
import { studyQueryKeys } from "../api/queries";

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
  // // TODO: 상세조회 api 연동 후 role 설정
  // const [sp] = useSearchParams();
  // const role = sp.get("role");
  // if (role === "LEADER") {
  //   isLeader = true;
  // }

  const queryClient = useQueryClient();
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

  // 내 스터디 상세 조회 API
  const { data: myStudyDetail = {} as MyStudyDetail } = useQuery<MyStudyDetail>(
    {
      queryKey: studyQueryKeys.myStudyDetail(studyIdNum),
      queryFn: () => fetchMyStudyDetailApi(studyIdNum),
      enabled: Number.isFinite(studyIdNum),
    }
  );

  // 스터디 세션 조회 API
  const { data: sessions = [] } = useQuery<StudySessionDetail[]>({
    queryKey: studyQueryKeys.studySessions(studyIdNum),
    queryFn: () => fetchStudySessionsApi(studyIdNum, 0, 20),
    enabled: Number.isFinite(studyIdNum),
  });

  const { mutate: submitStudySession } = useMutation<
    StudySessionDetail,
    AxiosError<ApiResponse<null>>,
    { studyId: number; title: string }
  >({
    mutationFn: ({ studyId, title }) => createStudySessionApi(studyId, title),
    onSuccess: (_res, vars) => {
      console.log("스터디 세션 생성 성공:", _res);
      queryClient.invalidateQueries({
        queryKey: studyQueryKeys.studySessions(vars.studyId),
      });
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message?: string }>;
      alert(err.response?.data?.message || "프로필 업데이트 실패");
    },
  });

  const handleCreateStudySession = (title: string) => {
    submitStudySession({
      studyId: studyIdNum,
      title,
    });
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const { data: memberList = [] } = useQuery<StudyMember[]>({
    queryKey: studyQueryKeys.studyMembers(studyIdNum),
    queryFn: () => fetchStudyMembersApi(studyIdNum),
    enabled: !!studyId,
  });

  // const members = StudyMember?.result || [];
  // const memberList = defaultStudyMembers;

  const leader = memberList.find((m) => m.studyRole === "LEADER");
  const members = memberList.filter((m) => m.studyRole === "MEMBER") ?? [];

  // 스터디 멤버 역할 변경
  type ChangeLeaderVariables = { studyId: number; memberId: number };

  const { mutate: changeRole } = useMutation<
    null,
    AxiosError<ApiResponse<null>>,
    ChangeLeaderVariables
  >({
    mutationFn: ({ studyId, memberId }) =>
      studyChangeLeaderApi(studyId, memberId),
    onSuccess: (_res, _vars) => {
      console.log("스터디장 변경 성공:", _res);
      queryClient.invalidateQueries({
        queryKey: studyQueryKeys.studyMembers(_vars.studyId),
      });
    },
    onError: (error) => {
      alert(error.response?.data?.message || "역할 변경에 실패했습니다.");
    },
  });

  const changeMemberRole = (newLeaderMemberId: number) => {
    changeRole({ studyId: studyIdNum, memberId: newLeaderMemberId });
    console.log("새로운 스터디장 멤버 ID:", newLeaderMemberId);
    setIsMemberModalOpen(false);
  };

  // 규칙 조회 API
  const { data: rules = [] } = useQuery<RulesLabel[]>({
    queryKey: studyQueryKeys.studyRules(studyIdNum),
    queryFn: () => fetchStudyRulesApi(studyIdNum),
    enabled: !!studyIdNum,
  });

  const { mutate: changeRule } = useMutation<
    null,
    AxiosError<ApiResponse<null>>,
    { studyId: number; rules: RulesLabel[] }
  >({
    mutationFn: ({ studyId, rules }) => updateStudyRulesApi(studyId, rules),
    onSuccess: (_res, _vars) => {
      console.log("스터디 규칙 변경 성공:", _res);
      queryClient.invalidateQueries({
        queryKey: studyQueryKeys.studyRules(_vars.studyId),
      });
    },
    onError: (error) => {
      alert(error.response?.data?.message || "규칙 변경에 실패했습니다.");
    },
  });

  // 규칙 수정 API
  const updateRules = (updatedRules: RulesLabel[]) => {
    console.log("업데이트된 규칙:", updatedRules);
    changeRule({ studyId: studyIdNum, rules: updatedRules });
    setIsRuleModalOpen(false);
  };

  // 스터디별 지원내역 조회 API
  const { data: appliers = [] } = useQuery<Applier[]>({
    queryKey: studyQueryKeys.studyApplication(studyIdNum),
    queryFn: () => fetchMyApplicationsListApi(studyIdNum),
    enabled: !!studyIdNum,
  });

  // 스터디 지원서 상태 변경 API
  const { mutate: changeApplicationStatus } = useMutation<
    RespondToStudyApplication,
    AxiosError<ApiResponse<null>>,
    { applicationId: number; status: ApplicationStatus }
  >({
    mutationFn: ({ applicationId, status }) =>
      respondToStudyApplicationApi(applicationId, status),
    onSuccess: (_res, _vars) => {
      console.log("스터디 지원서 상태 변경 성공:", _res);
      queryClient.invalidateQueries({
        queryKey: studyQueryKeys.studyApplication(_vars.applicationId),
      });
      setIsApplyModalOpen(false);
    },
    onError: (error) => {
      alert(
        error.response?.data?.message || "지원서 상태 변경에 실패했습니다."
      );
    },
  });

  const updateApplicationStatus = (
    applicationId: number,
    newStatus: string
  ) => {
    console.log("지원서 ID:", applicationId, "새 상태:", newStatus);
    changeApplicationStatus({
      applicationId: applicationId,
      status: newStatus as ApplicationStatus,
    });
  };

  const { mutate: studyLeave } = useMutation<
    null,
    AxiosError<ApiResponse<null>>,
    { studyId: number }
  >({
    mutationFn: ({ studyId }) => studyLeaveApi(studyId),
    onSuccess: (_res, _vars) => {
      console.log("스터디 나가기 성공:", _res);
      queryClient.invalidateQueries({
        queryKey: studyQueryKeys.myStudies("CLOSED"),
      });
      setIsStudyOutModalOpen(false);
      navigate("/study/my");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "스터디 나가기에 실패했습니다.");
    },
  });

  const { mutate: studyFinish } = useMutation<
    null,
    AxiosError<ApiResponse<null>>,
    { studyId: number }
  >({
    mutationFn: ({ studyId }) => studyFinishApi(studyId),
    onSuccess: (_res, _vars) => {
      console.log("스터디 종료 성공:", _res);
      queryClient.invalidateQueries({
        queryKey: studyQueryKeys.myStudies("CLOSED"),
      });
      setIsStudyFinishModalOpen(false);
      navigate("/study/my");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "스터디 종료에 실패했습니다.");
    },
  });

  // 스터디 나가기 API
  const handleStudyOut = () => {
    studyLeave({ studyId: studyIdNum });
  };

  // 스터디 종료하기 API
  const handleStudyFinish = () => {
    studyFinish({ studyId: studyIdNum });
  };

  return (
    <div className="flex h-screen bg-white w-full">
      <AuthHeader />
      <main className="flex w-full mt-[88px]">
        <div className="flex flex-col px-[18px] py-6 gap-5 w-[336px]">
          <h2 className="heading-2">React 실력 키우실 분! 초보도 환영!</h2>
          {myStudyDetail.myRole === "LEADER" && (
            <Button variant="default" size="md">
              모집글 수정하기
            </Button>
          )}
          <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
            <div className="flex flex-col gap-y-[12px]">
              <div className="flex justify-between items-center">
                <p className="text-body-1-semibold">스터디 멤버</p>
                {myStudyDetail.myRole === "LEADER" && (
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
                    setSelectedMemberNickname(leader?.nickName || null);
                    setSelectedMemberStamp(exampleStampData);
                    setIsMemberDetailModalOpen(true);
                  }}
                >
                  <div className="flex items-center">
                    <img src={UserProfileSvg} alt="User Profile" />
                    <span className="text-body-2-semibold text-gray-400 ml-1">
                      {leader?.nickName}
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
                        setSelectedMemberNickname(member?.nickName || null);
                        setSelectedMemberStamp(exampleStampData);
                        setIsMemberDetailModalOpen(true);
                      }}
                    >
                      <div className="flex items-center">
                        <img src={UserProfileSvg} alt="User Profile" />
                        <span className="text-body-2-semibold text-gray-400 ml-1">
                          {member?.nickName}
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
                  studyId={studyIdNum}
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
                {myStudyDetail.myRole === "LEADER" && (
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
                  rules={rules}
                />
              </div>
              <hr className="border-t-3 border-gray-100" />
              {rules.length === 0 ? (
                <p className="text-body-2 text-gray-200">
                  등록된 스터디 규칙이 없습니다.
                </p>
              ) : (
                rules.map((rule) => (
                  <div key={rule.ruleCategory} className="flex flex-col gap-1">
                    <p className="text-body-1-semibold text-gray-300">
                      {rule.ruleCategory}
                    </p>
                    <p className="text-body-1 text-black">{rule.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {myStudyDetail.myRole === "LEADER" && (
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
                  {appliers.map((applier) => (
                    <div
                      key={applier.applicationId}
                      className="flex items-center"
                    >
                      <img src={UserProfileSvg} alt="User Profile" />
                      <span className="text-body-2-semibold text-gray-400 ml-1">
                        {applier.nickName}
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
                  appliers={appliers}
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
          {myStudyDetail.myRole === "LEADER" && (
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
            {myStudyDetail.myRole === "LEADER" && (
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
            총 <span className="text-primary-500">{sessions.length}개</span>
          </p>
          <div className="grid grid-cols-2 gap-5">
            {sessions
              .slice()
              .reverse()
              .map((session) => (
                <StudySessionCard
                  key={session.sessionId}
                  isLeader={true}
                  studySession={session}
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
        onConfirm={handleStudyOut}
      />
      <StudyFinishModal
        isOpen={isStudyFinishModalOpen}
        onClose={() => setIsStudyFinishModalOpen(false)}
        onConfirm={handleStudyFinish}
      />
    </div>
  );
}
