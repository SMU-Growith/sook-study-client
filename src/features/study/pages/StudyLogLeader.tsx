import { AuthHeader } from '@/components/layout/AuthHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import SettingsSvg from '@/assets/settings.svg';
import StudyLeader from '@/assets/studyLeader.svg';
import StudyMember from '@/assets/studyMember.svg';
import UserProfileSvg from '@/assets/icons/userProfile.svg';
import BlueCircleSvg from '@/assets/blueCircle.svg';
import { myStudySessionListData } from '../studySession';
import { StudySessionCard } from '@/components/ui/StudySessionCard';
import PlusSvg from '@/assets/icons/plus.svg';
import { StudyLogCreateModal } from '../component/StudyLogCreateModal';
import { useState } from 'react';

export function MyStudy() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateStudyLog = () => {
    const newSession = {
      id: myStudySessionListData.length + 1,
      title: `스터디 ${myStudySessionListData.length + 1}`,
      submittedMembers: 0,
      status: '진행중',
    };

    myStudySessionListData.push(newSession);
    setIsModalOpen(false);
    // 스터디 일지 하나 추가하기
  };

  return (
    <div className="flex h-screen bg-white w-full">
      <AuthHeader />
      <main className="flex w-full mt-[88px]">
        <div className="flex flex-col px-[18px] py-6 gap-5 w-[336px]">
          <h2 className="heading-2">스터디 이름</h2>
          <Button variant="default" size="md">
            모집글 수정하기
          </Button>
          <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
            <div className="flex flex-col gap-y-[12px]">
              <div className="flex justify-between items-center">
                <p className="text-body-1-semibold">스터디멤버</p>
                <img src={SettingsSvg} alt="설정 아이콘" />
              </div>
              <hr className="border-t-3 border-gray-100" />
              <div className="flex gap-3">
                <Badge variant="purple" icon={StudyLeader}>
                  스터디장
                </Badge>
                <div className="flex items-center">
                  <img src={UserProfileSvg} alt="User Profile" />
                  <span className="text-body-2-semibold text-gray-400 ml-1">리더송이</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Badge variant="yellow" icon={StudyMember}>
                  스터디원
                </Badge>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    '정민송이',
                    '눈꽃송이',
                    '행복송이',
                    '하하송이',
                    '송송파',
                    '기쁨송',
                    '코딩송',
                    '화학송',
                    '디자인송',
                  ].map((studyMember) => (
                    <div className="flex items-center">
                      <img src={UserProfileSvg} alt="User Profile" />
                      <span className="text-body-2-semibold text-gray-400 ml-1">{studyMember}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
            <div className="flex flex-col gap-y-[12px]">
              <div className="flex justify-between items-center">
                <p className="text-body-1-semibold">스터디 규칙</p>
                <img src={SettingsSvg} alt="설정 아이콘" />
              </div>
              <hr className="border-t-3 border-gray-100" />
              <div className="flex flex-col gap-1">
                <p className="text-body-1-semibold text-gray-300">시간</p>
                <p className="text-body-1 text-black">아침 7시 입실</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-body-1-semibold text-gray-300">벌금</p>
                <p className="text-body-1 text-black">
                  지각당 1000원 <br />
                  무단 결석 5000원
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-body-1-semibold text-gray-300">휴무</p>
                <p className="text-body-1 text-black">아침 7시 입실</p>
              </div>
            </div>
          </div>

          <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
            <div className="flex flex-col gap-y-[12px]">
              <div className="flex justify-between items-center">
                <p className="text-body-1-semibold">지원내역</p>
                <div className="flex gap-1 items-start">
                  <p className="text-[#277AFF] text-caption-semibold cursor-pointer">새로운 지원</p>
                  <img src={BlueCircleSvg} alt="블루 동그라미 아이콘" />
                </div>
              </div>
              <hr className="border-t-3 border-gray-100" />
              <div className="flex flex-col gap-3">
                {['지송이', '지원송이', '원송이'].map((applierName) => (
                  <div className="flex items-center">
                    <img src={UserProfileSvg} alt="User Profile" />
                    <span className="text-body-2-semibold text-gray-400 ml-1">{applierName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button variant="default" size="md">
            스터디 나가기
          </Button>
          <Button variant="deleted" size="md">
            스터디 종료하기
          </Button>
        </div>
        <div className="flex flex-1 flex-col px-10 py-10 gap-5">
          <div className="flex justify-between items-center">
            <h2 className="heading-2">스터디 일지</h2>
            <div className="flex gap-2">
              <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}>
                <img src={PlusSvg} alt="플러스 아이콘" />
                일지 생성하기
              </Button>
            </div>
          </div>
          <p className="text-subtitle-1">
            총 <span className="text-primary-500">5개</span>
          </p>
          <div className="grid grid-cols-2 gap-5">
            {myStudySessionListData
              .slice()
              .reverse()
              .map((study) => (
                <StudySessionCard key={study.id} isLeader={true} studyLog={study} />
              ))}
          </div>
        </div>
      </main>
      <StudyLogCreateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onConfirm={handleCreateStudyLog}
        nextSessionId={myStudySessionListData.length + 1}
      />
    </div>
  );
}
