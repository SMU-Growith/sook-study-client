import LogoSvg from '@/assets/icons/Logo.svg';

type Props = {
  size?: 'sm' | 'lg';
  className?: string;
};

export function Logo({ size = 'sm', className }: Props) {
  const sizes = {
    sm: 'w-9 h-[38px]',
    lg: 'w-[88px] h-[92.888px]',
  };

  return <img src={LogoSvg} alt="sook-study logo" className={`${sizes[size]} ${className}`} />;
}
