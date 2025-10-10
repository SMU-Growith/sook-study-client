import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex justify-center items-center gap-2 flex-shrink-0 h-8 px-2 rounded-md gap-1',
  {
    variants: {
      variant: {
        blue_: 'bg-primary-100 text-primary-500',
      },
      defaultVariants: {
        variant: 'blue_',
      },
    },
  }
);
