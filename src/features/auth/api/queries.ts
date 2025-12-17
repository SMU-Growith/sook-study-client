export const authQueryKeys = {
  myProfile: () => ["myProfile"] as const,
  stampList: (userId?: number) => ["stampList", userId] as const,
};
