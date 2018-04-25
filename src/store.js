import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import infoReducer from './reducers/infoReducer';

const store = createStore(
  combineReducers({ info: infoReducer }),
  {},
  applyMiddleware(logger, thunk)
);

export default store;
