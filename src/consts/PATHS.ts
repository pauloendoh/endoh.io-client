// PE 3/3
const PATHS = {
    index: '/',
    monerate: {
        index: '/monerate'
    },
    relearn: {
        index: '/relearn',
        tag: '/relearn/tag',
    },
    skillbase: {
        index: '/skillbase',
        list: '/skillbase/tag',
        untagged: '/skillbase/untagged'
    },
    settings: {
        account: "/settings/account",
        monerate: {
            index: '/settings/monerate',
            places: '/settings/monerate/places',
            categories: '/settings/monerate/categories',
        }
    },
    feed: {
        index: '/feed',
    },
    user: {
        index: (username: string) => `/user/${username}`,
        tag: (username: string, listId: number) => `/user/${username}/tag/${listId}`


    }
}

export default PATHS