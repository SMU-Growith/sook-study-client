import { AuthHeader } from '@/components/layout/AuthHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/Form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { studyCreateSchema, type TStudySchema } from '../validators/study';
import { FormField } from '@/components/ui/FormField';
import { useMutation, useQuery } from '@tanstack/react-query';
import { studyUpdateApi, fetchStudyById } from '@/lib/api';
import type { AxiosError } from 'axios';
import StateOnSvg from '@/assets/icons/stateOn.svg';
import StateOffSvg from '@/assets/icons/stateOff.svg';
import { SideBar } from '@/components/ui/SideBar';
import UserProfileSvg from '@/assets/icons/userProfile.svg';
import LinkSvg from '@/assets/link.svg';

// 스터디 분야, 스터디 성향, 진행 방식, 연락 방식 드롭다운 옵션
const STUDY_FIELD_OPTIONS = ['학업', '언어', '취업/커리어', '자기계발'] as const;
const SUBFIELD_MAP: Record<(typeof STUDY_FIELD_OPTIONS)[number], string[]> = {
  학업: ['전공 공부', '시험 공부', '자격증', '고시·임용·공무원'],
  언어: ['회화', '외국어 시험'],
  '취업/커리어': ['면접·자소서', '디자인', 'IT', '마케팅', '코딩', '데이터 분석'],
  자기계발: ['독서·글쓰기', '운동', '사진·영상'],
};

const STUDY_TYPE_OPTIONS = ['체계적인', '자유로운', '협력적인', '실적중심'];
const PROGRESS_METHOD_OPTIONS = ['온라인', '오프라인', '온라인/오프라인'];
const CONTACT_METHOD_OPTIONS = ['카카오톡', '이메일'];
const RULE_TAG_OPTIONS = [
  { label: '시간', key: 'time' },
  { label: '벌금', key: 'penalty' },
  { label: '휴무', key: 'absence' },
  { label: '분위기', key: 'mood' },
  { label: '기타', key: 'etc' },
];

// [ld] 임시 데이터 (필드명 변경해야 함)
const studyData: TStudySchema & { isRecruiting: boolean; createdAt: string; author: string } = {
  studyField: '언어 - 회화',
  studyType: '자유로운',
  progressMethod: '온라인',
  contactMethod: '카카오톡',
  contactInfo: 'kakao_id_123',
  name: '함께 영어 회화 스터디해요!',
  createdAt: '2025-10-14',
  author: '민서송이',
  introduction: '영어 회화 실력을 늘리고 싶은 분들 모여요!',
  rules: {
    time: '매주 토요일 오후 3시 ~ 5시',
    absence: '월 1회까지 휴무 가능',
    mood: '편안하고 자유로운 분위기',
  },
  isRecruiting: true,
};

export function StudyRead() {
  const navigate = useNavigate();
  const { studyId } = useParams();
  const [activeRuleTags, setActiveRuleTags] = useState<string[]>([]);
  const [isRecruiting, setIsRecruiting] = useState<boolean | null>(null);

  // const { data: studyData } = useQuery({
  //   queryKey: ['study', studyId],
  //   queryFn: () => fetchStudyById(Number(studyId)),
  //   enabled: !!studyId,
  // });

  useEffect(() => {
    if (studyData) {
      if (studyData.rules) {
        setActiveRuleTags(Object.keys(studyData.rules));
      }
      setIsRecruiting(studyData.isRecruiting);
    }
  }, [studyData]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <AuthHeader />
      <SideBar />
      <main className="flex ml-[160px] mt-[88px] px-20 py-10 gap-y-10 overflow-y-auto ">
        <div className="flex w-full gap-10">
          <div className="flex flex-col gap-15 flex-1">
            {/* 스터디 이름 */}
            <div className="flex flex-col">
              <h1 className="heading-1 mb-3">{studyData.name}</h1>
              <div className="flex items-center gap-3 mb-10">
                <div className="flex gap-1">
                  <img src={UserProfileSvg} alt="User Profile" />
                  <span className="text-body-2-semibold text-gray-400">{studyData.author}</span>
                </div>
                <div className="h-7 w-[2px] bg-gray-100" />
                <span className="text-body-2-semibold text-gray-400">{studyData.createdAt}</span>
              </div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 bg-gray-50 rounded-[16px] px-9 py-6">
                <div className="flex items-center">
                  <p className="w-22 text-body-1-semibold text-gray-300">스터디 분야</p>
                  <p className="text-body-1 text-black">{studyData.studyField}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-22 text-body-1-semibold text-gray-300">스터디 성향</p>
                  <p className="text-body-1 text-black">{studyData.studyType}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-22 text-body-1-semibold text-gray-300">진행 방식</p>
                  <p className="text-body-1 text-black">{studyData.progressMethod}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-22 text-body-1-semibold text-gray-300">연락 방식</p>
                  <div className="flex items-center gap-1">
                    <img src={LinkSvg} alt="Link" />
                    <p className="text-body-1 text-black">
                      <a href={`${studyData.contactInfo}`} target="_blank">
                        {studyData.contactMethod}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 스터디 소개 */}
            <div className="flex flex-col">
              <h1 className="heading-2 text-gray-500 mb-5">우리 스터디를 소개할게요 !</h1>
              <div className="bg-gray-50 rounded-[16px] px-9 py-6">{studyData.introduction}</div>
            </div>
            {/* 스터디 규칙 */}
            <div className="flex flex-col">
              <h1 className="heading-2 text-gray-500 mb-5">이렇게 운영될 예정이에요</h1>
              <div className="bg-gray-50 rounded-[16px] px-9 py-6">
                <div className="flex flex-col gap-5">
                  {studyData.rules &&
                    Object.entries(studyData.rules).map(([key, value]) => {
                      const ruleInfo = RULE_TAG_OPTIONS.find((rule) => rule.key === key);
                      if (!ruleInfo) return null;
                      return (
                        <div key={key} className="flex flex-col gap-1">
                          <p className="text-body-1-semibold text-gray-300">{ruleInfo.label}</p>
                          <p className="text-body-1 text-black">{value}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-60">
            <Button onClick={() => {}}>지원하기</Button>
            <Button variant="default" onClick={() => {}}>
              관심 스터디
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
