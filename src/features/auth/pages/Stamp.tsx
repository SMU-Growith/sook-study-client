import { AuthHeader } from '@/components/layout/AuthHeader';
import UserProfileSvg from '@/assets/icons/userProfile.svg';
import BadgeWelcomOn from '@/assets/badges/badgeWelcomeOn.svg';

import BadgeLeaderOn from '@/assets/badges/badgeLeaderOn.svg';
import BadgeWriteOn from '@/assets/badges/badgeWriteOn.svg';
import BadgeCheerOn from '@/assets/badges/badgeCheerOn.svg';
import BadgeSuperOn from '@/assets/badges/badgeSuperOn.svg';
import { useState } from 'react';
import { StudyDetailModal } from '../components/StudyDetailModal';

export function Stamp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const openModal = (badgeType: string) => {
    setSelectedBadge(badgeType);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <AuthHeader />
      <main className="flex flex-col mt-[88px] overflow-y-auto w-[700px]">
        <div className="w-full h-[90px] bg-gray-100 rounded-[10px] mb-6">
          <div className="flex items-center h-full gap-5">
            <img src={UserProfileSvg} alt="User Profile" className="ml-5 w-10 h-10" />
            <div className="flex flex-col">
              <p className="text-body-1-semibold">김눈송</p>
              <p className="text-body-1">
                스터디 스탬프 <span className="text-primary-500 text-body-1-semibold">4개 </span> |
                완료한 스탬프 <span className="text-primary-500 text-body-1-semibold">6개 </span>
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 mb-10">
          <img src={BadgeWelcomOn} alt="환영 스탬프" onClick={() => openModal('welcome')} />
          <img src={BadgeLeaderOn} alt="리더 스탬프" onClick={() => openModal('leader')} />
          <img src={BadgeWriteOn} alt="일지 작성 스탬프" onClick={() => openModal('write')} />
          <img src={BadgeCheerOn} alt="응원 스탬프" onClick={() => openModal('cheer')} />
          <img src={BadgeSuperOn} alt="슈퍼 송이 스탬프" onClick={() => openModal('super')} />
        </div>
      </main>
      <StudyDetailModal
        isOpen={isModalOpen}
        badgeType={selectedBadge}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {}}
      />
    </div>
  );
}
