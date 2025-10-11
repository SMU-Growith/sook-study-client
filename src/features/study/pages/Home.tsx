import { AuthHeader } from '@/components/layout/AuthHeader';
import { LoginPromptModal } from '@/components/ui/LoginPromptModal';
import { SideBar } from '@/components/ui/SideBar';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import BannerSvg from '@/assets/banner.svg';
import { HomeStudy } from '@/components/ui/HomeStudy';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-white w-full">
      <AuthHeader />
      <SideBar />
      <main className="flex flex-col flex-1 ml-[160px] mt-[88px] px-20 py-10 gap-y-10 overflow-y-auto">
        <Link to="/personality-test" className="cursor-pointer">
          <img src={BannerSvg} alt="배너 이미지" className="w-full h-auto" />
        </Link>
        <div className="space-y-10">
          <HomeStudy type="popular" onCardClick={handleCardClick} />
          <HomeStudy type="latest" onCardClick={handleCardClick} />
        </div>
        <div className="flex justify-center mx-[20px]">
          <Button
            variant="default"
            className="w-1/3"
            onClick={() => {
              if (!isLoggedIn) {
                setIsModalOpen(true);
                return;
              }
              navigate('/study/detail/1');
            }}
          >
            다른 숙터디 둘러보기
          </Button>
        </div>
      </main>
      <LoginPromptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={() => navigate('/login')}
      />
    </div>
  );
}
