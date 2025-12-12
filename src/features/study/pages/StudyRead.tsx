import { AuthHeader } from "@/components/layout/AuthHeader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/Form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  type TStudySchema,
  studyApplySchema,
  type TStudyApplySchema,
} from "../validators/study";
import { FormField } from "@/components/ui/FormField";
import { SideBar } from "@/components/ui/SideBar";
import UserProfileSvg from "@/assets/icons/userProfile.svg";
import LinkSvg from "@/assets/link.svg";
import { Modal } from "@/components/ui/Modal";
import { majorOptions, studentStatusOptions } from "@/constants";
import { useFormContext } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";

// 스터디 분야, 스터디 성향, 진행 방식, 연락 방식 드롭다운 옵션
// const STUDY_FIELD_OPTIONS = ['학업', '언어', '취업/커리어', '자기계발'] as const;
// const SUBFIELD_MAP: Record<(typeof STUDY_FIELD_OPTIONS)[number], string[]> = {
//   학업: ['전공 공부', '시험 공부', '자격증', '고시·임용·공무원'],
//   언어: ['회화', '외국어 시험'],
//   '취업/커리어': ['면접·자소서', '디자인', 'IT', '마케팅', '코딩', '데이터 분석'],
//   자기계발: ['독서·글쓰기', '운동', '사진·영상'],
// };

// const STUDY_TYPE_OPTIONS = ['체계적인', '자유로운', '협력적인', '실적중심'];
// const PROGRESS_METHOD_OPTIONS = ['온라인', '오프라인', '온라인/오프라인'];
// const CONTACT_METHOD_OPTIONS = ['카카오톡', '이메일'];
const RULE_TAG_OPTIONS = [
  { label: "시간", key: "time" },
  { label: "벌금", key: "penalty" },
  { label: "휴무", key: "absence" },
  { label: "분위기", key: "mood" },
  { label: "기타", key: "etc" },
];

// [ld] 임시 데이터 (필드명 변경해야 함)
const studyData: TStudySchema & {
  isRecruiting: boolean;
  createdAt: string;
  author: string;
} = {
  studyField: "언어 - 회화",
  studyType: "체계적인",
  progressMethod: "오프라인",
  contactMethod: "카카오톡",
  contactInfo: "https://open.kakao.com/o/english_friends_study",
  name: "영어 회화 깨부수기 스터디",
  createdAt: "2025-08-01",
  author: "다함송이",
  introduction: `
    1. 영어 회화 실전 스터디 소개

    10주 동안 영어 회화 진짜로 늘리고 싶은 분들을 위한 실전 스터디입니다.


    2. 진행 방식

    - 🎬 유튜브, Cake앱 등을 활용한 미드 학습
    - 📺 미드 '프렌즈' 쉐도잉 훈련
    - 🤖 ChatGPT 상황별 롤플레이
    - 💬 매주 Google Meet 스피킹 발표


    3. 이런 분들께 추천해요

    - 영어로 말하려면 머리가 하얘지는 분
    - 영어로 대화할 기회가 부족한 분
    - 리스닝은 되는데 말이 안 나오는 분


    단순히 듣고 끝나는 스터디가 아니라  
    내 입으로 말해본 문장 수로 성장하는 스터디입니다.

    왕초보 ~ 중급까지 모두 환영해요 🙌 
    카톡으로 과제 인증 & 질문도 자유롭게 가능해요!
    `,

  rules: {
    time: "매주 토요일 오후 7시 ~ 9시",
    absence: "월 1회까지 휴무 가능",
    mood: "영어를 잘 못해도 편하게 이야기할 수 있는 분위기",
  },
  isRecruiting: true,
};

