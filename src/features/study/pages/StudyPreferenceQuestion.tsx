import { useParams } from 'react-router-dom';
import { AuthHeader } from '@/components/layout/AuthHeader';
import { StudyPreferenceQuestionCard } from '../component/StudyPreferenceQuestionCard';
import { studyPreferenceQuestions } from '../studyPreferenceTest';
import { Badge } from '@/components/ui/Badge';
import { useEffect, useState } from 'react';

export function StudyPreferenceQuestion() {
  const { questionId } = useParams();
  const total = studyPreferenceQuestions.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(total).fill(null));

  const currentQuestion = studyPreferenceQuestions[currentIndex];
  const selectedIndex = answers[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = optionIndex;
      return next;
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
        />
      </main>
    </div>
  );
}
