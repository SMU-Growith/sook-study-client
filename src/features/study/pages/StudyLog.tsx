import { AuthHeader } from "@/components/layout/AuthHeader";
import { Button } from "@/components/ui/button";
import PlusSvg from "@/assets/icons/plus.svg";
import { StudyLogCreateModal } from "../component/StudyLogCreateModal";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useParams, useSearchParams } from "react-router-dom";
import { StudyLogCard } from "@/features/study/component/MyStudyLogCard";
import { myStudyLogListData } from "../studyLog";

export function MyStudyLog() {
  const auth = useAuthStore();
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const { sessionId } = useParams<{ studyId: string; sessionId: string }>();
  const sessionTitle = searchParams.get("sessionTitle");
  const [logs, setLogs] = useState(myStudyLogListData);

  const handleCreateStudyLog = () => {
    const newLog = {
      id: 5,
      title: "미래의 직업 3분 스피치 발표",
      role: "스터디원",
      writerNickname: "김눈송",
      viewCount: 0,
      content: `미래의 직업 3분 스피치 발표 
        발표 스터디 마지막 날, 각자 준비한 3분 스피치를 발표했습니다. 
        저는 ‘미래의 직업’에 대해 이야기하며, 자신의 진로를 영어로 표현하는 법을 연습했어요. 발표 후 피드백을 통해 더 자연스러운 문장으로 고쳐보았고, 발표 내용에 더 자신감을 가질 수 있게 되었습니다. 앞으로 영어로 스피치하는 데 더 용기를 낼 수 있을 것 같아요.`,
      link: "https://www.notion.so/0230a2",
      attachments: [
        {
          id: 1,
          name: "image 7.png, image 48 (1).png",
          type: "png" as const,
          url: "https://www.notion.so/0230a2",
        },
      ],
      likeCount: 4,
      heartCount: 6,
      laughCount: 1,
      surpriseCount: 1,
      questionCount: 2,
    };
    setLogs((prevLogs) => [...prevLogs, newLog]);
    setIsWriteModalOpen(false);
    auth.setHasWrittenLog(true);
  };

  return (
    <div className="flex h-screen bg-white w-full">
      <AuthHeader />
      <main className="flex w-full mt-[88px]">
        <div className="flex flex-1 flex-col px-10 py-10 gap-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-300 text-body-2-semibold">
                {sessionId}회차
              </p>
              <h2 className="heading-2">{sessionTitle}</h2>
            </div>
            {auth.isLeader && (
              <div className="flex gap-2">
                <Button
                  variant={auth.hasWrittenLog ? "disabled" : "primary"}
                  size="lg"
                  onClick={() => setIsWriteModalOpen(true)}
                >
                  <img src={PlusSvg} alt="플러스 아이콘" />
                  일지 작성하기
                </Button>
              </div>
            )}
          </div>
          <p className="text-subtitle-1">
            총 <span className="text-primary-500">{logs.length}개</span>
          </p>
          <div className="grid grid-cols-2 gap-5">
            {auth.hasWrittenLog ? null : (
              <div className="w-full border-2 border-dashed border-gray-200 rounded-[20px] px-[18px] py-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-5">
                  <p className="text-body-1-semibold text-gray-300">
                    아직 스터디 일지 작성을 안하셨네요!
                  </p>
                  <Button
                    variant="solid"
                    size="lg"
                    onClick={() => setIsWriteModalOpen(true)}
                  >
                    스터디 일지 작성하기
                  </Button>
                </div>
                <StudyLogCreateModal
                  isOpen={isWriteModalOpen}
                  onClose={() => {
                    setIsWriteModalOpen(false);
                  }}
                  onConfirm={handleCreateStudyLog}
                  nextSessionId={Number(sessionId)}
                  sessionTitle={sessionTitle || "스터디 한 것들 정리"}
                />
              </div>
            )}
            {logs
              .slice()
              .reverse()
              .map((studyLog) => (
                <StudyLogCard
                  sessionId={sessionId}
                  logId={studyLog.id}
                  studyLog={studyLog}
                  isEmpty={false}
                />
              ))}
          </div>
        </div>
      </main>
      <StudyLogCreateModal
        isOpen={isWriteModalOpen}
        onClose={() => {
          setIsWriteModalOpen(false);
        }}
        onConfirm={handleCreateStudyLog}
        nextSessionId={Number(sessionId)}
        sessionTitle={sessionTitle || "스터디 한 것들 정리"}
      />
    </div>
  );
}