export function StudyRead() {
  const navigate = useNavigate();
  const { studyId } = useParams();
  const [, setActiveRuleTags] = useState<string[]>([]);
  const [, setIsRecruiting] = useState<boolean | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const { nickname } = useAuthStore();

  // const { data: studyData } = useQuery({
  //   queryKey: ['study', studyId],
  //   queryFn: () => fetchStudyById(Number(studyId)),
  //   enabled: !!studyId,
  // });

  const FetchMyInfoButton = () => {
    const methods = useFormContext<TStudyApplySchema>();
    // const handleAutoFill = async () => {
    //   try {
    //     const data: TMyInfo = await fetchMyInfoApi();
    //     methods.reset({
    //       studentStatus: data.studentStatus,
    //       major: data.major,
    //       phoneNumber: data.phoneNumber,
    //     });
    //     alert('내 정보가 불러와졌습니다.');
    //   } catch (error) {
    //     alert('내 정보 불러오기에 실패했습니다. 다시 시도해주세요.');
    //   }
    // };
    const handleAutoFillTemp = () => {
      methods.reset({
        studentStatus: "재학생",
        major: "소프트웨어학부 컴퓨터과학전공",
        phoneNumber: "010-4917-1039",
        preference: "꼼꼼송이 (계획형)",
      });
    };

    return (
      <Button
        type="button"
        variant="solid"
        size="sm"
        onClick={() => handleAutoFillTemp()}
      >
        내 정보 불러오기
      </Button>
    );
  };
  useEffect(() => {
    if (studyData) {
      if (studyData.rules) {
        setActiveRuleTags(Object.keys(studyData.rules));
      }
      setIsRecruiting(studyData.isRecruiting);
    }
  }, [studyData]);

  // const { mutate: submitStudyApply } = useMutation({
  //   mutationFn: (studyApplyData: TStudyApplySchema) =>
  //     studyApplyApi(Number(studyId), studyApplyData),
  //   onSuccess: (res) => {
  //     alert('스터디 지원이 완료되었습니다.');
  //     setIsApplyModalOpen(false);
  //     navigate(`/study/detail/${studyId}`);
  //   },
  //   onError: (error: AxiosError<{ message: string }>) => {
  //     alert(error.response?.data?.message || '스터디 지원에 실패했습니다.');
  //   },
  // });

  const onSubmit = (data: TStudyApplySchema) => {
    console.log("Study Apply Data:", data);
    // submitStudyApply(data);
    // 임시로 웰컴 스탬프 모달 띄우기
    setIsApplyModalOpen(false); //[ld]
    navigate(`/my-applications`);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <AuthHeader className="z-60" />
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
                  <span className="text-body-2-semibold text-gray-400">
                    {studyData.author}
                  </span>
                </div>
                <div className="h-7 w-[2px] bg-gray-100" />
                <span className="text-body-2-semibold text-gray-400">
                  {studyData.createdAt}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 bg-gray-50 rounded-[16px] px-9 py-6">
                <div className="flex items-center">
                  <p className="w-22 text-body-1-semibold text-gray-300">
                    스터디 분야
                  </p>
                  <p className="text-body-1 text-black">
                    {studyData.studyField}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="w-22 text-body-1-semibold text-gray-300">
                    스터디 성향
                  </p>
                  <p className="text-body-1 text-black">
                    {studyData.studyType}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="w-22 text-body-1-semibold text-gray-300">
                    진행 방식
                  </p>
                  <p className="text-body-1 text-black">
                    {studyData.progressMethod}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="w-22 text-body-1-semibold text-gray-300">
                    연락 방식
                  </p>
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
              <h1 className="heading-2 text-gray-500 mb-5">
                우리 스터디를 소개할게요 !
              </h1>
              <div className="bg-gray-50 rounded-[16px] px-9 py-6 whitespace-pre-line">
                {studyData.introduction}
              </div>
            </div>
            {/* 스터디 규칙 */}
            <div className="flex flex-col">
              <h1 className="heading-2 text-gray-500 mb-5">
                이렇게 운영될 예정이에요
              </h1>
              <div className="bg-gray-50 rounded-[16px] px-9 py-6">
                <div className="flex flex-col gap-5">
                  {studyData.rules &&
                    Object.entries(studyData.rules).map(([key, value]) => {
                      const ruleInfo = RULE_TAG_OPTIONS.find(
                        (rule) => rule.key === key
                      );
                      if (!ruleInfo) return null;
                      return (
                        <div key={key} className="flex flex-col gap-1">
                          <p className="text-body-1-semibold text-gray-300">
                            {ruleInfo.label}
                          </p>
                          <p className="text-body-1 text-black">{value}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-60">
            <Button onClick={() => setIsApplyModalOpen(true)}>지원하기</Button>
            <Button variant="default" onClick={() => {}}>
              관심 스터디
            </Button>
          </div>
        </div>
      </main>
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        className="fixed top-[88px] right-0 max-w-[400px] h-[calc(100%-88px)] flex flex-col px-10 py-10 rounded-none"
      >
        <Form
          schema={studyApplySchema}
          onSubmit={onSubmit}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="flex justify-between mb-5 items-center">
            <h2 className="heading-2">지원서 작성</h2>
            <FetchMyInfoButton />
          </div>
          <div className="flex-1 overflow-y-auto pr-3 space-y-5">
            <FormField
              name="nickname"
              label="닉네임"
              placeholder="김눈송"
              // defaultValue={"김눈송" || { nickname } || ""}
              defaultValue="김눈송"
              readOnly
            />
            <FormField
              name="studentStatus"
              label="재학상태"
              placeholder="재학 상태를 선택해주세요."
              type="dropdown"
              options={studentStatusOptions}
            />
            <FormField
              name="major"
              label="전공"
              placeholder="전공을 선택해주세요."
              type="dropdown"
              options={majorOptions}
              isSearchable={true}
            />
            <FormField
              name="phoneNumber"
              label="전화번호"
              placeholder="연락 가능한 전화번호를 입력해주세요."
            />
            <FormField
              name="preference"
              label="스터디 성향"
              placeholder="스터디 성향을 입력해주세요."
            />
            <FormField
              label="지원 동기"
              name="motivation"
              placeholder="스터디에 지원하게 된 동기를 입력해주세요."
              type="textarea"
            />
            <div className="flex mt-8 gap-2">
              <Button
                variant="default"
                onClick={() => setIsApplyModalOpen(false)}
              >
                취소
              </Button>
              <Button type="submit" className="flex-1">
                지원하기
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
