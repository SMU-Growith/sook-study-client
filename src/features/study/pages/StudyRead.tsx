import { AuthHeader } from "@/components/layout/AuthHeader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/Form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  type TStudySchema,
  studyApplySchema,
  type TStudyApplySchema,
  type TStudyApplyRequest,
} from "../validators/study";
import { FormField } from "@/components/ui/FormField";
import { SideBar } from "@/components/ui/SideBar";
import UserProfileSvg from "@/assets/icons/userProfile.svg";
import LinkSvg from "@/assets/link.svg";
import { Modal } from "@/components/ui/Modal";
import { majorOptions, studentStatusOptions } from "@/constants";
import { useFormContext } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchStudyById, studyApplyApi } from "../api/study";
import { studyQueryKeys } from "../api/queries";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/lib/api";
import {
  MAJOR_MAP,
  REVERSE_MAJOR_MAP,
  REVERSE_STUDENT_STATUS_MAP,
  STUDENT_STATUS_MAP,
} from "@/features/auth/constants";

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
// const RULE_TAG_OPTIONS = [
//   { label: "시간", key: "time" },
//   { label: "벌금", key: "penalty" },
//   { label: "휴무", key: "absence" },
//   { label: "분위기", key: "mood" },
//   { label: "기타", key: "etc" },
// ];

// // [ld] 임시 데이터 (필드명 변경해야 함)
// const studyData: TStudySchema & {
//   isRecruiting: boolean;
//   createdAt: string;
//   author: string;
// } = {
//   studyField: "언어 - 회화",
//   studyType: "자유로운",
//   progressMethod: "온라인",
//   contactMethod: "카카오톡",
//   contactInfo: "kakao_id_123",
//   name: "함께 영어 회화 스터디해요!",
//   createdAt: "2025-10-14",
//   author: "민서송이",
//   introduction: "영어 회화 실력을 늘리고 싶은 분들 모여요!",
//   rules: {
//     time: "매주 토요일 오후 3시 ~ 5시",
//     absence: "월 1회까지 휴무 가능",
//     mood: "편안하고 자유로운 분위기",
//   },
//   isRecruiting: true,
// };

export function StudyRead() {
  const navigate = useNavigate();
  const { studyId } = useParams();
  // const [, setActiveRuleTags] = useState<string[]>([]);
  // const [, setIsRecruiting] = useState<boolean | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const { nickname, major, studentStatus, phoneNumber } = useAuthStore();
  const studyIdNumber = Number(studyId);

  const { data: studyData } = useQuery({
    queryKey: studyQueryKeys.studyDetail(studyIdNumber),
    queryFn: () => fetchStudyById(studyIdNumber),
    enabled: !!studyId,
  });

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
      console.log(major, studentStatus, phoneNumber);
      const majorMapped = REVERSE_MAJOR_MAP[major || "인공지능공학부"];
      const studentStatusMapped =
        REVERSE_STUDENT_STATUS_MAP[studentStatus || "휴학생"];

      methods.reset({
        studentStatus: studentStatusMapped,
        major: majorMapped,
        phoneNumber: phoneNumber || "010-5432-9813",
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

  // console.log("studyData", studyData);

  // useEffect(() => {
  //   if (studyData) {
  //     if (studyData.ruleDTO) {
  //       setActiveRuleTags(Object.keys(studyData.ruleDTO));
  //     }
  //     setIsRecruiting(studyData.isRecruiting);
  //   }
  // }, [studyData]);

  const { mutate: submitStudyApply } = useMutation<
    ApiResponse<null>,
    AxiosError<ApiResponse<null>>,
    { studyId: number; data: TStudyApplyRequest }
  >({
    mutationFn: ({ studyId, data }) => studyApplyApi(studyId, data),
    onSuccess: async (_data) => {
      navigate("/my-applications");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "스터디 지원에 실패했습니다.");
    },
  });

  const onSubmit = (data: TStudyApplySchema) => {
    console.log("Study Apply Data:", data);
    const mappedData: TStudyApplyRequest = {
      ...data,
      major: MAJOR_MAP[data.major] ?? data.major,
      studentStatus:
        STUDENT_STATUS_MAP[data.studentStatus] ?? data.studentStatus,
      applicationStatus: "PENDING",
    };
    submitStudyApply({
      studyId: studyIdNumber,
      data: mappedData,
    });
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
              <h1 className="heading-1 mb-3">{studyData?.title}</h1>
              <div className="flex items-center gap-3 mb-10">
                <div className="flex gap-1">
                  <img src={UserProfileSvg} alt="User Profile" />
                  <span className="text-body-2-semibold text-gray-400">
                    {studyData?.nickname}
                  </span>
                </div>
                <div className="h-7 w-[2px] bg-gray-100" />
                <span className="text-body-2-semibold text-gray-400">
                  {studyData?.createdAt}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 bg-gray-50 rounded-[16px] px-9 py-6">
                <div className="flex items-center">
                  <p className="w-22 text-body-1-semibold text-gray-300">
                    스터디 분야
                  </p>
                  <p className="text-body-1 text-black">
                    {studyData?.studyFieldName}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="w-22 text-body-1-semibold text-gray-300">
                    스터디 성향
                  </p>
                  <p className="text-body-1 text-black">
                    {studyData?.studyStyleCategory}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="w-22 text-body-1-semibold text-gray-300">
                    진행 방식
                  </p>
                  <p className="text-body-1 text-black">
                    {studyData?.studyFormat}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="w-22 text-body-1-semibold text-gray-300">
                    연락 방식
                  </p>
                  <div className="flex items-center gap-1">
                    <img src={LinkSvg} alt="Link" />
                    <p className="text-body-1 text-black">
                      <a href={`${studyData?.contactType}`} target="_blank">
                        {studyData?.url}
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
              <div className="bg-gray-50 rounded-[16px] px-9 py-6">
                {studyData?.description}
              </div>
            </div>
            {/* 스터디 규칙 */}
            <div className="flex flex-col">
              <h1 className="heading-2 text-gray-500 mb-5">
                이렇게 운영될 예정이에요
              </h1>
              <div className="bg-gray-50 rounded-[16px] px-9 py-6">
                <div className="flex flex-col gap-5">
                  {studyData?.ruleDTO
                    ?.filter((rule) => rule.description.trim().length > 0)
                    .map((rule) => (
                      <div
                        key={rule.ruleCategory}
                        className="flex flex-col gap-1"
                      >
                        <p className="text-body-1-semibold text-gray-300">
                          {rule.ruleCategory}
                        </p>
                        <p className="text-body-1 text-black">
                          {rule.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-60">
            {studyData?.isMyStudy ? (
              <Button onClick={() => navigate(`/study/update/${studyId}`)}>
                수정하기
              </Button>
            ) : (
              <Button onClick={() => setIsApplyModalOpen(true)}>
                지원하기
              </Button>
            )}
            <Button variant="default" onClick={() => {}}>
              관심 스터디
            </Button>
          </div>
        </div>
      </main>

      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        className="fixed top-[88px] right-0 w-1/3 h-[calc(100%-88px)] flex flex-col px-10 py-10"
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
              placeholder={nickname || "다함송이"}
              defaultValue={nickname || ""}
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
