import { Modal } from "@/components/ui/Modal";
import CloseSvg from "@/assets/icons/close.svg";
import { Button } from "@/components/ui/button";
import { useEffect, useState, type ChangeEvent } from "react";
import { type RuleCategoryLabel, type RulesLabel } from "../api/studyType";
import { TextAreaField } from "@/components/ui/TextAreaField";

interface StudyRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeRule: (rules: RulesLabel[]) => void;
  rules?: RulesLabel[];
}

export function StudyRuleModal({
  isOpen,
  onClose,
  onChangeRule,
  rules,
}: StudyRuleModalProps) {
  // 각 규칙 태그에 맞게 FormField 렌더링
  // 해당 규칙을 클릭하면 버튼 색상이 focus로 바꾸고, 수정한 내용을 저장
  const RULE_TAG_OPTIONS = ["시간", "벌금", "휴무", "분위기", "기타"];

  const [activeRuleTag, setActiveRuleTag] = useState<RuleCategoryLabel>("시간");
  const [rulesState, setRulesState] = useState<
    Record<RuleCategoryLabel, string>
  >({
    시간: "",
    벌금: "",
    휴무: "",
    분위기: "",
    기타: "",
  });

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setRulesState((prev) => ({
      ...prev,
      [activeRuleTag]: value,
    }));
  };

  const handleSave = () => {
    // rulesState -> RulesLabel[] 변환
    const updatedRules: RulesLabel[] = Object.entries(rulesState).map(
      ([ruleCategory, description]) => ({
        ruleCategory: ruleCategory as RuleCategoryLabel,
        description,
      })
    );
    onChangeRule(updatedRules);
  };

  useEffect(() => {
    if (!rules) return;
    setRulesState((prev) => {
      const next = { ...prev };
      rules.forEach((rule) => {
        next[rule.ruleCategory] = rule.description;
      });
      return next;
    });
  }, [rules]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[550px]">
      <div className="flex flex-col text-left relative pt-4">
        <button onClick={onClose} className="absolute top-[-10px] right-0">
          <img src={CloseSvg} alt="닫기" className="w-6 h-6" />
        </button>
        <h3 className="heading-3 mb-2">스터디 규칙</h3>
        <hr className="border-t-3 border-gray-100 mt-2 mb-2" />

        <div className="flex gap-2 mb-5">
          {RULE_TAG_OPTIONS.map((label) => (
            <Button
              key={label}
              variant={activeRuleTag === label ? "focus" : "default"}
              size="sm"
              type="button"
              onClick={() => setActiveRuleTag(label as RuleCategoryLabel)}
            >
              {label}
            </Button>
          ))}
        </div>
        <TextAreaField
          key={activeRuleTag}
          name={`rules.${activeRuleTag}`}
          placeholder={`${activeRuleTag}에 대한 규칙을 입력해주세요.`}
          value={rulesState[activeRuleTag]}
          onChange={handleChangeText}
        />

        <div className="flex gap-[10px] mt-[12px] mb-[12px]">
          <Button variant="default" onClick={onClose}>
            닫기
          </Button>
          <Button variant="primary" className="flex-1" onClick={handleSave}>
            저장하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
