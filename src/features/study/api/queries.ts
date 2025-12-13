export const studyQueryKeys = {
  homeStudies: (type?: string, sortParam?: string) =>
    ["homeStudies", type, sortParam] as const,
  // sessionLogs: (sessionId: number) => ["sessionLogs", sessionId] as const,
  studySessions: (studyId: number) => ["studySessions", studyId] as const,
  studyLogs: (sessionId: number) => ["studyLogs", sessionId] as const,
  studyLogDetail: (journalId: number) => ["studyLogDetail", journalId] as const,
  myApplications: () => ["myApplications"] as const,
  studyMatch: () => ["studyMatch"] as const,
};
