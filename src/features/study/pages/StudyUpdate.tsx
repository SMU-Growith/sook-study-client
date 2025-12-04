import { AuthHeader } from '@/components/layout/AuthHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/Form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { studyCreateSchema, type TStudySchema } from '../validators/study';
import { FormField } from '@/components/ui/FormField';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { studyUpdateApi, fetchStudyById } from '@/lib/api';
// import type { AxiosError } from 'axios';
import StateOnSvg from '@/assets/icons/stateOn.svg';
import StateOffSvg from '@/assets/icons/stateOff.svg';

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
const studyData: TStudySchema & { isRecruiting: boolean } = {
  studyField: '언어 - 회화',
  studyType: '자유로운',
  progressMethod: '온라인',
  contactMethod: '카카오톡',
  contactInfo: 'kakao_id_123',
  name: '함께 영어 회화 스터디해요!',
  introduction: '영어 회화 실력을 늘리고 싶은 분들 모여요!',
  rules: {
    time: '매주 토요일 오후 3시 ~ 5시',
    absence: '월 1회까지 휴무 가능',
    mood: '편안하고 자유로운 분위기',
  },
  isRecruiting: true,
};

export function StudyUpdate() {
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

  // const { mutate: updateStudy } = useMutation({
  //   mutationFn: ({
  //     id,
  //     isRecruiting,
  //     data,
  //   }: {
  //     id: number;
  //     isRecruiting: boolean;
  //     data: TStudySchema;
  //   }) => studyUpdateApi(id, { ...data, isRecruiting }),
  //   onSuccess: (res) => {
  //     alert('스터디가 수정되었습니다.');
  //     console.log(res);
  //     navigate(`/study/detail/${studyId}`);
  //   },
  //   onError: (error: AxiosError<{ message: string }>) => {
  //     alert(error.response?.data?.message || '스터디 수정에 실패했습니다.');
  //   },
  // });

  const onSubmit = (data: TStudySchema) => {
    if (!studyId) return;
    console.log('Updated Study Form Data:', data);
    console.log('isRecruiting:', isRecruiting);
    // updateStudy({ id: Number(studyId), isRecruiting, data });
    navigate(`/study/detail/${studyId}`);
  };

  const toggleRecruiting = () => {
    setIsRecruiting((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <AuthHeader />
      <main className="w-full max-w-[800px] px-4 py-10 mt-[88px]">
        <Form
          schema={studyCreateSchema}
          onSubmit={onSubmit}
          defaultValues={studyData}
          className="space-y-5"
        >
          <div className="flex gap-2 justify-end items-center mb-5">
            <span className="text-body-1-semibold text-gray-400">
              {isRecruiting ? '모집중' : '모집마감'}
            </span>
            <button type="button" onClick={toggleRecruiting} aria-label="모집중/모집마감">
              <img src={isRecruiting ? StateOnSvg : StateOffSvg} alt="" className="w-12 h-12" />
            </button>
          </div>

          <div className="w-full flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Badge variant="blue">1</Badge>
              <h1 className="text-body-1-semibold text-gray-400">
                스터디 기본 정보를 입력해주세요.
              </h1>
            </div>
          </div>
          <FormField
            name="studyField"
            label="스터디 분야"
            placeholder="선택해주세요."
            type="dropdownTwoLevel"
            options={SUBFIELD_MAP}
          />
          <FormField
            name="studyType"
            label="스터디 성향"
            placeholder="선택해주세요."
            type="dropdown"
            options={STUDY_TYPE_OPTIONS}
          />
          <FormField
            name="progressMethod"
            label="진행 방식"
            placeholder="선택해주세요."
            type="dropdown"
            options={PROGRESS_METHOD_OPTIONS}
          />
          <div className="flex items-end gap-6">
            <div className="w-1/2">
              <FormField
                name="contactMethod"
                label="연락 방식"
                placeholder="선택해주세요."
                type="dropdown"
                options={CONTACT_METHOD_OPTIONS}
              />
            </div>
            <div className="w-1/2">
              <FormField name="contactInfo" placeholder="연락 정보를 입력해주세요." />
            </div>
          </div>
          <div className="w-full flex justify-between items-center mt-20 mb-6">
            <div className="flex items-center gap-2">
              <Badge variant="blue">2</Badge>
              <h1 className="text-body-1-semibold text-gray-400">스터디에 대해 소개해주세요.</h1>
            </div>
          </div>
          <FormField name="name" label="스터디 이름" placeholder="스터디 이름을 입력해주세요." />
          <FormField
            name="introduction"
            label="스터디 소개"
            placeholder="스터디를 자유롭게 소개해주세요."
            type="textarea"
          />

          <div className="w-full flex justify-between items-center mt-20 mb-6">
            <div className="flex items-center gap-2">
              <Badge variant="blue">3</Badge>
              <h1 className="text-body-1-semibold text-gray-400">스터디 규칙을 정해주세요.</h1>
            </div>
          </div>
          <div className="flex gap-2 mb-5">
            {RULE_TAG_OPTIONS.map((rule) => (
              <Button
                key={rule.key}
                variant={activeRuleTags.includes(rule.key) ? 'focus' : 'default'}
                size="sm"
                type="button"
                onClick={() => {
                  setActiveRuleTags((prev) =>
                    prev.includes(rule.key)
                      ? prev.filter((id) => id !== rule.key)
                      : [...prev, rule.key]
                  );
                }}
              >
                {rule.label}
              </Button>
            ))}
          </div>
          {activeRuleTags.map((key) => {
            const rule = RULE_TAG_OPTIONS.find((rule) => rule.key === key);
            if (!rule) return null;

            return (
              <FormField
                key={rule.key}
                name={`rules.${key}`}
                label={`[${rule.label}] 규칙`}
                placeholder={`${rule.label}에 대한 규칙을 입력해주세요.`}
                type="textarea"
              />
            );
          })}

          <div className="flex w-full justify-end gap-2 mt-20">
            <Button type="button" variant="default" size="lg" onClick={() => navigate(-1)}>
              취소
            </Button>
            <Button type="submit" variant="primary" size="lg">
              수정하기
            </Button>
          </div>
        </Form>
      </main>
    </div>
  );
}
