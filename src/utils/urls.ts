export const urls = {
  api: {
    register: "/auth/register",

    //TAGS
    saveTagLastOpenedAt: (tagId: number) => `/v2/tag/${tagId}/last-opened-at`,

    // Skillbase
    skillbase: {
      label: "/v2/skillbase/label",
      skillLabel: (skillId: number) => `/v2/skillbase/skill/${skillId}/label`,
    },

    // DEFINE
    saveDocLastOpenedAt: (docId: number) =>
      `define/doc/${docId}/last-opened-at`,

    // UTILS
    search: (query: string) => `/search?q=${query}`,
    linkPreview: (url: string) => `/v2/utils/link-preview?url=${url}`,
  },
};
