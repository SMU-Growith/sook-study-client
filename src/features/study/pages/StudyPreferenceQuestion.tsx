import { useNavigate, useParams } from "react-router-dom";
import { AuthHeader } from "@/components/layout/AuthHeader";
import { StudyPreferenceQuestionCard } from "../component/StudyPreferenceQuestionCard";
import { studyPreferenceQuestions } from "../studyPreferenceTest";
import { Badge } from "@/components/ui/Badge";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { PreferenceResult, QuestionAnswerItem } from "../api/studyType";
import type { ApiResponse } from "@/lib/api/apiClient";
import type { AxiosError } from "axios";
import { saveStudyPreferenceResultApi } from "../api/study";

export function StudyPreferenceQuestion() {
  const { questionId } = useParams();
  const total = studyPreferenceQuestions.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const [MyAnswers, setMyAnswers] = useState<QuestionAnswerItem[]>([]);

  const currentQuestion = studyPreferenceQuestions[currentIndex];
  const selectedIndex = MyAnswers[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    const question = studyPreferenceQuestions[currentIndex];
    const option = question.options[optionIndex];

    setMyAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== question.questionId);

      return [
        ...filtered,
        {
          questionId: question.questionId,
          optionId: option.optionId,
        },
      ];
    });
  };

  const { mutate: submitStudyPreference } = useMutation<
    PreferenceResult,
    AxiosError<ApiResponse<null>>,
    { data: { answers: QuestionAnswerItem[] } }
  >({
    mutationFn: ({ data }) => saveStudyPreferenceResultApi(data),
    onSuccess: async (_data) => {
      // alert("스터디 성향 결과를 받아왔습니다.");
      console.log("Study Preference Result:", _data);
      navigate("/study/preference-test/result", {
        replace: true,
        state: {
          result: _data,
        },
      });
    },
    onError: (error) => {
      alert(
        error.response?.data?.message || "스터디 성향 결과 조회에 실패했습니다."
      );
    },
  });

  const handleNext = () => {
    if (selectedIndex === null) return;
    if (currentIndex < total - 1) {
      navigate(`/study/preference-test/question/${currentIndex + 2}`, {
        replace: true,
      });
      return;
    }
    submitStudyPreference({ data: { answers: MyAnswers } });
    console.log("All answers submitted:", MyAnswers);
  };

  useEffect(() => {
    if (questionId) {
      setCurrentIndex(Number(questionId) - 1);
    }
  }, [questionId]);

  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <AuthHeader />
      <main className="flex flex-col mt-[88px] overflow-y-auto w-[600px]">
        <div className="w-full h-[6px] bg-gray-100 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-primary-400 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <Badge variant="blue">{currentIndex + 1}/6</Badge>
        <StudyPreferenceQuestionCard
          q={currentQuestion}
          selectedIndex={selectedIndex}
          onSelect={handleSelectOption}
          onNext={handleNext}
        />
      </main>
    </div>
  );
}
