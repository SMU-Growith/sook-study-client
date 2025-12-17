import { AuthHeader } from "@/components/layout/AuthHeader";
import { Button } from "@/components/ui/button";
import PlusSvg from "@/assets/icons/plus.svg";
import { StudyLogCreateModal } from "../component/StudyLogCreateModal";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useParams } from "react-router-dom";
import { StudyLogCard } from "@/features/study/component/MyStudyLogCard";
import type { StudyLogDetail, StudyLogList } from "../api/studyType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStudyLogApi, fetchStudyLogsApi } from "../api/study";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/lib/api";
import type { TStudyLogSchema } from "../validators/study";
import { studyQueryKeys } from "../api/queries";
import ArrowRightSvg from "@/assets/arrow/arrowRight.svg";
import ArrowLeftSvg from "@/assets/arrow/arrowLeft.svg";

export function MyStudyLog() {
  const auth = useAuthStore();
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  // const [searchParams] = useSearchParams();
  const { sessionId } = useParams<{ studyId: string; sessionId: string }>();
  // const sessionTitle = searchParams.get("sessionTitle");
  const MAX_PAGE = 20;
  const WINDOW = 5;
  const [page, setPage] = useState(1);
  const [pageWindowStart, setPageWindowStart] = useState(1); // 1,6,11,16 ...

  const pageNumbers = Array.from(
    { length: WINDOW },
    (_, i) => pageWindowStart + i
  ).filter((p) => p <= MAX_PAGE);

  const SIZE = 9;
  const offset = page - 1;

  // 일지 리스트 불러오기
  const sessionIdNum = Number(sessionId);
  const { data: logData } = useQuery<StudyLogList>({
    queryKey: studyQueryKeys.studyLogs(sessionIdNum, offset, SIZE),
    queryFn: () => fetchStudyLogsApi(sessionIdNum, offset, SIZE),
    enabled: Number.isFinite(sessionIdNum),
  });

  // const totalCount = logData?.totalCount ?? 0;
  // const title = logData?.title ?? "";
  const logs = logData?.journals ?? [];
  const isWritten = false; // logData?.isWritten ??
  const queryClient = useQueryClient();

  const { mutate: submitStudyLog } = useMutation<
    StudyLogDetail,
    AxiosError<ApiResponse<null>>,
    { sessionId: number; data: TStudyLogSchema }
  >({
    mutationFn: ({ sessionId, data }) => createStudyLogApi(sessionId, data),
    onSuccess: (res) => {
      console.log("스터디 로그 생성 성공:", res);
      queryClient.invalidateQueries({
        queryKey: studyQueryKeys.studyLogs(sessionIdNum, offset, SIZE),
      });
      setIsWriteModalOpen(false);
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message?: string }>;
      alert(err.response?.data?.message || "스터디 일지 작성 실패");
    },
  });

  const handleCreateStudyLog = (data: TStudyLogSchema) => {
    submitStudyLog({
      sessionId: sessionIdNum,
      data,
    });
    setIsWriteModalOpen(false);
  };

  const handleNextWindow = () => {
    setPageWindowStart((s) => Math.min(s + WINDOW, MAX_PAGE - (WINDOW - 1)));
  };

  const handlePrevWindow = () => {
    setPageWindowStart((s) => Math.max(1, s - WINDOW));
  };

  const resetPagination = () => {
    setPage(1);
    setPageWindowStart(1);
  };

  useEffect(() => {
    setPage(pageWindowStart);
  }, [pageWindowStart]);

  useEffect(() => {
    resetPagination();
  }, [sessionIdNum]);

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
              <h2 className="heading-2">{logData?.title}</h2>
            </div>
            {auth.isLeader && (
              <div className="flex gap-2">
                <Button
                  variant={isWritten ? "disabled" : "primary"}
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
            {isWritten ? null : (
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
                  nextSessionId={sessionIdNum}
                  sessionTitle={logData?.title || "스터디 한 것들 정리"}
                />
              </div>
            )}
            {logs
              .slice()
              .reverse()
              .map((log) => (
                <StudyLogCard
                  key={log.journalId}
                  sessionId={sessionIdNum}
                  log={log}
                  isEmpty={false}
                />
              ))}
          </div>
          <div className="flex justify-center items-center gap-6">
            <button onClick={handlePrevWindow} disabled={pageWindowStart === 1}>
              <img src={ArrowLeftSvg} alt="이전" />
            </button>
            <div className="flex items-center gap-2">
              {pageNumbers.map((p) => (
                <button
                  key={p}
                  className={`text-caption-semibold rounded-[4px] px-[8px] py-[2px]
                ${page == p ? "text-white bg-gray-400 hover:bg-gray-300" : "text-gray-400 hover:bg-gray-100"}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextWindow}
              disabled={pageWindowStart + WINDOW > MAX_PAGE}
            >
              <img src={ArrowRightSvg} alt="다음" />
            </button>
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
        sessionTitle={logData?.title || "스터디 한 것들 정리"}
      />
    </div>
  );
}
