import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export type StudyPreferenceQuestion = {
  id: number;
  question: string;
  options: string[];
};

interface StudyPreferenceTestCardsProps {
  q: StudyPreferenceQuestion;
  selectedIndex: number | null;
  onSelect: (optionIndex: number) => void;
}

export function StudyPreferenceQuestionCard({
  q,
  selectedIndex,
  onSelect,
}: StudyPreferenceTestCardsProps) {
  const navigate = useNavigate();

  const handleNext = () => {
    if (q.id == 6) {
      navigate('/study/preference-test/result');
    } else {
      navigate(`/study/preference-test/question/${q.id + 1}`);
    }
  };

  return (
    <>
      <h1 className="heading-1 mt-[26px]">
        Q{q.id}.
        <br />
        {q.question}
      </h1>
      <div className="flex flex-col gap-3 mt-10">
        {q.options.map((option, index) => {
          return (
            <Button key={index} variant="default" size="md" onClick={() => onSelect(index)}>
              {option}
            </Button>
          );
        })}
      </div>
      <Button
        variant={selectedIndex !== null ? 'primary' : 'disabled'}
        size="md"
        className="mt-10"
        onClick={handleNext}
      >
        선택하기
      </Button>
    </>
  );
}
