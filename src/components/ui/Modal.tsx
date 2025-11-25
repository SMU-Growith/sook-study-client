import type { ReactNode } from 'react';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children?: ReactNode;
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bk/50" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full max-w-[330px] p-5 rounded-[20px] ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
