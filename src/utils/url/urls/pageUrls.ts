// PE 3/3
const pageUrls = {
  relearn: {
    tagId: (tagId: number) => `/relearn/tag/${tagId}`,
  },
  skillbase: {
    index: "/skillbase",
    tag: "/skillbase/tag",
    untagged: "/skillbase/untagged",
  },
  settings: {
    account: "/settings/account",
    monerate: {
      index: "/settings/monerate",
      places: "/settings/monerate/places",
      categories: "/settings/monerate/categories",
    },
  },
  feed: {
    index: "/feed",
  },
  define: {
    index: "/define/",
    docId: (docId: number) => `/define/doc/${docId}`,
  },

  user: {
    index: (username: string) => `/user/${username}`,
    tag: (username: string, listId: number) =>
      `/user/${username}/tag/${listId}`,
    roadmap: (username: string, skillId: number) =>
      `/user/${username}/roadmap/${skillId}`,
  },
  notFound: "/404",
  search: (query: string) => "/search?q=" + query,
}

export default pageUrls
