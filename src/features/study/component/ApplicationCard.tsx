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
import type { MyApplication } from "../api/studyType";

interface ApplicationCardProps {
  application: MyApplication;
  onCardClick?: () => void;
}

export function ApplicationCard({
  application,
  onCardClick,
}: ApplicationCardProps) {
  const [isScrapped, setIsScrapped] = useState(false);
  const [scrapCount, setScrapCount] = useState(application.scrapCount);
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleScrapClick = () => {
    setIsScrapped(!isScrapped);
    setScrapCount(isScrapped ? scrapCount - 1 : scrapCount + 1);
  };

  const handleCardClick = () => {
    if (isLoggedIn) {
      navigate("/study/detail/1");
    } else {
      onCardClick?.();
    }
  };

  const deleteApplication = () => {
    // 지원 취소 api 연동
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
              src={isScrapped ? HeartFillSvg : HeartSvg}
              alt="Heart Background"
              onClick={handleScrapClick}
            />
            <span className="text-body-2-semibold text-gray-400 ml-1">
              {scrapCount}
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
