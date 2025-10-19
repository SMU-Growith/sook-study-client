import { forwardRef, type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TextAreaProps extends ComponentProps<'textarea'> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, rows, ...props }, ref) => {
    return (
      <textarea
        className={twMerge(
          'flex w-full pt-4 rounded-[10px] border-2 border-gray-200 bg-white px-5 text-body-2-semibold placeholder:text-gray-200 focus:border-primary-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none',
          className
        )}
        ref={ref}
        rows={rows}
        {...props}
      />
    );
  }
);
TextArea.displayName = 'TextArea';

export { TextArea };
