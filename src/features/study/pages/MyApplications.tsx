import { AuthHeader } from "@/components/layout/AuthHeader";
import { SideBar } from "@/components/ui/SideBar";
import { useState } from "react";
import ArrowLeftSvg from "@/assets/arrow/arrowLeft.svg";
import ArrowRightSvg from "@/assets/arrow/arrowRight.svg";
import { ApplicationCard } from "@/features/study/component/ApplicationCard";
import { useQuery } from "@tanstack/react-query";
import type { MyApplication } from "../api/studyType";
import { studyQueryKeys } from "../api/queries";
import { fetchMyApplicationsApi } from "../api/study";

export function MyApplications() {
  const pageNumbers = [1, 2, 3, 4, 5]; // [lf] 페이지 번호 배열
  const [page, setPage] = useState(1); // [lf] 현재 페이지

  const { data: myApplicationsData, isLoading } = useQuery<MyApplication[]>({
    queryKey: studyQueryKeys.myApplications(),
    queryFn: () => fetchMyApplicationsApi(),
    enabled: true,
  });

  if (isLoading || !myApplicationsData) {
    return null;
  }

  return (
    <div className="flex h-screen bg-white w-full">
      <AuthHeader />
      <SideBar />
      <main className="flex flex-col flex-1 ml-[160px] mt-[88px] px-20 py-10 gap-y-10 overflow-y-auto">
        <div></div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-5">
              {myApplicationsData.map((application) => (
                <ApplicationCard
                  key={application.applicationId}
                  application={application}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center gap-6">
            <button>
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
            <button>
              <img src={ArrowRightSvg} alt="다음" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
