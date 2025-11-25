import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import BurgerIconSvg from '@/assets/burgerIcon.svg';
import People from '@/assets/people.svg';
import { useState } from 'react';
import { DropdownList } from './DropdownList';
import { set } from 'zod';
import { StudyLogUpdateModal } from '@/features/study/component/StudyLogUpdateModal';

export type MyStudySessionList = {
  id: number;
  title: string;
  submittedMembers: number;
  status: string;
};

interface MyStudyLogCardProps {
  id: number;
  isLeader: boolean;
  studyLog: MyStudySessionList;
}

export function StudySessionCard({ id, isLeader, studyLog }: MyStudyLogCardProps) {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  // 버거 아이콘 클릭되었는지 상태 관리
  const [isBurgerIconClicked, setIsBurgerIconClicked] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleCardClick = () => {
    navigate(`/study/log/${studyLog.id}`);
  };

  const handleBurgerIconSelect = (option: string) => {
    console.log(`선택된 옵션: ${option}`);
    if (option == '수정하기') {
      setIsUpdateModalOpen(true);
    }
    setIsBurgerIconClicked(false);
    // 여기에 각 옵션에 대한 실제 동작을 구현하세요.
  };

  const handleUpdateStudyLog = () => {
    studyLog.title = `수정된 ${studyLog.title}`;
    setIsUpdateModalOpen(false);
  };
  return (
    <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
      <div className="flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-5">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <p className="text-gray-300 text-body-1-semibold">{studyLog.id}회차</p>
              <h3 className="heading-3">{studyLog.title}</h3>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsBurgerIconClicked(!isBurgerIconClicked)}
                className="relative"
              >
                <img src={BurgerIconSvg} alt="버거 아이콘" className="w-6 h-6" />
              </button>
              {isBurgerIconClicked && (
                <div className="absolute top-full left-[-90px] mt-1 w-[200px]">
                  <DropdownList
                    options={['상태변경', '수정하기', '삭제하기']}
                    onSelect={handleBurgerIconSelect}
                  />
                </div>
              )}
            </div>
          </div>
          <hr className="border-t-3 border-gray-100" />
          <div className="flex items-center gap-1">
            <img src={People} alt="People" className="px-[2px] w-5 h-5" />
            <span className="text-body-2-semibold text-gray-400">
              제출 멤버 {studyLog.submittedMembers}명
            </span>
          </div>
          <Button variant="solid" onClick={handleCardClick}>
            스터디 일지 보기
          </Button>
        </div>
      </div>
      <StudyLogUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleUpdateStudyLog}
        currSessionId={studyLog.id}
        currTitle={studyLog.title}
      />
    </div>
  );
}
