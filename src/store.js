import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import categoryReducer from './reducers/categoryReducer';
import postReducer from './reducers/postReducer';
import commentReducer from './reducers/commentReducer';

const store = createStore(
  combineReducers({
    posts: postReducer,
    comments: commentReducer,
    categories: categoryReducer
  }),
  {},
  applyMiddleware(logger, thunk)
);

export default store;
