import { Badge } from './Badge';
import { Tag } from './Tag';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import StudyLeader from '@/assets/studyLeader.svg';
import StudyMember from '@/assets/studyMember.svg';
import Calendar from '@/assets/calendar.svg';
import People from '@/assets/people.svg';
import { Button } from './Button';

export interface MyStudy {
  id: number;
  title: string;
  role: '스터디원' | '스터디장';
  tags: string[];
  memberCount: number;
  studyDays: number;
  status?: '진행중' | '종료';
}

interface MyStudyCardProps {
  study: MyStudy;
  onCardClick?: () => void;
}

export function MyStudyCard({ study, onCardClick }: MyStudyCardProps) {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (isLoggedIn) {
      navigate('/study/my/1');
    } else {
      onCardClick?.();
    }
  };

  return (
    <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
      <div className="flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-5" onClick={handleCardClick}>
          <div>
            <Badge
              variant={study.role === '스터디원' ? 'yellow' : 'purple'}
              icon={study.role === '스터디원' ? StudyMember : StudyLeader}
            >
              {study.role}
            </Badge>
          </div>
          <h3 className="heading-3">{study.title}</h3>
          <div className="flex gap-1">
            {study.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
          <hr className="border-t-3 border-gray-100" />
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <img src={People} alt="People" className="px-[2px] w-5 h-5" />
              <span className="text-body-2-semibold text-gray-400">멤버 {study.memberCount}명</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={Calendar} alt="Calendar" className="px-[2px] w-5 h-5" />
              <span className="text-body-2-semibold text-gray-400">{study.studyDays}일째</span>
            </div>
          </div>
          <Button variant="solid">
            {study.status == '진행중' ? '스터디 보기' : '스터디 참여하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}
