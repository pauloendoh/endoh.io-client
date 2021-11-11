export const urls = {
  pages: {
    relearnTag: (tagId: number) => `/relearn/tag/${tagId}`,
    define: {
      docId: (docId: number) => `/define/doc/${docId}`,
    },
  },
  api: {
    // AUTH
    login: "/auth/login",
    register: "/auth/register",

    //TAGS
    saveTagLastOpenedAt: (tagId: number) => `/v2/tag/${tagId}/last-opened-at`,

    // DEFINE
    saveDocLastOpenedAt: (docId: number) =>
      `define/doc/${docId}/last-opened-at`,

    // UTILS
    search: (query: string) => `/search?q=${query}`,
    linkPreview: (url: string) => `/v2/utils/link-preview?url=${url}`,
  },
};
