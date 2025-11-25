import type { MyStudyLog } from './component/MyStudyLogCard';

export const myStudyLogListData: MyStudyLog[] = [
  {
    id: 1,
    title: 'React 렌더링 최적화 기본기 다지기',
    role: '스터디원',
    writerNickname: '프론트송',
    viewCount: 52,
    content:
      'React의 렌더링 원리를 다시 학습하고, Virtual DOM 비교 과정과 리렌더링 트리거 조건을 정리했습니다.',
    link: 'https://react.dev/learn/render-and-commit',
    attachments: [
      {
        id: 1,
        name: 'rendering_optimization.pdf',
        type: 'pdf',
        url: '/mock/files/rendering_optimization.pdf',
      },
    ],
    likeCount: 3,
    heartCount: 4,
    laughCount: 0,
    surpriseCount: 1,
    questionCount: 1,
  },
  {
    id: 2,
    title: 'React.memo & useMemo 실전 적용해보기',
    role: '스터디원',
    writerNickname: '코딩송',
    viewCount: 37,
    content:
      '불필요한 렌더링을 줄이기 위해 React.memo와 useMemo를 여러 예제로 실습하고, 언제 써야 할지 기준을 정리했습니다.',
    link: 'https://react.dev/reference/react/useMemo',
    attachments: [
      { id: 1, name: 'memo_usage.png', type: 'png', url: '/mock/files/memo_usage.png' },
    ],
    likeCount: 5,
    heartCount: 3,
    laughCount: 1,
    surpriseCount: 0,
    questionCount: 0,
  },
  {
    id: 3,
    title: 'React 상태관리 최적화 (Zustand + React Query)',
    role: '스터디원',
    writerNickname: '상태송',
    viewCount: 44,
    content:
      'Zustand의 부분 구독 패턴과 React Query의 캐싱 전략을 활용해, 상태 변경이 최소한의 컴포넌트만 렌더링되도록 개선했습니다.',
    link: 'pmndrs/zustand.pdf',
    attachments: [],
    likeCount: 4,
    heartCount: 4,
    laughCount: 0,
    surpriseCount: 1,
    questionCount: 2,
  },
  {
    id: 4,
    title: '성능 분석 도구로 렌더링 문제 찾기',
    role: '스터디원',
    writerNickname: '디버깅송',
    viewCount: 61,
    content:
      'React Profiler와 Chrome Performance 패널을 활용해 실제 렌더링 문제를 찾고, Fiber 트리를 시각적으로 분석했습니다.',
    link: 'pmndrs/zustand.pdf',
    attachments: [
      { id: 1, name: 'profiling_result.png', type: 'png', url: '/mock/files/profiling_result.png' },
    ],
    likeCount: 7,
    heartCount: 5,
    laughCount: 0,
    surpriseCount: 2,
    questionCount: 3,
  },
];
