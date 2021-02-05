// PE 3/3 
const API = {
    auth: {
        index: '/auth', 
        google: '/auth/google',
        googleLogin: '/auth/google/login', 
        resetPassword: '/auth/password-reset', 
        authPasswordChange: '/auth/authenticated-password-change',
        username: '/auth/username',
        tempUser: '/auth/temp-user',
        userPreference: '/auth/user-preference',
    },
    monerate: {
        expense: '/monerate/expense',
        place: '/monerate/place',
        category: '/monerate/category',

    },
    relearn: {
        resource: '/relearn/resource',
        resourceDuplicate: '/relearn/resource/duplicate',
        tag: '/relearn/tag',
    }, 
    skillbase: {
        index: '/skillbase', 
        skill: '/skillbase/skill', 
        tag: '/skillbase/tag', 
        progress: '/skillbase/progress', 
    },
    utils: {
        linkPreview: '/utils/link-preview',
        passwordResetEmail: "/utils/passwordResetEmail",
    }, 

    user: {
        index: '/user', 
        ratedResources: (username: string) => '/user/' + username + '/rated-resources'
    }
}

export default API