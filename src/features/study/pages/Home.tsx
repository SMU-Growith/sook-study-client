import { AuthHeader } from '@/components/layout/AuthHeader';
import { LoginPromptModal } from '@/components/ui/LoginPromptModal';
import { SideBar } from '@/components/ui/SideBar';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import BannerSvg from '@/assets/banner.svg';
import { HomeStudy } from '@/components/ui/HomeStudy';
import { Button } from '@/components/ui/button';

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-white w-full">
      <AuthHeader />
      {/* 스터디 카드를 클릭했을 때 모달 열기*/}
      {/* onLogin 눌렀을 때 LoginPage로 이동 */}
      {/* <LoginPromptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={() => navigate('/login')}
      /> */}
      <SideBar />
      <main className="flex flex-col flex-1 ml-[160px] mt-[88px] px-20 py-10 gap-y-10 overflow-y-auto">
        <Link to="/personality-test" className="cursor-pointer">
          <img src={BannerSvg} alt="배너 이미지" className="w-full h-auto" />
        </Link>
        <div className="space-y-10">
          <HomeStudy type="popular" />
          <HomeStudy type="latest" />
        </div>
        <div className="flex justify-center mx-[20px]">
          <Button variant="default" className="w-1/3">
            다른 숙터디 둘러보기
          </Button>
        </div>
      </main>
    </div>
  );
}
