export const studyQueryKeys = {
  homeStudies: (type?: string, sortParam?: string) =>
    ["homeStudies", type, sortParam] as const,
  // sessionLogs: (sessionId: number) => ["sessionLogs", sessionId] as const,
  studySessions: (studyId: number, offset: number, limit: number) =>
    ["studySessions", studyId, offset, limit] as const,
  studyLogs: (sessionId: number, offset: number, limit: number) =>
    ["studyLogs", sessionId, offset, limit] as const,
  studyLogDetail: (journalId: number) => ["studyLogDetail", journalId] as const,
  myApplications: () => ["myApplications"] as const,
  studyMatch: () => ["studyMatch"] as const,
  searchStudies: (
    studyFieldNames: string[],
    studyFormats: string[],
    studyStyleCategories: string[],
    isRecruiting: boolean | null,
    searchContent: string,
    offset: number,
    limit: number,
    sortParam: string
  ) =>
    [
      "searchStudies",
      studyFieldNames,
      studyFormats,
      studyStyleCategories,
      isRecruiting,
      searchContent,
      offset,
      limit,
      sortParam,
    ] as const,
  studyDetail: (studyId: number) => ["studyDetail", studyId] as const,
  myStudies: (studyStatus: string, offset: number, limit: number) =>
    ["myStudies", studyStatus, offset, limit] as const,
  studyMembers: (studyId: number) => ["studyMembers", studyId] as const,
  studyRules: (studyId: number) => ["studyRules", studyId] as const,
  myStudyDetail: (studyId: number) => ["myStudyDetail", studyId] as const,
  studyApplication: (studyId: number) => ["studyApplication", studyId] as const,
};
