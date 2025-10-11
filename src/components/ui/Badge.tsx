type BadgeVariant = 'purple' | 'blue' | 'black';
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  children?: React.ReactNode;
}

export function Badge({ variant = 'blue', children, ...props }: BadgeProps) {
  const baseClasses = `inline-flex justify-center items-center gap-2 flex-shrink-0 h-8 px-2 rounded-md gap-1`;

  let colorClasses = '';
  if (variant === 'purple') {
    colorClasses = 'bg-[#F0E4FF] text-[#9747FF] text-body-2-semibold';
  } else if (variant === 'blue') {
    colorClasses = 'bg-primary-100 text-primary-500 text-body-2-semibold';
  } else if (variant === 'black') {
    colorClasses = 'bg-gray-400 text-white text-body-2-semibold';
  }
  const finalClasses = `${baseClasses} ${colorClasses} ${props.className || ''}`;

  return (
    <div className={finalClasses} {...props}>
      {children}
    </div>
  );
}
