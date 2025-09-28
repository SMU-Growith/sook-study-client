import { cva } from 'class-variance-authority';

export const buttonVariants = cva('inline-flex justify-center items-center gap-2 flex-shrink-0', {
  variants: {
    variant: {
      primary: 'bg-primary-500 text-white hover:bg-primary-400',
      secondary: 'bg-primary-100 text-primary-500 hover:bg-primary-200',
      disabled: 'bg-gray-100 text-gray-200 pointer-events-none',
      default:
        'bg-white border-2 border-gray-200 text-gray-500 hover:bg-gray-100 focus:border-primary-500 focus:bg-primary-100',
      solid: 'bg-gray-100 text-gray-500 hover:bg-gray-200',
    },
    size: {
      sm: 'h-[36px] px-3 text-caption-semibold rounded-lg',
      md: 'h-[44px] px-5 text-body-2-semibold rounded-[10px]',
      lg: 'h-[52px] px-7 text-body-1-semibold rounded-xl',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
