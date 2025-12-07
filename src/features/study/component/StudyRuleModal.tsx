import { Modal } from "@/components/ui/Modal";
import CloseSvg from "@/assets/icons/close.svg";
import { Button } from "@/components/ui/button";
import { useEffect, useState, type ChangeEvent } from "react";
import {
  RULE_TAG_OPTIONS,
  type RuleCategory,
  type Rules,
  type StudyMember,
} from "../api/studyType";
import { FormField } from "@/components/ui/FormField";
import { TextAreaField } from "@/components/ui/TextAreaField";

interface StudyRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeRule: (rules: Rules[]) => void;
  studyId?: number;
  rules?: Rules[];
}

export function StudyRuleModal({
  isOpen,
  onClose,
  onChangeRule,
  studyId,
  rules,
}: StudyRuleModalProps) {
  // 각 규칙 태그에 맞게 FormField 렌더링
  // 해당 규칙을 클릭하면 버튼 색상이 focus로 바꾸고, 수정한 내용을 저장

  const [activeRuleTag, setActiveRuleTag] = useState<RuleCategory>("TIME");
  const [rulesState, setRulesState] = useState<Record<RuleCategory, string>>({
    TIME: "",
    FINE: "",
    DAY_OFF: "",
    ATMOSPHERE: "",
    ETC: "",
  });

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setRulesState((prev) => ({
      ...prev,
      [activeRuleTag]: value,
    }));
  };

  const handleSave = () => {
    // rulesState -> Rules[] 변환
    const updatedRules: Rules[] = Object.entries(rulesState).map(
      ([ruleCategory, description]) => ({
        ruleCategory: ruleCategory as RuleCategory,
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
          {RULE_TAG_OPTIONS.map(({ key, label }) => (
            <Button
              key={key}
              variant={activeRuleTag === key ? "focus" : "default"}
              size="sm"
              type="button"
              onClick={() => setActiveRuleTag(key)}
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
