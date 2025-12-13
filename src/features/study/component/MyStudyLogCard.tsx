import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import StudyLeader from "@/assets/studyLeader.svg";
import StudyMember from "@/assets/studyMember.svg";
import eyeSvg from "@/assets/eye.svg";
import { Button } from "@/components/ui/button";
import { StudyLogReadModal } from "./StudyLogReadModal";
import type { StudyLogDetail, StudyLogPreview } from "../api/studyType";
import { fetchStudyLogDetailApi } from "../api/study";
import { useQuery } from "@tanstack/react-query";

interface MyStudyLogProps {
  sessionId: number;
  log: StudyLogPreview;
  isEmpty?: boolean; // TODO isEmpty prop 받는 것이 아닌 log 데이터로 판단하도록 수정 필요
  sessionTitle?: string | null;
}

export function StudyLogCard({ sessionId, log }: MyStudyLogProps) {
  const [, setIsUpdateModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);

  const handleReadStudyLog = () => {
    setIsReadModalOpen(true);
  };

  const handleUpdateStudyLog = () => {
    setIsUpdateModalOpen(true);
  };

  const journalId = log?.journalId;
  // 스터디 일지 상세조회 API 호출
  const { data: logDetail } = useQuery<StudyLogDetail>({
    queryKey: ["studyLogDetail", journalId],
    queryFn: () => fetchStudyLogDetailApi(journalId),
    enabled: Number.isFinite(journalId),
  });
  console.log("log", log);

  return (
    <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
      <div className="flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-5">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Badge
                variant={log?.studyRole === "MEMBER" ? "yellow" : "purple"}
                icon={log?.studyRole === "MEMBER" ? StudyMember : StudyLeader}
              >
                {log?.studyRole == "MEMBER" ? "스터디원" : "스터디장"}
              </Badge>
              <span className="text-body-2-semibold text-gray-300">
                {log?.nickName}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <img src={eyeSvg} alt="조회수 아이콘" />
              <span className="text-body-2-semibold text-gray-200">
                {log?.viewCount}
              </span>
            </div>
          </div>
          <hr className="border-t-3 border-gray-100" />
          <div>
            <p className="text-body-1-semibold text-gray-300 mb-1">
              스터디 내용
            </p>
            <p className="text-body-1-semibold">{log?.title}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="solid"
              size="sm"
              onClick={handleReadStudyLog}
              className="flex-1"
            >
              상세보기
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleUpdateStudyLog}
            >
              수정하기
            </Button>
          </div>
        </div>
      </div>
      <StudyLogReadModal
        isOpen={isReadModalOpen}
        onClose={() => setIsReadModalOpen(false)}
        onConfirm={() => setIsReadModalOpen(false)}
        sessionId={Number(sessionId)}
        logDetail={logDetail}
      />
    </div>
  );
}
