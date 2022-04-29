import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from "redux";
import thunk from "redux-thunk";
import monerateReducer from "./monerate/monerateReducer";
import { MonerateState } from "./monerate/monerateTypes";
import relearnReducer from "./relearn/relearnReducer";
import { RelearnState } from "./relearn/relearnTypes";
export interface ApplicationState {
  monerate: MonerateState;
  relearn: RelearnState;
}

const rootReducer = combineReducers({
  monerate: monerateReducer,
  relearn: relearnReducer,
});

const composeEnhancers =
  ((window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) ||
  compose;

const store: Store<ApplicationState> = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
