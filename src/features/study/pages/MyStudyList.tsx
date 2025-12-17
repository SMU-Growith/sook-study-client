import { AuthHeader } from "@/components/layout/AuthHeader";
import { SideBar } from "@/components/ui/SideBar";
import { useEffect, useState } from "react";
import { MyStudyCard } from "../component/MyStudyCard";
import { useQuery } from "@tanstack/react-query";
import { studyQueryKeys } from "../api/queries";
import { fetchMyStudiesApi } from "../api/study";
import type { MyStudy } from "../api/studyType";
import ArrowRightSvg from "@/assets/arrow/arrowRight.svg";
import ArrowLeftSvg from "@/assets/arrow/arrowLeft.svg";

const TABS = [
  { label: "진행중", value: "ACTIVE" },
  { label: "종료", value: "CLOSED" },
] as const;

type StudyStatus = (typeof TABS)[number]["value"];

export function MyStudyList() {
  const [studyStatus, setStudyStatus] = useState<StudyStatus>("ACTIVE");

  const MAX_PAGE = 20;
  const WINDOW = 5;
  const [page, setPage] = useState(1);
  const [pageWindowStart, setPageWindowStart] = useState(1); // 1,6,11,16 ...

  const pageNumbers = Array.from(
    { length: WINDOW },
    (_, i) => pageWindowStart + i
  ).filter((p) => p <= MAX_PAGE);

  const SIZE = 6;
  const offset = page - 1;

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
  }, [studyStatus]);

  const { data: myStudies = [] } = useQuery<MyStudy[]>({
    queryKey: studyQueryKeys.myStudies(studyStatus, offset, SIZE),
    queryFn: () => fetchMyStudiesApi(offset, SIZE, studyStatus),
  });

  return (
    <div className="flex h-screen bg-white w-full">
      <AuthHeader />
      <SideBar />
      <main className="flex flex-col flex-1 ml-[160px] mt-[88px] px-20 py-10 gap-y-10 overflow-y-auto">
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            {TABS.map((tab) => (
              <button key={tab.value} onClick={() => setStudyStatus(tab.value)}>
                <h3
                  className={`heading-3 ${studyStatus === tab.value ? "" : "text-gray-200"}`}
                >
                  {tab.label}
                </h3>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-5">
            {myStudies.map((study) => (
              <MyStudyCard
                key={study.studyId}
                study={study}
                studyStatus={studyStatus}
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
    </div>
  );
}
