import { forwardRef, type ComponentProps } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { twMerge } from 'tailwind-merge';
import { buttonVariants } from '@/components/ui/button.variants';

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const appliedVariant = disabled ? 'disabled' : variant;

    return (
      <Comp
        className={twMerge(
          buttonVariants({
            variant: appliedVariant,
            size,
            className,
          })
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
