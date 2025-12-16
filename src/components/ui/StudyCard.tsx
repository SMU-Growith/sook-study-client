import { Badge } from "./Badge";
import { Tag } from "./Tag";
import UserProfileSvg from "@/assets/icons/userProfile.svg";
import HeartSvg from "@/assets/icons/heart.svg";
import HeartFillSvg from "@/assets/icons/heartFill.svg";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import type { StudyResult, ToggleScrap } from "@/features/study/api/studyType";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/lib/api/apiClient";
import { toggleStudyScrapApi } from "@/features/study/api/study";
import { STUDY_STATUS_FILTER_LABEL } from "@/features/study/constants";
import { useEffect, useRef, useState } from "react";

interface StudyCardProps {
  study: StudyResult;
  onCardClick?: () => void;
}

export function StudyCard({ study, onCardClick }: StudyCardProps) {
  // const queryClient = useQueryClient();
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const [isScraped, setIsScraped] = useState(study.isScraped);
  const [scrapCount, setScrapCount] = useState(study.scrapCount);

  const isScrapedRef = useRef(isScraped);
  useEffect(() => {
    isScrapedRef.current = isScraped;
  }, [isScraped]);

  useEffect(() => {
    setIsScraped(study.isScraped);
    setScrapCount(study.scrapCount);
  }, [study.isScraped, study.scrapCount]);

  const handleScrapClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPending) return;

    const current = isScrapedRef.current;
    const delta = current ? -1 : 1;

    setIsScraped(!current);
    setScrapCount((prev) => prev + delta);

    toggleScrap({ studyId: study.studyId });
  };

  const { mutate: toggleScrap, isPending } = useMutation<
    ToggleScrap,
    AxiosError<ApiResponse<null>>,
    { studyId: number }
  >({
    mutationFn: ({ studyId }) => toggleStudyScrapApi(studyId),
    // onSuccess: async (_data, vars) => {
    //   queryClient.invalidateQueries({
    //     queryKey: studyQueryKeys.studyMatch(),
    //   });
    // },
    onError: (error) => {
      setIsScraped(study.isScraped);
      setScrapCount(study.scrapCount);
      alert(
        error.response?.data?.message || "스터디 스크랩 수정에 실패했습니다."
      );
    },
  });

  const handleCardClick = () => {
    if (isLoggedIn) {
      navigate(`/study/detail/${study.studyId}`);
    } else {
      onCardClick?.();
    }
  };

  return (
    <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
      <div className="flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-5">
          <div>
            <Badge variant={study.isRecruiting ? "purple" : "black"}>
              {
                STUDY_STATUS_FILTER_LABEL[
                  study.isRecruiting ? "ACTIVE" : "CLOSED"
                ]
              }
            </Badge>
          </div>
          <h3 className="heading-3" onClick={handleCardClick}>
            {study.title}
          </h3>
          <div className="flex flex-wrap gap-1">
            <Tag>{study.studyFormat}</Tag>
            <Tag>{study.studyFieldName}</Tag>
            <Tag>{study.studyStyleCategory}</Tag>
          </div>
          <hr className="border-t-3 border-gray-100" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={UserProfileSvg} alt="User Profile" />
            <span className="text-body-2-semibold text-gray-400 ml-1">
              {study.nickname}
            </span>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleScrapClick}
              disabled={isPending}
            >
              <img src={isScraped ? HeartFillSvg : HeartSvg} alt="Heart" />
            </button>
            <span className="text-body-2-semibold text-gray-400 ml-1">
              {scrapCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
