import { type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { badgeVariants } from '@/components/ui/badge.variants';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={twMerge(badgeVariants({ variant, className }))} {...props} />;
}
