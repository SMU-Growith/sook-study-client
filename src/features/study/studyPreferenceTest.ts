import type { StudyPreferenceQuestion } from "./component/StudyPreferenceQuestionCard";

export const studyPreferenceQuestions: StudyPreferenceQuestion[] = [
  {
    questionId: 1,
    question: "스터디를 시작할 때 나는?",
    options: [
      { optionId: 1, text: "목표와 계획을 꼼꼼하게 세운다." },
      { optionId: 2, text: "일단 시작해보고 나중에 조율한다." },
      { optionId: 3, text: "팀원들과 맞춰가며 방향을 정한다." },
      { optionId: 4, text: "성과가 확실히 나오도록 준비한다." },
    ],
  },
  {
    questionId: 2,
    question: "선호하는 스터디 분위기는?",
    options: [
      {
        optionId: 5,
        text: "자유롭게 아이디어를 나누고 이야기할 수 있는 분위기",
      },
      { optionId: 6, text: "서로 응원하고 챙겨주는 따뜻한 분위기" },
      { optionId: 7, text: "성과를 체크하며 긴장감있는 분위기" },
      { optionId: 8, text: "집중할 수 있는 차분한 분위기" },
    ],
  },
  {
    questionId: 3,
    question: "스터디에서 나의 역할은?",
    options: [
      { optionId: 9, text: "의견을 조율하고 팀원들을 챙긴다." },
      { optionId: 10, text: "결과를 정리하고 발표한다." },
      { optionId: 11, text: "자료 준비나 시간 관리를 맡는다." },
      { optionId: 12, text: "분위기를 밝게 만들고 아이디어를 낸다." },
    ],
  },
  {
    questionId: 4,
    question: "내가 스터디를 하는 이유는?",
    options: [
      { optionId: 13, text: "결과를 내고 스펙을 쌓기 위해" },
      { optionId: 14, text: "공부 습관을 꾸준히 만들고 싶어서" },
      { optionId: 15, text: "다양한 사람들과 교류하고 경험하려고" },
      { optionId: 16, text: "혼자보다 같이 하면 더 힘이 나서" },
    ],
  },
  {
    questionId: 5,
    question: "스터디 일정이 틀어질 때 나는?",
    options: [
      { optionId: 17, text: "팀원들의 사정을 먼저 고려하려고 한다." },
      { optionId: 18, text: "결과를 위해 일정을 강하게 밀고 나간다." },
      { optionId: 19, text: "상황에 맞게 유연하게 대처한다." },
      { optionId: 20, text: "다시 계획을 짜서 맞추려고 한다." },
    ],
  },
  {
    questionId: 6,
    question: "스터디가 끝난 후에 나는?",
    options: [
      { optionId: 21, text: "기록을 남기고 피드백을 정리한다." },
      { optionId: 22, text: "팀원들과 자유롭게 친목을 이끈다." },
      { optionId: 23, text: "함께한 팀원들에게 고마움을 전한다." },
      { optionId: 24, text: "결과물을 정리해 활용한다." },
    ],
  },
];
