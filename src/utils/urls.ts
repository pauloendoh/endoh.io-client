export const urls = {
  pages: {
    relearnTag: (tagId: number) => `/relearn/tag/${tagId}`,
  },
  api: {
    saveTagLastOpenedAt: (tagId: number) => `/v2/tag/${tagId}/last-opened-at`,
    search: (query: string) => `/search?q=${query}`,
    linkPreview: (url: string) => `/v2/utils/link-preview?url=${url}`,
  },
};
