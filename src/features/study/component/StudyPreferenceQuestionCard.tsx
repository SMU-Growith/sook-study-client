import { Button } from "@/components/ui/button";

export type StudyPreferenceQuestion = {
  questionId: number;
  question: string;
  options: { optionId: number; text: string }[];
};

interface StudyPreferenceTestCardsProps {
  q: StudyPreferenceQuestion;
  selectedIndex: number | null;
  onSelect: (optionIndex: number) => void;
  onNext: () => void;
}

export function StudyPreferenceQuestionCard({
  q,
  selectedIndex,
  onSelect,
  onNext,
}: StudyPreferenceTestCardsProps) {
  return (
    <>
      <h1 className="heading-1 mt-[26px]">
        Q{q.questionId}.
        <br />
        {q.question}
      </h1>
      <div className="flex flex-col gap-3 mt-10">
        {q.options.map((option, index) => {
          return (
            <Button
              key={index}
              variant="default"
              size="md"
              onClick={() => onSelect(index)}
            >
              {option.text}
            </Button>
          );
        })}
      </div>
      <Button
        variant={selectedIndex !== null ? "primary" : "disabled"}
        size="md"
        className="mt-10"
        onClick={onNext}
      >
        선택하기
      </Button>
    </>
  );
}
