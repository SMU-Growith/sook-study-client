import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/Form";
import {
  myProfileSchema,
  type TProfile,
  type TUpdateProfile,
} from "../validators/auth";
import { useNavigate } from "react-router-dom";
import UserProfileSvg from "@/assets/icons/userProfile.svg";
import { AuthHeader } from "@/components/layout/AuthHeader";
import { ProfileForm } from "../components/ProfileForm";
import { fetchMyInfoApi, profileUpdateApi } from "../api/auth";
import type { ProfileResult } from "../api/authType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/lib/api/apiClient";
import {
  MAJOR_MAP,
  REVERSE_MAJOR_MAP,
  REVERSE_STUDENT_STATUS_MAP,
  STUDENT_STATUS_MAP,
} from "../constants";
import { authQueryKeys } from "../api/queries";

export function MyPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 프로필 수정 api
  const { mutate: submitProfileUpdate } = useMutation<
    ApiResponse<ProfileResult>,
    AxiosError<ApiResponse<null>>,
    TUpdateProfile
  >({
    mutationFn: profileUpdateApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.myProfile() });
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message?: string }>;
      alert(err.response?.data?.message || "프로필 업데이트 실패");
    },
  });

  const onProfileSubmit = (data: TProfile) => {
    const finalData: TUpdateProfile = {
      nickName: data.nickName,
      studentStatus:
        STUDENT_STATUS_MAP[data.studentStatus] ?? data.studentStatus,
      major: MAJOR_MAP[data.major] ?? data.major,
      phoneNumber: data.phoneNumber,
      noticeYn: data.noticeYn,
    };
    console.log("TProfileSchema:", finalData);
    submitProfileUpdate(finalData);
  };

  // 프로필 정보 조회 api
  const { data: userInfo, isLoading } = useQuery<ProfileResult>({
    queryKey: authQueryKeys.myProfile(),
    queryFn: fetchMyInfoApi,
  });

  if (isLoading || !userInfo) {
    return null;
  }
  // console.log("userInfo >>>", userInfo);

  const mapToProfileFormValues = (api: ProfileResult): TProfile => ({
    nickName: api.nickName,
    studentStatus:
      REVERSE_STUDENT_STATUS_MAP[api.studentStatus] ?? api.studentStatus,
    major: REVERSE_MAJOR_MAP[api.major] ?? api.major,
    studyStyle: api.studyStyle,
    phoneNumber: api.phoneNumber,
    noticeYn: api.noticeYn,
  });

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <AuthHeader />
      <main className="flex flex-col w-full max-w-[800px] mt-[88px] px-20 py-10 gap-y-10 overflow-y-auto">
        <div className="flex justify-center">
          <img src={UserProfileSvg} alt="User Profile" className="w-10 h-10" />
        </div>
        <Form
          schema={myProfileSchema}
          onSubmit={onProfileSubmit}
          className="space-y-5"
          defaultValues={
            userInfo ? mapToProfileFormValues(userInfo) : undefined
          }
        >
          <ProfileForm />
          <div className="flex w-full justify-end gap-2 mt-15">
            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={() => navigate("/home")}
            >
              홈으로
            </Button>
            <Button type="submit" variant="primary" size="lg">
              프로필 저장하기
            </Button>
          </div>
        </Form>
      </main>
    </div>
  );
}
