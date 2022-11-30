export const urls = {
  pages: {
    index: "/",
    monerateIndex: "/monerate",
    openResourceId: (resourceId: number, pathname?: string) =>
      `${pathname}?openResourceId=${resourceId}`,
    monerate: {
      index: "/monerate",
      similarExpenses: "/monerate/similar-expenses",
    },
    relearn: {
      index: "/relearn",
      tag: "/relearn/tag",
      tagId: (tagId: number) => `/relearn/tag/${tagId}`,
    },
    questionsIndex: `/questions`,
    questionsDoc: (docId: number) => `/questions/doc/${docId}`,

    learningDiary: "/LearningDiary",
  },
  graphql: import.meta.env.VITE_API_URL + "graphql",
  api: {
    auth: {
      index: "/auth",
      login: "/auth/login",
      googleLogin: "/auth/google/login",
      keepTempUser: "/auth/keep-temp-user",
      resetPassword: "/auth/password-reset",
      authPasswordChange: "/auth/authenticated-password-change",
      username: "/auth/username",
      tempUser: "/auth/temp-user",
      userPreference: "/auth/user-preference",
    },
    register: "/auth/register",

    //TAGS
    saveTagLastOpenedAt: (tagId: number) => `/v2/tag/${tagId}/last-opened-at`,

    relearn: {
      resource: "/relearn/resource",
      resourceDuplicate: "/relearn/resource/duplicate",
      resourceMoveToTag: "/v2/resources/many/to-tag",
      deleteManyResources: "/v2/resources/many/delete",
      tag: "/relearn/tag",
    },
    // Skillbase
    skillbase: {
      label: "/v2/skillbase/label",
      labelId: (labelId: number) => `/v2/skillbase/label/${labelId}`,
      skillLabel: (skillId: number) => `/v2/skillbase/skill/${skillId}/label`,
      progressMonths: `/v2/skillbase/skill-progress/months`,
      progressFrom: (fromYearMonth: string) =>
        `/v2/skillbase/skill-progress?from=${fromYearMonth}`,

      index: "/skillbase",
      skill: "/skillbase/skill",
      tag: "/skillbase/tag",
      progress: "/skillbase/progress",
    },

    // DEFINE
    define: {
      doc: "define/doc",
      note: "define/note",
      updateManyNotes: "/define/note/many",
    },
    folders: "/playground/folders",
    folderId: (folderId: number) => "/playground/folders/" + folderId,
    files: "/playground/files",
    saveDocLastOpenedAt: (docId: number) =>
      `define/doc/${docId}/last-opened-at`,
    createManyNotesAtDoc: (docId: number) => `/define/doc/${docId}/notes/many`,
    clearEmptyNotes: (docId: number) => `define/doc/${docId}/clear-empty-notes`,
    docId: (docId: number) => `docs/${docId}`,

    user: {
      index: "/user",
      ratedResources: (username: string) =>
        "/user/" + username + "/rated-resources",
      userInfo: (username: string) => "/user/" + username + "/all",
      profile: "/user/profile",
      picture: "/user/picture",
      followingTags: (username: string) =>
        "/user/" + username + "/followingTags",
    },

    // UTILS
    resourcesSearch: (query: string) => `/search?q=${query}`,
    notesSearch: (query: string) => `/flashnotes/search?q=${query}`,
    linkPreview: (url: string) => `/v2/utils/link-preview?url=${url}`,
    userGotIt: "/got-it",

    feed: {
      myUserSuggestions: "v2/feed/my-user-suggestions",
      resources: "v2/feed/resources",
    },

    monerate: {
      similarExpenses: (value: number) =>
        `/expenses/similar-expenses?value=${value}`,
      expense: "/monerate/expense",
      place: "/monerate/place",
      category: "/monerate/category",
    },
    avgLearningPerHour: (hourOffset: number) =>
      `/avg-learning-per-hour?hourOffset=${hourOffset}`,

    utils: {
      passwordResetEmail: "/utils/passwordResetEmail",
      notifications: "/utils/notifications",
      notificationsSeeAll: "/utils/notifications/seeAll",
    },
  },
}
