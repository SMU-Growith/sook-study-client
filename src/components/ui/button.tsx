import { forwardRef, type ComponentProps, type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';

type ButtonVariant = 'primary' | 'secondary' | 'disabled' | 'default' | 'defaultGray' | 'solid';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'lg', asChild = false, children, disabled, ...props },
    ref
  ) => {
    const appliedVariant = disabled ? 'disabled' : variant;

    const baseClasses =
      'inline-flex justify-center items-center gap-2 flex-shrink-0 cursor-pointer';

    let colorClasses = '';
    if (appliedVariant === 'primary') {
      colorClasses = 'bg-primary-500 text-white hover:bg-primary-400';
    } else if (appliedVariant === 'secondary') {
      colorClasses = 'bg-primary-100 text-primary-500 hover:bg-primary-200';
    } else if (appliedVariant === 'disabled') {
      colorClasses = 'bg-gray-100 text-gray-200 pointer-events-none';
    } else if (appliedVariant === 'default') {
      colorClasses =
        'bg-white border-2 border-gray-200 text-gray-500 hover:bg-gray-100 focus:border-primary-500 focus:bg-primary-100';
    } else if (appliedVariant === 'defaultGray') {
      colorClasses =
        'bg-white text-gray-300 hover:bg-primary-100 focus:border-primary-500 focus:bg-primary-100';
    } else if (appliedVariant === 'solid') {
      colorClasses = 'bg-gray-100 text-gray-500 hover:bg-gray-200';
    }

    let sizeClasses = '';
    if (size === 'sm') {
      sizeClasses = 'h-[36px] px-3 text-caption-semibold rounded-lg';
    } else if (size === 'md') {
      sizeClasses = 'h-[44px] px-5 text-body-2-semibold rounded-[10px]';
    } else if (size === 'lg') {
      sizeClasses = 'h-[52px] px-7 text-body-1-semibold rounded-xl';
    }
    const finalClasses = `${baseClasses} ${colorClasses} ${sizeClasses} ${className || ''}`;
    console.log('Final Classes:', finalClasses);

    const Comp = 'button';

    return (
      <Comp className={finalClasses} ref={ref} disabled={disabled} {...props}>
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button };
