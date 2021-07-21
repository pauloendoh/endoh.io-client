// PE 3/3
const API = {
  auth: {
    index: "/auth",
    google: "/auth/google",
    googleLogin: "/auth/google/login",
    resetPassword: "/auth/password-reset",
    authPasswordChange: "/auth/authenticated-password-change",
    username: "/auth/username",
    tempUser: "/auth/temp-user",
    userPreference: "/auth/user-preference",
  },
  monerate: {
    expense: "/monerate/expense",
    place: "/monerate/place",
    category: "/monerate/category",
  },
  relearn: {
    resource: "/relearn/resource",
    resourceDuplicate: "/relearn/resource/duplicate",
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
    doc: "/define/doc",
    note: "/define/note",
    postManyNotes: "/define/note/many",
  },
  BigDecisions: {
    decision: "/BigDecisions/decision",
    decisionTable: "/BigDecisions/decisionTable",
    sortProblemsByWeight: `/BigDecisions/decisionTable/sortProblemsByWeight`,
    decisionTableItem: "/BigDecisions/decisionTableItem",
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
    myUserSuggestions: "/feed/my-user-suggestions",
    resources: "/feed/resources",
  },
}

export default API
