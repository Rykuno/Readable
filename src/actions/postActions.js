import * as ReadableAPI from '../utils/readableAPI';
import {
  UPDATE_POSTS,
  VOTE_POST,
  MODIFY_POST,
  DELETE_POST,
  CREATE_POST,
  UPDATE_SORT_PARAM
} from './actionTypes';

export const updatePosts = () => dispatch => {
  ReadableAPI.getAllPosts().then(data => {
    dispatch({
      type: UPDATE_POSTS,
      payload: data
    });
  });
};

export const votePost = (id, vote) => dispatch => {
  ReadableAPI.vote(id, vote).then(() => {
    dispatch({
      type: VOTE_POST,
      payload: {
        id,
        vote
      }
    });
  });
};

export const updateSortParam = sortBy => ({
  type: UPDATE_SORT_PARAM,
  payload: sortBy
});

export const modifyPost = ({ id, title, body }) => dispatch => {
  ReadableAPI.modifyPost(id, title, body).then(() => {
    dispatch({
      type: MODIFY_POST,
      payload: { id, title, body }
    });
  });
};

export const deletePost = id => dispatch => {
  ReadableAPI.deletePost(id).then(() => {
    dispatch({
      type: DELETE_POST,
      payload: id
    });
  });
};

export const createPost = ({
  title, body, author, category
}) => dispatch => {
  ReadableAPI.createPost(title, body, author, category).then(post => {
    dispatch({
      type: CREATE_POST,
      payload: post
    });
  });
};
