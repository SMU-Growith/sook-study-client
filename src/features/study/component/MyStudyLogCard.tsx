import { useAuthStore } from '@/store/authStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import StudyLeader from '@/assets/studyLeader.svg';
import StudyMember from '@/assets/studyMember.svg';
import eyeSvg from '@/assets/eye.svg';
import { Button } from '@/components/ui/button';
import { StudyLogReadModal } from './StudyLogReadModal';
import { StudyLogCreateModal } from './StudyLogCreateModal';
import { myStudyLogListData } from '../studyLog';

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
  logId?: number;
  studyLog?: MyStudyLog;
  isEmpty?: boolean;
  sessionTitle?: string | null;
}

export function StudyLogCard({
  sessionId,
  logId,
  studyLog,
  isEmpty,
  sessionTitle,
}: MyStudyLogProps) {
  const auth = useAuthStore();
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [logs, setLogs] = useState(myStudyLogListData);

  const handleReadStudyLog = () => {
    setIsReadModalOpen(true);
  };

  const handleUpdateStudyLog = () => {
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="w-full border-2 border-gray-200 rounded-[20px] px-[18px] py-6 cursor-pointer">
      <div className="flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-5">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Badge
                variant={studyLog?.role === '스터디원' ? 'yellow' : 'purple'}
                icon={studyLog?.role === '스터디원' ? StudyMember : StudyLeader}
              >
                {studyLog?.role}
              </Badge>
              <span className="text-body-2-semibold text-gray-300">{studyLog?.writerNickname}</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={eyeSvg} alt="조회수 아이콘" />
              <span className="text-body-2-semibold text-gray-200">{studyLog?.viewCount}</span>
            </div>
          </div>
          <hr className="border-t-3 border-gray-100" />
          <div>
            <p className="text-body-1-semibold text-gray-300 mb-1">스터디 내용</p>
            <p className="text-body-1-semibold">{studyLog?.title}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="solid" size="sm" onClick={handleReadStudyLog} className="flex-1">
              상세보기
            </Button>
            <Button variant="secondary" size="sm" onClick={handleUpdateStudyLog}>
              수정하기
            </Button>
          </div>
        </div>
      </div>
      <StudyLogReadModal
        isOpen={isReadModalOpen}
        onClose={() => setIsReadModalOpen(false)}
        onConfirm={() => setIsReadModalOpen(false)}
        sessionId={Number(sessionId)}
        logData={studyLog}
      />
    </div>
  );
}
