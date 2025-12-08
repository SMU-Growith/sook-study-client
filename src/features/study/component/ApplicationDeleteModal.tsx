import { Modal } from "@/components/ui/Modal";
import { Button } from "../../../components/ui/button";
import CloseSvg from "@/assets/icons/close.svg";

interface ApplicationDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export function ApplicationDeleteModal({
  isOpen,
  onClose,
  onConfirm,
}: ApplicationDeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col text-left relative pt-4">
        <h3 className="heading-3 mb-2">스터디 지원을 취소할까요?</h3>
        <p className="text-body-1 mb-1">
          지원 취소를 하면 작성한 지원 내역을 다시 복구할 수 없어요.
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
            variant="deleted"
            size="lg"
            className="flex-1"
            onClick={onConfirm}
          >
            취소하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
