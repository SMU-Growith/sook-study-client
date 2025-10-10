import { AuthHeader } from '@/components/layout/AuthHeader';
import { LoginPromptModal } from '@/components/ui/LoginPromptModal';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white p-4">
      <AuthHeader />
      {/* 스터디 카드를 클릭했을 때 모달 열기*/}
      {/* onLogin 눌렀을 때 LoginPage로 이동 */}
      <LoginPromptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={() => navigate('/login')}
      />
    </div>
  );
}
