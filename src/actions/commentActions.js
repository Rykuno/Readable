import * as ReadableAPI from '../utils/readableAPI';
import { DELETE_COMMENT, MODIFY_COMMENT } from './actionTypes';

export const deleteComment = id => dispatch => {
  ReadableAPI.deleteComment(id).then(() => {
    dispatch({
      type: DELETE_COMMENT,
      payload: id
    });
  });
};

export const modifyComment = (id, body) => dispatch => {
  ReadableAPI.modifyComment(id, body).then(data => {
    dispatch({
      type: MODIFY_COMMENT,
      payload: data
    });
  });
};
