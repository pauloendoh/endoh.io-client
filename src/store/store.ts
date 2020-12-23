import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux'
import thunk from 'redux-thunk';
import authReducer from './auth/authReducer'
import { AuthState } from './auth/authTypes'
import monerateReducer from './monerate/monerateReducer';
import { MonerateState } from './monerate/monerateTypes';
import { RelearnState } from './relearn/relearnTypes';
import relearnReducer from './relearn/relearnReducer'
import { UtilsState } from './utils/utilsTypes';
import utilsReducer from './utils/utilsReducer';


export interface ApplicationState {
    auth: AuthState,
    monerate: MonerateState,
    relearn: RelearnState,
    utils: UtilsState
}

const rootReducer = combineReducers({
    auth: authReducer,
    monerate: monerateReducer,
    relearn: relearnReducer,
    utils: utilsReducer
})

const composeEnhancers =
    ((window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

const store: Store<ApplicationState> =
    createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
