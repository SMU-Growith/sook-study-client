import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import UserProfileSvg from '@/assets/icons/userProfile.svg';
import { useAuthStore } from '@/store/authStore';

export function AuthHeader() {
  const { isLoggedIn } = useAuthStore();
  return (
    <header className="fixed top-0 left-0 z-40 w-full h-[88px] flex items-center justify-between px-6 py-4">
      <Logo />
      {isLoggedIn ? (
        <div className="flex items-center gap-3">
          <img src={UserProfileSvg} alt="User Profile" className="w-10 h-10" />
        </div>
      ) : (
        <Button asChild variant="secondary" size="sm">
          <Link to="/login">회원가입/로그인</Link>
        </Button>
      )}
    </header>
  );
}
