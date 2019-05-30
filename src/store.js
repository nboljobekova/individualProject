import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from 'redux-thunk';
import { UsersReducer } from "./reducers/UsersReducer";
import { MedQuestionsReducer } from "./reducers/MedQuestionsReducer"; 
import { MedSystemsReducer } from "./reducers/MedSystemsReducer";
import { PsQuestionsReducer } from "./reducers/PsQuestionsReducer";
import { PsSystemsReducer } from "./reducers/PsSystemsReducer";

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