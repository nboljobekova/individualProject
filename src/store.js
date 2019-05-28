import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from 'redux-thunk';
import { UsersReducer, MedQuestionsReducer, MedSystemsReducer, PsQuestionsReducer, PsSystemsReducer } from "./reducers"

const rootReducer = combineReducers({
  users: UsersReducer,
  medQuestions: MedQuestionsReducer,
  medSystems: MedSystemsReducer,
  psQuestions: PsQuestionsReducer,
  psSystems: PsSystemsReducer
});

const logger_middleware = createLogger();

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(logger_middleware)
))

export default store;