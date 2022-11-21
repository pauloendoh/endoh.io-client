// PE 2/3 - slowly mergint to urls.ts
const apiUrls = {
  monerate: {
    expense: "/monerate/expense",
    place: "/monerate/place",
    category: "/monerate/category",
  },

  skillbase: {
    index: "/skillbase",
    skill: "/skillbase/skill",
    tag: "/skillbase/tag",
    progress: "/skillbase/progress",
  },
  utils: {
    linkPreview: "/utils/link-preview",
    passwordResetEmail: "/utils/passwordResetEmail",
    search: (q: string) => "/utils/search?q=" + q,
    notifications: "/utils/notifications",
    notificationsSeeAll: "/utils/notifications/seeAll",
  },
  define: {
    doc: "define/doc",
    note: "define/note",
    updateManyNotes: "/define/note/many",
  },

  user: {
    index: "/user",
    ratedResources: (username: string) =>
      "/user/" + username + "/rated-resources",
    userInfo: (username: string) => "/user/" + username + "/all",
    profile: "/user/profile",
    picture: "/user/picture",
    followingTags: (username: string) => "/user/" + username + "/followingTags",
  },
  feed: {
    myUserSuggestions: "v2/feed/my-user-suggestions",
    resources: "v2/feed/resources",
  },
}

export default apiUrls
