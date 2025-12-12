import type { MyStudyLog } from "./component/MyStudyLogCard";

export const myStudyLogListData: MyStudyLog[] = [
  {
    id: 1,
    title: "자기소개 3분 영어 스피치 발표 및 피드백 공유",
    role: "스터디장",
    writerNickname: "다함송이",
    viewCount: 48,
    content:
      "첫 OT에서 각자 3분 영어 스피치를 발표하며, 자기소개를 영어로 해보았습니다. 발표 후 피드백을 주고받으면서 어떤 부분에서 개선할 수 있을지 고민했어요. 긴장도 많이 했지만, 나중에 발표할 3분 스피치를 준비하는 데 큰 도움이 되었습니다.",
    link: "https://docs.google.com/presentation/ot_introduction_slide",
    attachments: [
      {
        id: 1,
        name: "self_introduction_script.pdf",
        type: "pdf",
        url: "/mock/files/self_introduction_script.pdf",
      },
    ],
    likeCount: 5,
    heartCount: 7,
    laughCount: 1,
    surpriseCount: 1,
    questionCount: 2,
  },
  {
    id: 2,
    title:
      "‘프렌즈’ 시즌 1 에피소드의 등장인물들의 대사를 3분 영어 스피치 형식으로 발표",
    role: "스터디원",
    writerNickname: "프렌즈송",
    viewCount: 36,
    content:
      "‘프렌즈’ 시즌 1 에피소드를 보며, 등장인물들의 대사를 3분 영어 스피치 형식으로 바꿔서 발표했습니다. 대사의 억양과 발음을 정확히 따라하며, 스피치를 통해 자연스러운 대화 흐름을 익혔습니다. 발표 후 서로 피드백을 주고받으며, 실전 발표에 가까운 연습을 할 수 있었습니다.",
    link: "https://www.netflix.com/title/70153404",
    attachments: [
      {
        id: 1,
        name: "friends_s1e1_expressions.pdf",
        type: "pdf",
        url: "/mock/files/friends_s1e1_expressions.pdf",
      },
    ],
    likeCount: 6,
    heartCount: 6,
    laughCount: 0,
    surpriseCount: 2,
    questionCount: 1,
  },
  {
    id: 3,
    title: "카페에서 주문하기 상황을 주제로 3분 영어 스피치 발표",
    role: "스터디원",
    writerNickname: "카페송",
    viewCount: 41,
    content:
      "‘카페에서 주문하기’ 상황을 주제로 3분 스피치를 준비하고 발표했습니다. ChatGPT와 롤플레이를 하며 연습했던 표현들을 실제 발표에 적용하고, 자연스럽게 문장을 이어가는 방법을 배웠습니다. 발표 후 피드백을 통해 더 나은 표현을 만들 수 있었습니다.",
    link: "https://chat.openai.com",
    attachments: [
      {
        id: 1,
        name: "cafe_roleplay_log.txt",
        type: "png",
        url: "/mock/files/cafe_roleplay_log.txt",
      },
    ],
    likeCount: 7,
    heartCount: 5,
    laughCount: 1,
    surpriseCount: 1,
    questionCount: 3,
  },
  {
    id: 4,
    title: "Zoom에서 1:1 랜덤 파트너와 스피치를 발표",
    role: "스터디원",
    writerNickname: "줌송",
    viewCount: 58,
    content:
      "Zoom에서 1:1 랜덤 파트너와 스피치를 발표했습니다. 발표는 3분으로 제한했으며, 주제에 맞게 자연스럽게 대화를 이어가는 연습을 했습니다. 발표 후 피드백을 주고받으며, 발표 내용에 대한 자신감을 얻고, 3분 동안 말하는 능력을 개선할 수 있었습니다.",
    link: "https://zoom.us",
    attachments: [
      {
        id: 1,
        name: "small_talk_topics.pdf",
        type: "pdf",
        url: "/mock/files/small_talk_topics.pdf",
      },
    ],
    likeCount: 9,
    heartCount: 8,
    laughCount: 2,
    surpriseCount: 2,
    questionCount: 4,
  },
];
