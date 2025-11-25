import { AuthHeader } from '@/components/layout/AuthHeader';
import { Button } from '@/components/ui/button';
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
  const [logs, setLogs] = useState(myStudyLogListData);

  const handleCreateStudyLog = () => {
    const newLog = {
      id: 5,
      title: 'React 컴포넌트 구조 리팩터링으로 성능 높이기',
      role: '스터디장',
      writerNickname: '김눈송',
      viewCount: 0,
      content:
        '컴포넌트가 비효율적으로 분리된 구조를 개선하고, props drilling을 최소화하는 방향으로 리팩터링했습니다. Context API와 Zustand를 비교하며 가장 적합한 구조를 선택하는 연습을 했습니다.',
      link: 'https://react.dev/learn/thinking-in-react',
      attachments: [
        {
          id: 1,
          name: 'commit1.png, commit2.png, commit3.png',
          type: 'png' as const,
          url: '/mock/files/component_refactoring_before_after.site',
        },
      ],
      likeCount: 4,
      heartCount: 6,
      laughCount: 1,
      surpriseCount: 1,
      questionCount: 2,
    };
    setLogs((prevLogs) => [...prevLogs, newLog]);
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
            총 <span className="text-primary-500">{logs.length}개</span>
          </p>
          <div className="grid grid-cols-2 gap-5">
            {auth.hasWrittenLog ? null : (
              <div className="w-full border-2 border-dashed border-gray-200 rounded-[20px] px-[18px] py-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-5">
                  <p className="text-body-1-semibold text-gray-300">
                    아직 스터디 일지 작성을 안하셨네요!
                  </p>
                  <Button variant="solid" size="lg" onClick={() => setIsWriteModalOpen(true)}>
                    스터디 일지 작성하기
                  </Button>
                </div>
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
            )}
            {logs
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
