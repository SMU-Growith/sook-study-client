import { forwardRef, type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends ComponentProps<'input'> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      className={twMerge(
        'flex h-[44px] w-full rounded-[10px] border-2 border-gray-200 bg-white px-5 text-body-2-semibold placeholder:text-gray-200 focus:border-primary-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
