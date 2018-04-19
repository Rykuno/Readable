export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const UPDATE_POSTS = 'UPDATE_POSTS';
export const UPDATE_SORT_PARAM = 'UPDATE_SORT_PARAM';
export const VOTE_POST = 'VOTE_POST';
export const SET_CATEGORY = 'SET_CATEGORY';

export const updateCategories = categories => ({
  type: UPDATE_CATEGORIES,
  payload: categories
});

export const updatePosts = posts => ({
  type: UPDATE_POSTS,
  payload: posts
});

export const updateSortParam = sortBy => ({
  type: UPDATE_SORT_PARAM,
  payload: sortBy
});

export const votePost = (id, vote) => ({
  type: VOTE_POST,
  payload: {
    id,
    vote
  }
});

export const setCategory = category => ({
  type: SET_CATEGORY,
  payload: category
});
