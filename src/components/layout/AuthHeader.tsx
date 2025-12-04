import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import UserProfileSvg from '@/assets/icons/userProfile.svg';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';
import { DropdownList } from '../ui/DropdownList';

interface AuthHeaderProps {
  className?: string;
}
export function AuthHeader({ className }: AuthHeaderProps) {
  const { isLoggedIn } = useAuthStore();
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const navigate = useNavigate();

  const handleMenuSelect = (option: string) => {
    setIsProfileClicked(false);
    // Handle menu option selection
    if (option === '프로필 수정') {
      navigate('/my-page');
    } else if (option === '스탬프 관리') {
      navigate('/my-page/stamp');
    } else if (option === '내 스크랩 스터디') {
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 z-40 w-full h-[88px] flex items-center justify-between px-6 py-4 bg-white ${className}`}
    >
      <Logo />
      {isLoggedIn ? (
        <div className="flex items-center gap-3">
          <img
            src={UserProfileSvg}
            alt="User Profile"
            className="w-10 h-10"
            onClick={() => setIsProfileClicked(!isProfileClicked)}
          />
        </div>
      ) : (
        <Button asChild variant="secondary" size="sm">
          <Link to="/login">회원가입/로그인</Link>
        </Button>
      )}
      {isProfileClicked && (
        <div className="absolute left-270 w-[170px]">
          <DropdownList
            options={['프로필 수정', '스탬프 관리', '내 스크랩 스터디']}
            onSelect={handleMenuSelect}
          />
        </div>
      )}
    </header>
  );
}
