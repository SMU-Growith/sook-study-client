import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

export function AuthHeader() {
  return (
    <header className="absolute top-0 left-0 w-full h-[88px] flex items-center justify-between px-6 py-4">
      <Logo />
      <Button asChild variant="secondary" size="sm">
        <Link to="/login">회원가입/로그인</Link>
      </Button>
    </header>
  );
}
