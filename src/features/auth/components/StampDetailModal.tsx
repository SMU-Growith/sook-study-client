import { Modal } from "@/components/ui/Modal";
import type { Stamp } from "@/features/study/api/studyType";
import CloseSvg from "@/assets/icons/close.svg";
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
import StampLevelDoing from "@/assets/stamp/level/stampLevelDoing.svg";
import CheerLevel1 from "@/assets/stamp/level/cheerLevel1.svg";
import CheerLevel2 from "@/assets/stamp/level/cheerLevel2.svg";
import LeaderLevel1 from "@/assets/stamp/level/leaderLevel1.svg";
import LeaderLevel2 from "@/assets/stamp/level/leaderLevel2.svg";
import RecordLevel1 from "@/assets/stamp/level/recordLevel1.svg";
import RecordLevel2 from "@/assets/stamp/level/recordLevel2.svg";
import SuperstarLevel1 from "@/assets/stamp/level/superstarLevel1.svg";
import SuperstarLevel2 from "@/assets/stamp/level/superstarLevel2.svg";
import StampCheck from "@/assets/stamp/level/stampCheck.svg";

interface StampDetailModalProps {
  isOpen: boolean;
  stamp: Stamp | null;
  onClose: () => void;
}
export function StampDetailModal({
  isOpen,
  stamp,
  onClose,
}: StampDetailModalProps) {
  const getStampIcon = () => {
    switch (stamp?.stampType) {
      case "WELCOME":
        return stamp?.isAchieved ? WelcomeOn : WelcomeOff;
      case "LEADER":
        return stamp.isAchieved ? LeaderOn : LeaderOff;
      case "RECORD":
        return stamp?.isAchieved ? RecordOn : RecordOff;
      case "CHEER":
        return stamp?.isAchieved ? CheerOn : CheerOff;
      case "SUPERSTAR":
        return stamp?.isAchieved ? SuperstarOn : SuperstartOff;
      default:
        return WelcomeOn;
    }
  };

  // TODO 리펙터링..
  const getLevelIcon = (level: string, isAchieved: boolean) => {
    if (stamp?.stampType === "LEADER") {
      if (level === "LEVEL_1") {
        if (isAchieved) {
          return LeaderLevel1;
        }
        return StampLevelDoing;
      } else if (level === "LEVEL_2") {
        if (isAchieved) {
          return LeaderLevel2;
        }
        return StampLevelDoing;
      }
    } else if (stamp?.stampType === "RECORD") {
      if (level === "LEVEL_1") {
        if (isAchieved) {
          return RecordLevel1;
        }
        return StampLevelDoing;
      } else if (level === "LEVEL_2") {
        if (isAchieved) {
          return RecordLevel2;
        }
        return StampLevelDoing;
      }
    } else if (stamp?.stampType === "CHEER") {
      if (level === "LEVEL_1") {
        if (isAchieved) {
          return CheerLevel1;
        }
        return StampLevelDoing;
      } else if (level === "LEVEL_2") {
        if (isAchieved) {
          return CheerLevel2;
        }
        return StampLevelDoing;
      }
    } else if (stamp?.stampType === "SUPERSTAR") {
      if (level === "LEVEL_1") {
        if (isAchieved) {
          return SuperstarLevel1;
        }
        return StampLevelDoing;
      } else if (level === "LEVEL_2") {
        if (isAchieved) {
          return SuperstarLevel2;
        }
        return StampLevelDoing;
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[300px]">
      <div className="flex flex-col text-left relative pt-4 px-1">
        <button onClick={onClose} className="absolute top-[-10px] right-0">
          <img src={CloseSvg} alt="닫기" className="w-6 h-6" />
        </button>
        <h3 className="heading-3 mb-2">{stamp?.stampName}</h3>
        <img src={getStampIcon()} alt={stamp?.stampName} />
        <p className="text-body-1 text-gray-scale-500 m-4">
          {stamp?.description}
        </p>

        {stamp && stamp.levels.length > 0 && stamp.stampType !== "WELCOME" && (
          <>
            <hr className="border-t-2 border-gray-100" />
            {stamp.levels.map((stampLevel) => (
              <div
                key={stampLevel.stampId}
                className="flex gap-[12px] py-4 justify-start items-center"
              >
                <img
                  src={getLevelIcon(stampLevel.level, stampLevel.isAchieved)}
                  alt={stampLevel.levelName}
                  className="w-18 h-18"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    {stampLevel.isAchieved && (
                      <img
                        src={StampCheck}
                        alt="Achieved"
                        className="w-5 h-5"
                      />
                    )}
                    <p className="text-subtitle-1">{stampLevel.levelName}</p>
                  </div>
                  <p
                    className={
                      stampLevel.isAchieved
                        ? "text-body-1 text-success-200"
                        : "text-body-1"
                    }
                  >
                    {stampLevel.levelDescription}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </Modal>
  );
}
