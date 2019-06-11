import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
// import thunk from 'redux-thunk';
import { UsersReducer } from "./reducers/UsersReducer";
import { MedQuestionsReducer } from "./reducers/MedQuestionsReducer"; 
import { MedSystemsReducer } from "./reducers/MedSystemsReducer";

import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory} from "history";
import {routerMiddleware } from "react-router-redux";

const rootReducer = combineReducers({
  users: UsersReducer,
  medQuestions: MedQuestionsReducer,
  medSystems: MedSystemsReducer,
});

export const history = createBrowserHistory();


const middleware = [
  thunkMiddleware,
  routerMiddleware(history)
];


const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const enhancers = composeEnhancers(applyMiddleware(...middleware));

// const persistedState = loadState();

// const store = createStore(rootReducer, persistedState, enhancers);


const logger_middleware = createLogger();

const store = createStore(rootReducer, compose(
  applyMiddleware(thunkMiddleware),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(logger_middleware),
  enhancers
))

export default store;