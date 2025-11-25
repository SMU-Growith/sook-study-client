import { AuthHeader } from '@/components/layout/AuthHeader';
import { Button } from '@/components/ui/Button';
import PlusSvg from '@/assets/icons/plus.svg';
import { StudyLogCreateModal } from '../component/StudyLogCreateModal';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useParams, useSearchParams } from 'react-router-dom';
import { StudyLogCard } from '@/features/study/component/MyStudyLogCard';
import { myStudyLogListData } from '../studyLog';

export function MyStudyLog() {
  const auth = useAuthStore();
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const { sessionId } = useParams<{ studyId: string; sessionId: string }>();
  const sessionTitle = searchParams.get('sessionTitle');

  const handleCreateStudyLog = () => {
    const newLog = {
      id: myStudyLogListData.length + 1,
      title: '오늘의 회고',
      role: '스터디원',
      writerNickname: '피그마송',
      viewCount: 0,
      content: '집중이 잘 안 되었던 이유와 내일 개선하고 싶은 점을 적었습니다.',
      link: undefined,
      attachments: [],
      likeCount: 0,
      heartCount: 0,
      laughCount: 0,
      surpriseCount: 0,
      questionCount: 0,
    };

    myStudyLogListData.push(newLog);
    setIsWriteModalOpen(false);
    auth.setHasWrittenLog(true);
  };

  return (
    <div className="flex h-screen bg-white w-full">
      <AuthHeader />
      <main className="flex w-full mt-[88px]">
        <div className="flex flex-1 flex-col px-10 py-10 gap-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-300 text-body-2-semibold">{sessionId}회차</p>
              <h2 className="heading-2">{sessionTitle}</h2>
            </div>
            {auth.isLeader && (
              <div className="flex gap-2">
                <Button
                  variant={auth.hasWrittenLog ? 'disabled' : 'primary'}
                  size="lg"
                  onClick={() => setIsWriteModalOpen(true)}
                >
                  <img src={PlusSvg} alt="플러스 아이콘" />
                  일지 작성하기
                </Button>
              </div>
            )}
          </div>
          <p className="text-subtitle-1">
            총 <span className="text-primary-500">5개</span>
          </p>
          <div className="grid grid-cols-2 gap-5">
            {auth.hasWrittenLog ? null : (
              <StudyLogCard sessionId={sessionId} isEmpty={true} sessionTitle={sessionTitle} />
            )}
            {myStudyLogListData
              .slice()
              .reverse()
              .map((studyLog) => (
                <StudyLogCard
                  sessionId={sessionId}
                  logId={studyLog.id}
                  studyLog={studyLog}
                  isEmpty={false}
                />
              ))}
          </div>
        </div>
      </main>
      <StudyLogCreateModal
        isOpen={isWriteModalOpen}
        onClose={() => {
          setIsWriteModalOpen(false);
        }}
        onConfirm={handleCreateStudyLog}
        nextSessionId={Number(sessionId)}
        sessionTitle={sessionTitle || '스터디 한 것들 정리'}
      />
    </div>
  );
}
