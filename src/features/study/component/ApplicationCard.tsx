import { Badge } from "../../../components/ui/Badge";
import { Tag } from "../../../components/ui/Tag";
import UserProfileSvg from "@/assets/icons/userProfile.svg";
import HeartSvg from "@/assets/icons/heart.svg";
import HeartFillSvg from "@/assets/icons/heartFill.svg";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { ApplicationDeleteModal } from "./ApplicationDeleteModal";
import type { MyApplication, ToggleScrap } from "../api/studyType";
import type { ApiResponse } from "@/lib/api/apiClient";
import type { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studyQueryKeys } from "../api/queries";
import { deleteStudyApplicationApi, toggleStudyScrapApi } from "../api/study";

interface ApplicationCardProps {
  application: MyApplication;
  onCardClick?: () => void;
}

export function ApplicationCard({
  application,
  onCardClick,
}: ApplicationCardProps) {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  console.log("application:", application);

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
    toggleScrap({ studyId: application.studyId });
  };

  const handleCardClick = () => {
    if (isLoggedIn) {
      navigate("/study/detail/" + application.studyId);
    } else {
      onCardClick?.();
    }
  };

  const { mutate: cancelAppliation } = useMutation<
    ApiResponse<null>,
    AxiosError<ApiResponse<null>>,
    { applicationId: number }
  >({
    mutationFn: ({ applicationId }) => deleteStudyApplicationApi(applicationId),
    onSuccess: (_res, vars) => {
      console.log("스터디 지원내역 삭제 성공:", _res);
      queryClient.invalidateQueries({
        queryKey: studyQueryKeys.myApplications(),
      });
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message?: string }>;
      alert(err.response?.data?.message || "스터디 지원내역 삭제 실패");
    },
  });

  const deleteApplication = () => {
    cancelAppliation({ applicationId: application.applicationId });
    setDeleteModalOpen(false);
  };

  return (
    <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
      <div className="flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-5" onClick={handleCardClick}>
          <div>
            <Badge
              variant={
                application.studyStatus === "ACTIVE" ? "purple" : "black"
              }
            >
              {application.studyStatus === "ACTIVE" ? "모집중" : "모집종료"}
            </Badge>
          </div>
          <h3 className="heading-3">{application.title}</h3>
          <div className="flex flex-wrap gap-1">
            <Tag>{application.studyFormat}</Tag>
            <Tag>{application.studyFieldName}</Tag>
            <Tag>{application.studyStyleCategory}</Tag>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={UserProfileSvg} alt="User Profile" />
            <span className="text-body-2-semibold text-gray-400 ml-1">
              {application.nickname}
            </span>
          </div>
          <div className="flex items-center">
            <img
              src={application.isScraped ? HeartFillSvg : HeartSvg}
              alt="Heart Background"
              onClick={handleScrapClick}
            />
            <span className="text-body-2-semibold text-gray-400 ml-1">
              {application.scrapCount}
            </span>
          </div>
        </div>
        <hr className="border-t-3 border-gray-100" />
        <p className="text-caption text-gray-300">
          신청날짜 {application.createdAt.split("T")[0]}
        </p>
        {application.applicationStatus === "ACCEPTED" && (
          <Button variant="disabled" size="md" disabled>
            승인이 완료되었어요
          </Button>
        )}
        {application.applicationStatus === "PENDING" && (
          <div className="flex gap-2">
            <Button variant="disabled" size="md" className="flex-1" disabled>
              승인 대기중
            </Button>
            <Button
              variant="deleted"
              size="md"
              className="flex-1"
              onClick={() => setDeleteModalOpen(true)}
            >
              지원 취소
            </Button>
          </div>
        )}
        {application.applicationStatus === "REJECTED" && (
          <Button variant="disabled" size="md" disabled>
            거절되었어요🥹
          </Button>
        )}
        {deleteModalOpen && (
          <ApplicationDeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={() => {
              deleteApplication();
            }}
          />
        )}
      </div>
    </div>
  );
}
