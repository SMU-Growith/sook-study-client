import { Modal } from '@/components/ui/modal';
import { Button } from './Button';
import CloseSvg from '@/assets/icons/close.svg';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: () => void;
}
export function LoginPromptModal({ isOpen, onClose, onLogin }: LoginPromptModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col text-left relative pt-4">
        <button onClick={onClose} className="absolute top-[-10px] right-0">
          <img src={CloseSvg} alt="닫기" className="w-6 h-6" />
        </button>
        <h3 className="heading-3 mb-2">로그인/회원가입</h3>
        <p className="text-body-1 mb-1">
          로그인/회원가입 후<br />
          숙터디의 모든 기능을 이용해보세요 !
        </p>
        <Button variant="primary" className="mt-[12px] mb-[12px]" onClick={onLogin}>
          로그인하기
        </Button>
      </div>
    </Modal>
  );
}
