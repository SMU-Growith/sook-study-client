import { useAuthStore } from '@/store/authStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import StudyLeader from '@/assets/studyLeader.svg';
import StudyMember from '@/assets/studyMember.svg';

export type MyStudyLog = {
  id: number;
  title: string;
  role: string;
  writerNickname: string;
  viewCount: number;
  content: string;
  link?: string;
  attachments: {
    id: number;
    name: string;
    type: 'pdf' | 'png';
    url: string;
  }[];
  likeCount: number;
  heartCount: number;
  laughCount: number;
  surpriseCount: number;
  questionCount: number;
};

interface MyStudyLogProps {
  sessionId: string | undefined;
  logId: number;
  studyLog: MyStudyLog;
}

export function StudyLogCard({ sessionId, logId, studyLog }: MyStudyLogProps) {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  // 버거 아이콘 클릭되었는지 상태 관리
  const [isBurgerIconClicked, setIsBurgerIconClicked] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleReadStudyLog = (option: string) => {
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
          <div>
            <Badge
              variant={studyLog.role === '스터디원' ? 'yellow' : 'purple'}
              icon={studyLog.role === '스터디원' ? StudyMember : StudyLeader}
            >
              {studyLog.role}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
