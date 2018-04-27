import * as ReadableAPI from '../utils/readableAPI';
import { UPDATE_CATEGORIES, SET_CATEGORY } from './actionTypes';

export const updateCategories = () => dispatch => {
  ReadableAPI.getAllCategories().then(data => {
    dispatch({
      type: UPDATE_CATEGORIES,
      payload: data
    });
  });
};

export const setCategory = category => ({
  type: SET_CATEGORY,
  payload: category
});
