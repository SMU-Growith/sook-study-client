import { AuthHeader } from "@/components/layout/AuthHeader";
import UserProfileSvg from "@/assets/icons/userProfile.svg";
import { useState } from "react";
import { StampDetailModal } from "../components/StampDetailModal";
import { fetchStudyStampsApi } from "@/lib/api";
import type { Stamp, StampList } from "@/features/study/api/studyType";
import { authQueryKeys } from "../api/queries";
import { useQuery } from "@tanstack/react-query";
import { StampCard } from "../components/StampCard";

export function MyStamp() {
  const [isStampDetailModalOpen, setIsStampDetailModalOpen] = useState(false);
  const [selectedStamp, setSelectedStamp] = useState<Stamp["stampType"] | null>(
    null
  );

  const openModal = (stampType: Stamp["stampType"]) => {
    setSelectedStamp(stampType);
    setIsStampDetailModalOpen(true);
  };

  // 스탬프 조회 api
  const { data: stampList, isLoading } = useQuery<StampList>({
    queryKey: authQueryKeys.stampList(),
    queryFn: () => fetchStudyStampsApi(),
  });

  if (isLoading || !stampList) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <AuthHeader />
      <main className="flex flex-col mt-[88px] overflow-y-auto w-[700px]">
        <div className="w-full h-[90px] bg-gray-100 rounded-[10px] mb-6">
          <div className="flex items-center h-full gap-5">
            <img
              src={UserProfileSvg}
              alt="User Profile"
              className="ml-5 w-10 h-10"
            />
            <div className="flex flex-col">
              <p className="text-body-1-semibold">김눈송</p>
              <p className="text-body-1">
                진행중인 스탬프{" "}
                <span className="text-primary-500 text-body-1-semibold">
                  {stampList.inProgressCount}{" "}
                </span>{" "}
                | 완료한 스탬프{" "}
                <span className="text-primary-500 text-body-1-semibold">
                  {stampList.completedCount}{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 mb-10">
          {stampList.stamps.map((stamp) => (
            <StampCard
              key={stamp.stampType}
              stamp={stamp}
              onCardClick={openModal}
            />
          ))}
        </div>
      </main>
      <StampDetailModal
        isOpen={isStampDetailModalOpen}
        stamp={
          stampList.stamps.find((stamp) => stamp.stampType === selectedStamp) ??
          null
        }
        onClose={() => setIsStampDetailModalOpen(false)}
      />
    </div>
  );
}
