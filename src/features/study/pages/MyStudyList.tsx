import { AuthHeader } from "@/components/layout/AuthHeader";
import { SideBar } from "@/components/ui/SideBar";
import { useState } from "react";
import { MyStudyCard } from "../component/MyStudyCard";
import { useQuery } from "@tanstack/react-query";
import { studyQueryKeys } from "../api/queries";
import { fetchMyStudiesApi } from "../api/study";
import type { MyStudy } from "../api/studyType";

const TABS = [
  { label: "진행중", value: "ACTIVE" },
  { label: "종료", value: "CLOSED" },
] as const;

type StudyStatus = (typeof TABS)[number]["value"];

export function MyStudyList() {
  const [studyStatus, setStudyStatus] = useState<StudyStatus>("ACTIVE");

  const { data: myStudies = [] } = useQuery<MyStudy[]>({
    queryKey: studyQueryKeys.myStudies(studyStatus),
    queryFn: () => fetchMyStudiesApi(0, 10, studyStatus),
  });

  return (
    <div className="flex h-screen bg-white w-full">
      <AuthHeader />
      <SideBar />
      <main className="flex flex-col flex-1 ml-[160px] mt-[88px] px-20 py-10 gap-y-10 overflow-y-auto">
        <div></div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setStudyStatus(tab.value)}
                >
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
          </div>
        </div>
      </main>
    </div>
  );
}
