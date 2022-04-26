export const urls = {
  api: {
    register: "/auth/register",

    //TAGS
    saveTagLastOpenedAt: (tagId: number) => `/v2/tag/${tagId}/last-opened-at`,

    // Skillbase
    skillbase: {
      label: "/v2/skillbase/label",
      labelId: (labelId: number) => `/v2/skillbase/label/${labelId}`,
      skillLabel: (skillId: number) => `/v2/skillbase/skill/${skillId}/label`,
      progressMonths: `/v2/skillbase/skill-progress/months`,
      progressFrom: (fromYearMonth: string) =>
        `/v2/skillbase/skill-progress?from=${fromYearMonth}`,
    },

    // DEFINE
    saveDocLastOpenedAt: (docId: number) =>
      `define/doc/${docId}/last-opened-at`,
    clearEmptyNotes: (docId: number) => `define/doc/${docId}/clear-empty-notes`,

    // UTILS
    search: (query: string) => `/search?q=${query}`,
    linkPreview: (url: string) => `/v2/utils/link-preview?url=${url}`,
  },
};
