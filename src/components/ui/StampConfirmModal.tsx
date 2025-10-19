import { Modal } from '@/components/ui/Modal';
import { Button } from './Button';
import CloseSvg from '@/assets/icons/close.svg';

interface StampConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export function StampConfirmModal({ isOpen, onClose, onConfirm }: StampConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col text-left relative pt-4">
        <button onClick={onClose} className="absolute top-[-10px] right-0">
          <img src={CloseSvg} alt="닫기" className="w-6 h-6" />
        </button>
        <h3 className="heading-3 mb-2">숙터디 웰컴 스탬프 획득 !</h3>
        <p className="text-body-1 mb-1">
          스터디를 하며
          <br />
          다양한 스탬프를 모을 수 있어요.
        </p>
        <div className="flex gap-[10px] mt-[12px] mb-[12px]">
          <Button variant="default" onClick={onClose}>
            닫기
          </Button>
          <Button variant="primary" className="flex-1" onClick={onConfirm}>
            내 스탬프 보러가기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
