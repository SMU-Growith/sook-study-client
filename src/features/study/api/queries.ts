export const studyQueryKeys = {
  homeStudies: (type?: string, sortParam?: string) =>
    ["homeStudies", type, sortParam] as const,
  // sessionLogs: (sessionId: number) => ["sessionLogs", sessionId] as const,
  studySessions: (studyId: number) => ["studySessions", studyId] as const,
  studyLogs: (sessionId: number) => ["studyLogs", sessionId] as const,
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
  myStudies: (studyStatus: string) => ["myStudies", studyStatus] as const,
};
