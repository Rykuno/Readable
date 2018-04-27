import { DELETE_COMMENT, MODIFY_COMMENT } from '../actions/actionTypes';

const initialState = {};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_COMMENT:
      return state;
    case MODIFY_COMMENT:
      return state;
    default:
      return state;
  }
};

export default commentReducer;
