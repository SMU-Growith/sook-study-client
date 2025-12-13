import { Badge } from "./Badge";
import { Tag } from "./Tag";
import UserProfileSvg from "@/assets/icons/userProfile.svg";
import HeartSvg from "@/assets/icons/heart.svg";
import HeartFillSvg from "@/assets/icons/heartFill.svg";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import type { StudyResult, ToggleScrap } from "@/features/study/api/studyType";
import {
  STUDY_FORMAT_LABEL,
  STUDY_STYLE_LABEL,
} from "@/features/study/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/lib/api/apiClient";
import { toggleStudyScrapApi } from "@/features/study/api/study";
import { studyQueryKeys } from "@/features/study/api/queries";
export interface Study {
  id: number;
  title: string;
  status: "모집중" | "모집완료";
  tags: string[];
  author: string;
  likeCount: number;
}

interface StudyCardProps {
  study: StudyResult;
  onCardClick?: () => void;
}

export function StudyCard({ study, onCardClick }: StudyCardProps) {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const { mutate: toggleScrap } = useMutation<
    ToggleScrap,
    AxiosError<ApiResponse<null>>,
    { studyId: number }
  >({
    mutationFn: ({ studyId }) => toggleStudyScrapApi(studyId),
    onSuccess: async (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: studyQueryKeys.studyMatch(),
      });
    },
    onError: (error) => {
      alert(
        error.response?.data?.message || "스터디 스크랩 수정에 실패했습니다."
      );
    },
  });

  const handleScrapClick = () => {
    toggleScrap({ studyId: study.studyId });
  };

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
        <div className="flex flex-col gap-y-5" onClick={handleCardClick}>
          <div>
            <Badge
              variant={study.studyStatus === "ACTIVE" ? "purple" : "black"}
            >
              {study.studyStatus}
            </Badge>
          </div>
          <h3 className="heading-3">{study.title}</h3>
          <div className="flex flex-wrap gap-1">
            <Tag>{STUDY_FORMAT_LABEL[study.studyFormat]}</Tag>
            <Tag>{study.studyFieldName}</Tag>
            <Tag>{STUDY_STYLE_LABEL[study.studyStyleCategory]}</Tag>
          </div>
          <hr className="border-t-3 border-gray-100" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={UserProfileSvg} alt="User Profile" />
            <span className="text-body-2-semibold text-gray-400 ml-1">
              {/* {study.nickname} */}
              임시닉네임
            </span>
          </div>
          <div className="flex items-center">
            <img
              src={study.isScraped ? HeartFillSvg : HeartSvg}
              alt="Heart Background"
              onClick={handleScrapClick}
            />
            <span className="text-body-2-semibold text-gray-400 ml-1">
              {study.scrapCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
