import BadgeLeaderDetail from '@/assets/badges/badgeLeaderDetail.svg';
import BadgeSuperDetail from '@/assets/badges/badgeSuperDetail.svg';

interface StudyFinishModalProps {
  isOpen: boolean;
  badgeType: string | null;
  onClose: () => void;
  onConfirm: () => void;
}
export function StudyDetailModal({ isOpen, badgeType, onClose }: StudyFinishModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bk/50" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-[260px] rounded-[20px]"
      >
        {badgeType === 'leader' && <img src={BadgeLeaderDetail} alt="리더 스탬프 상세 이미지" />}
        {badgeType === 'super' && <img src={BadgeSuperDetail} alt="슈퍼 송이 스탬프 상세 이미지" />}
      </div>
    </div>
  );
}
