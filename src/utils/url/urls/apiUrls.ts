// PE 2/3 - slowly mergint to urls.ts
const apiUrls = {
  auth: {
    resetPassword: "/auth/password-reset",
    authPasswordChange: "/auth/authenticated-password-change",
    username: "/auth/username",
    tempUser: "/auth/temp-user",
    userPreference: "/auth/user-preference",
    me: "/auth/me",
  },
  monerate: {
    expense: "/monerate/expense",
    place: "/monerate/place",
    category: "/monerate/category",
  },
  relearn: {
    resource: "/relearn/resource",
    resourceDuplicate: "/relearn/resource/duplicate",
    resourceMoveToTag: "/v2/resources/many/to-tag",
    deleteManyResources: "/v2/resources/many/delete",
    tag: "/relearn/tag",
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
