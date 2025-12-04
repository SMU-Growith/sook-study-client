import { Modal } from '@/components/ui/Modal';
import CloseSvg from '@/assets/icons/close.svg';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/InputField';

interface StudySessionCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  nextSessionId?: number;
}
export function StudySessionCreateModal({
  isOpen,
  onClose,
  onConfirm,
  nextSessionId,
}: StudySessionCreateModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[550px]">
      <div className="flex flex-col text-left relative pt-4">
        <button onClick={onClose} className="absolute top-[-10px] right-0">
          <img src={CloseSvg} alt="닫기" className="w-6 h-6" />
        </button>
        <h3 className="heading-3 mb-2">스터디 일지 생성하기</h3>
        <hr className="border-t-3 border-gray-100 mb-[22px]" />
        <p className="text-gray-300 text-body-1-semibold mb-[22px]">{nextSessionId}회차</p>
        <InputField
          label="스터디 일지"
          placeholder="이번 회차에는 어떤 스터디 일지를 작성할 지 입력해주세요."
        />
        <div className="flex gap-[10px] mt-[12px] mb-[12px]">
          <Button variant="default" onClick={onClose}>
            닫기
          </Button>
          <Button variant="primary" className="flex-1" onClick={onConfirm}>
            생성하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
