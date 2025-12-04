import { Modal } from '@/components/ui/Modal';
import CloseSvg from '@/assets/icons/close.svg';
import { Button } from '@/components/ui/button';

interface StudyFinishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export function StudyFinishModal({ isOpen, onClose, onConfirm }: StudyFinishModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[550px]">
      <div className="flex flex-col text-left relative pt-4">
        <button onClick={onClose} className="absolute top-[-10px] right-0">
          <img src={CloseSvg} alt="닫기" className="w-6 h-6" />
        </button>
        <h3 className="heading-3 mb-2">스터디 종료하기</h3>
        <hr className="border-t-3 border-gray-100 mb-[35px]" />
        <p className="text-body-1-semibold mb-[10px]">스터디를 정말 종료할까요?</p>
        <p className="text-body-2 text-gray-400 mb-[28px]">
          스터디를 종료하게 되면 다시 시작할 수 없어요. <br /> 지금까지의 기록은 전부 다시 볼 수
          있어요.
        </p>
        <div className="flex gap-[10px] mt-[12px] mb-[12px]">
          <Button variant="default" onClick={onClose}>
            닫기
          </Button>
          <Button variant="primary" className="flex-1" onClick={onConfirm}>
            종료하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
