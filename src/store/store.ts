import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth/authReducer';
import { AuthState } from './auth/authTypes';
import monerateReducer from './monerate/monerateReducer';
import { MonerateState } from './monerate/monerateTypes';
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
    utils: UtilsState
}

const rootReducer = combineReducers({
    auth: authReducer,
    monerate: monerateReducer,
    relearn: relearnReducer,
    skillbase: skillbaseReducer,
    utils: utilsReducer
})

const composeEnhancers =
    ((window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

const store: Store<ApplicationState> =
    createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
