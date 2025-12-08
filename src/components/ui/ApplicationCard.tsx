import { Badge } from "./Badge";
import { Tag } from "./Tag";
import UserProfileSvg from "@/assets/icons/userProfile.svg";
import HeartSvg from "@/assets/icons/heart.svg";
import HeartFillSvg from "@/assets/icons/heartFill.svg";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { ApplicationDeleteModal } from "./ApplicationDeleteModal";

export interface Application {
  // Study 정보 + approved 필드
  id: number;
  title: string;
  status: "모집중" | "모집완료";
  tags: string[];
  author: string;
  likeCount: number;
  applyStatus: "APPROVED" | "PENDING" | "REJECTED";
  applicationDate: string;
}

interface ApplicationCardProps {
  application: Application;
  onCardClick?: () => void;
}

export function ApplicationCard({
  application,
  onCardClick,
}: ApplicationCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(application.likeCount);
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
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
              variant={application.status === "모집중" ? "purple" : "black"}
            >
              {application.status}
            </Badge>
          </div>
          <h3 className="heading-3">{application.title}</h3>
          <div className="flex gap-1">
            {application.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={UserProfileSvg} alt="User Profile" />
            <span className="text-body-2-semibold text-gray-400 ml-1">
              {application.author}
            </span>
          </div>
          <div className="flex items-center">
            <img
              src={isLiked ? HeartFillSvg : HeartSvg}
              alt="Heart Background"
              onClick={handleLikeClick}
            />
            <span className="text-body-2-semibold text-gray-400 ml-1">
              {likeCount}
            </span>
          </div>
        </div>
        <hr className="border-t-3 border-gray-100" />
        <p className="text-caption text-gray-300">
          신청날짜 {application.applicationDate}
        </p>
        {application.applyStatus === "APPROVED" && (
          <Button variant="disabled" size="md" disabled>
            승인이 완료되었어요
          </Button>
        )}
        {application.applyStatus === "PENDING" && (
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
        {application.applyStatus === "REJECTED" && (
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
