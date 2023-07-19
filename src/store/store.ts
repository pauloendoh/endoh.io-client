import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from "redux"
import thunk from "redux-thunk"
export interface ApplicationState {}

const rootReducer = combineReducers({})

const composeEnhancers =
  ((window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) ||
  compose

const store: Store<ApplicationState> = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

export default store
