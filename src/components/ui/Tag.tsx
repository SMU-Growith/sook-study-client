import CloseSvg from '@/assets/icons/close.svg';

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  deleteable?: boolean;
  onDelete?: () => void;
  children?: React.ReactNode;
}

export function Tag({ children, deleteable, onDelete }: TagProps) {
  return (
    <div className="flex gap-1 w-fit px-3 py-1 bg-gray-50 rounded-[18px]">
      <span className="text-caption-semibold text-gray-500">{children}</span>
      {deleteable && (
        <button onClick={onDelete}>
          <img src={CloseSvg} alt="삭제" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
