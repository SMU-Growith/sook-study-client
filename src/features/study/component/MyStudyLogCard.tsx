import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import StudyLeader from "@/assets/studyLeader.svg";
import StudyMember from "@/assets/studyMember.svg";
import eyeSvg from "@/assets/eye.svg";
import { Button } from "@/components/ui/button";
import { StudyLogReadModal } from "./StudyLogReadModal";
import type { StudyLogDetail, StudyLogPreview } from "../api/studyType";
import {
  deleteStudyLogApi,
  fetchStudyLogDetailApi,
  updateStudyLogApi,
} from "../api/study";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { StudyLogUpdateModal } from "./StudyLogUpdateModal";
import type { TStudyLogSchema } from "../validators/study";
import type { ApiResponse } from "@/lib/api/apiClient";
import type { AxiosError } from "axios";
import { studyQueryKeys } from "../api/queries";

interface MyStudyLogProps {
  sessionId: number;
  log: StudyLogPreview;
  isEmpty?: boolean; // TODO isEmpty prop 받는 것이 아닌 log 데이터로 판단하도록 수정 필요
  sessionTitle?: string | null;
}

export function StudyLogCard({ sessionId, log }: MyStudyLogProps) {
  const queryClient = useQueryClient();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);

  const { mutate: deleteStudyLog } = useMutation<
    ApiResponse<null>,
    AxiosError<ApiResponse<null>>,
    { journalId: number }
  >({
    mutationFn: ({ journalId }) => deleteStudyLogApi(journalId),
    onSuccess: (_res, vars) => {
      console.log("스터디 로그 삭제 성공:", _res);

      queryClient.invalidateQueries({
        queryKey: studyQueryKeys.studyLogs(sessionId, 0, 9),
      });
      queryClient.removeQueries({
        queryKey: studyQueryKeys.studyLogDetail(vars.journalId),
      });
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message?: string }>;
      alert(err.response?.data?.message || "스터디 일지 삭제 실패");
    },
  });

  const handleDeleteStudyLog = () => {
    deleteStudyLog({ journalId: log.journalId });
    setIsUpdateModalOpen(false);
  };

  const { mutate: updateStudyLog } = useMutation<
    StudyLogDetail,
    AxiosError<ApiResponse<null>>,
    { journalId: number; data: TStudyLogSchema }
  >({
    mutationFn: ({ journalId, data }) => updateStudyLogApi(journalId, data),
    onSuccess: (_res, vars) => {
      console.log("스터디 로그 수정 성공:", _res);
      queryClient.invalidateQueries({
        queryKey: studyQueryKeys.studyLogDetail(vars.journalId),
      });
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message?: string }>;
      alert(err.response?.data?.message || "스터디 일지 수정 실패");
    },
  });

  const handleUpdateStudyLog = (data: TStudyLogSchema) => {
    updateStudyLog({ journalId: log.journalId, data });
    setIsUpdateModalOpen(false);
  };

  const journalId = log?.journalId;
  // 스터디 일지 상세조회 API 호출
  const { data: logDetail } = useQuery<StudyLogDetail>({
    queryKey: studyQueryKeys.studyLogDetail(journalId),
    queryFn: () => fetchStudyLogDetailApi(journalId),
    enabled: Number.isFinite(journalId),
  });

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
              onClick={() => {
                setIsReadModalOpen(true);
                console.log("journalId: " + log.journalId);
              }}
              className="flex-1"
            >
              상세보기
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsUpdateModalOpen(true)}
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
      <StudyLogUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleUpdateStudyLog}
        onDelete={handleDeleteStudyLog}
        sessionId={Number(sessionId)}
        logDetail={logDetail}
      />
    </div>
  );
}
