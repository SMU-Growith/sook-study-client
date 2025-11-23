import { AuthHeader } from '@/components/layout/AuthHeader';
import { SideBar } from '@/components/ui/SideBar';
import { useState } from 'react';
import { myStudiesData } from '../myStudyMatch';
import { MyStudyCard } from '@/components/ui/MyStudyCard';

export function MyStudyList() {
  const [studyStatus, setStudyStatus] = useState('진행중');

  const handleStudyStatus = (status: string) => {
    setStudyStatus(status);
  };

  return (
    <div className="flex h-screen bg-white w-full">
      <AuthHeader />
      <SideBar />
      <main className="flex flex-col flex-1 ml-[160px] mt-[88px] px-20 py-10 gap-y-10 overflow-y-auto">
        <div></div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex gap-2">
              {['진행중', '종료'].map((status) => (
                <button key={status} onClick={() => handleStudyStatus(status)}>
                  <h3 className={`heading-3 ${studyStatus === status ? '' : 'text-gray-200'}`}>
                    {status}
                  </h3>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-5">
              {myStudiesData.map((study) => (
                <MyStudyCard key={study.id} study={study} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
