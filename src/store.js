import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import infoReducer from './reducers/infoReducer';

const store = createStore(combineReducers({ info: infoReducer }), {}, applyMiddleware(logger));

export default store;
