import { useNavigate, useParams } from "react-router-dom";
import { AuthHeader } from "@/components/layout/AuthHeader";
import { StudyPreferenceQuestionCard } from "../component/StudyPreferenceQuestionCard";
import { studyPreferenceQuestions } from "../studyPreferenceTest";
import { Badge } from "@/components/ui/Badge";
import { useEffect, useState } from "react";

export function StudyPreferenceQuestion() {
  const { questionId } = useParams();
  const total = studyPreferenceQuestions.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(total).fill(null)
  );

  const currentQuestion = studyPreferenceQuestions[currentIndex];
  const selectedIndex = answers[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = optionIndex;
      return next;
    });
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    if (currentIndex < total - 1) {
      navigate(`/study/preference-test/question/${currentIndex + 2}`, {
        replace: true,
      });
      return;
    }
    // api 호출 후 스터디 성향 결과 받아오기
    // resultData는 StudyPreferenceResultData 타입임
    const resultData = {
      name: "꼼꼼송이",
      type: "계획형",
      ment: "게획표를 들고 나타나는 철저 꼼꼼쟁이!",
      introduction: "무엇이든 차근차근 계획부터 세우고 움직이는 타입이에요",
      warning:
        "시간 관리와 자료 준비에 능해 팀을 안정적으로 이끌지만, 때로는 융통성이 부족할 수 있어요.",
    };
    navigate("/study/preference-test/result", {
      replace: true,
      state: {
        result: resultData,
      },
    });
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
