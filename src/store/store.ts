import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth/authReducer';
import { AuthState } from './auth/authTypes';
import { FeedState } from './feed/feedTypes';
import monerateReducer from './monerate/monerateReducer';
import { MonerateState } from './monerate/monerateTypes';
import profileReducer from './profile/profileReducer';
import feedReducer from './feed/feedReducer';
import { ProfileState } from './profile/profileTypes';
import relearnReducer from './relearn/relearnReducer';
import { RelearnState } from './relearn/relearnTypes';
import skillbaseReducer from './skillbase/skillbaseReducer';
import { SkillbaseState } from './skillbase/skillbaseTypes';
import utilsReducer from './utils/utilsReducer';
import { UtilsState } from './utils/utilsTypes';
export interface ApplicationState {
    auth: AuthState,
    monerate: MonerateState,
    relearn: RelearnState,
    skillbase: SkillbaseState,
    utils: UtilsState,

    profile: ProfileState,
    feed: FeedState,
}

const rootReducer = combineReducers({
    auth: authReducer,
    monerate: monerateReducer,
    relearn: relearnReducer,
    skillbase: skillbaseReducer,
    utils: utilsReducer,

    profile: profileReducer,
    feed: feedReducer,
})

const composeEnhancers =
    ((window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

const store: Store<ApplicationState> =
    createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
