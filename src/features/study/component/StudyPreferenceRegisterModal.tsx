import { Modal } from "@/components/ui/Modal";
import { Button } from "../../../components/ui/button";

interface StudyPreferenceRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export function StudyPreferenceRegisterModal({
  isOpen,
  onClose,
  onConfirm,
}: StudyPreferenceRegisterModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[360px]">
      <div className="flex flex-col text-left relative pt-4">
        <h3 className="heading-3 mb-2">
          이 유형으로 <br />내 스터디 성향을 설정할까요?
        </h3>
        <p className="text-body-1 mb-1">
          테스트는 언제든 다시 할 수 있으니 걱정하지 마세요!
        </p>
        <div className="flex gap-[10px] mt-[12px] mb-[12px]">
          <Button
            variant="default"
            size="lg"
            className="flex-1"
            onClick={onClose}
          >
            닫기
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={onConfirm}
          >
            설정하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
