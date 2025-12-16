import { useNavigate } from "react-router-dom";
import StudyLeader from "@/assets/studyLeader.svg";
import StudyMember from "@/assets/studyMember.svg";
import Calendar from "@/assets/calendar.svg";
import People from "@/assets/people.svg";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/button";
import type { MyStudy } from "../api/studyType";

interface MyStudyCardProps {
  study: MyStudy;
  onCardClick?: () => void;
  studyStatus: "ACTIVE" | "CLOSED";
}

export function MyStudyCard({ study, studyStatus }: MyStudyCardProps) {
  const navigate = useNavigate();

  const handleStudyInClick = () => {
    navigate(`/study/my/${study.studyId}`);
  };

  const handleCardClick = () => {
    navigate(`/study/detail/${study.studyId}`);
  };

  return (
    <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
      <div className="flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-5">
          <div>
            <Badge
              variant={study.studyRole === "LEADER" ? "purple" : "yellow"}
              icon={study.studyRole === "LEADER" ? StudyLeader : StudyMember}
            >
              {study.studyRole === "LEADER" ? "스터디장" : "스터디원"}
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
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <img src={People} alt="People" className="px-[2px] w-5 h-5" />
              <span className="text-body-2-semibold text-gray-400">
                멤버 {study.memberCount}명
              </span>
            </div>
            <div className="flex items-center gap-1">
              <img src={Calendar} alt="Calendar" className="px-[2px] w-5 h-5" />
              <span className="text-body-2-semibold text-gray-400">
                {study.studySessionCount}일째
              </span>
            </div>
          </div>
          <Button variant="solid" onClick={handleStudyInClick}>
            {studyStatus === "ACTIVE" ? "스터디 참여하기" : "스터디 보기"}
          </Button>
        </div>
      </div>
    </div>
  );
}
