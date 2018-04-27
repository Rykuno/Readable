import { UPDATE_CATEGORIES, SET_CATEGORY } from '../actions/actionTypes';

const initialState = {
  categories: [],
  searchCategory: ''
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case SET_CATEGORY:
      return {
        ...state,
        searchCategory: action.payload
      };
    default:
      return state;
  }
};

export default categoryReducer;
