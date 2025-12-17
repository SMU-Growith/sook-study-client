import { Badge } from "@/components/ui/Badge";
import type { Stamp } from "@/features/study/api/studyType";
import CheerOff from "@/assets/stamp/cheerOff.svg";
import CheerOn from "@/assets/stamp/cheerOn.svg";
import LeaderOff from "@/assets/stamp/leaderOff.svg";
import LeaderOn from "@/assets/stamp/leaderOn.svg";
import RecordOff from "@/assets/stamp/recordOff.svg";
import RecordOn from "@/assets/stamp/recordOn.svg";
import SuperstartOff from "@/assets/stamp/superstarOff.svg";
import SuperstarOn from "@/assets/stamp/superstarOn.svg";
import WelcomeOff from "@/assets/stamp/welcomeOff.svg";
import WelcomeOn from "@/assets/stamp/welcomeOn.svg";

interface StampCardProps {
  stamp: Stamp;
  onCardClick?: (stampType: Stamp["stampType"]) => void;
}

export function StampCard({ stamp, onCardClick }: StampCardProps) {
  const handleCardClick = () => {
    onCardClick && onCardClick(stamp.stampType);
  };

  const badgeStatus = stamp.isCompleted
    ? "획득했어요"
    : stamp.isAchieved
      ? "도전중이에요"
      : "획득하지 못했어요";

  const getStampIcon = () => {
    switch (stamp.stampType) {
      case "WELCOME":
        return stamp.isAchieved ? WelcomeOn : WelcomeOff;
      case "LEADER":
        return stamp.isAchieved ? LeaderOn : LeaderOff;
      case "RECORD":
        return stamp.isAchieved ? RecordOn : RecordOff;
      case "CHEER":
        return stamp.isAchieved ? CheerOn : CheerOff;
      case "SUPERSTAR":
        return stamp.isAchieved ? SuperstarOn : SuperstartOff;
      default:
        return WelcomeOn;
    }
  };

  return (
    <div
      className="text-body-1-semibold border-2 border-gray-200 rounded-[10px] flex flex-col justify-center cursor-default px-5 py-5"
      onClick={handleCardClick}
    >
      <Badge
        variant={
          stamp.isCompleted ? "blue" : stamp.isAchieved ? "yellow" : "gray"
        }
      >
        {badgeStatus}
      </Badge>
      <span className="mt-2">{stamp.stampName}</span>
      <hr className="border-t-3 border-gray-200 w-full mt-4 mb-4" />
      <img src={getStampIcon()} alt={stamp.stampName} />
    </div>
  );
}
