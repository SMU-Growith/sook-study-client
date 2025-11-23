import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import BurgerIconSvg from '@/assets/burgerIcon.svg';
import People from '@/assets/people.svg';

export type MyStudySessionList = {
  id: number;
  submittedMembers: number;
};

interface MyStudyLogCardProps {
  isLeader: boolean;
  studyLog: MyStudySessionList;
  onCardClick?: () => void;
}

export function StudySessionCard({ isLeader, studyLog, onCardClick }: MyStudyLogCardProps) {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/study/log/1');
  };

  return (
    <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
      <div className="flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-5" onClick={handleCardClick}>
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <p className="text-gray-300 text-body-1-semibold">{studyLog.id}회차</p>
              <h3 className="heading-3">학습한 것 올리기</h3>
            </div>
            <img src={BurgerIconSvg} alt="버거 아이콘" className="w-6 h-6" />
          </div>
          <hr className="border-t-3 border-gray-100" />
          <div className="flex items-center gap-1">
            <img src={People} alt="People" className="px-[2px] w-5 h-5" />
            <span className="text-body-2-semibold text-gray-400">
              제출 멤버 {studyLog.submittedMembers}명
            </span>
          </div>
          <div className="flex w-full gap-2">
            <Button variant="solid" onClick={handleCardClick} className="flex-1">
              스터디 일지 보기
            </Button>
            {isLeader && (
              <Button variant="secondary" className="flex-1">
                스터디 일지 작성하기
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
