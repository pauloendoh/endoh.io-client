// PE 3/3 
const API = {
    auth: {
        index: '/auth', 
        google: '/auth/google',
        googleLogin: '/auth/google/login', 
        resetPassword: '/auth/password-reset', 
        authPasswordChange: '/auth/authenticated-password-change',
        username: '/auth/username',
    },
    monerate: {
        expense: '/monerate/expense',
        place: '/monerate/place',
        category: '/monerate/category',

    },
    relearn: {
        resource: '/relearn/resource',
        tag: '/relearn/tag',
    }, 
    utils: {
        linkPreview: '/utils/link-preview',
        passwordResetEmail: "/utils/passwordResetEmail",
    }
}

export default API