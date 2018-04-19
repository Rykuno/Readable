import {
  UPDATE_CATEGORIES,
  UPDATE_POSTS,
  UPDATE_SORT_PARAM,
  VOTE_POST,
  SET_CATEGORY
} from '../actions/infoActions';

const sortPostsBy = (sortBy, posts) => {
  switch (sortBy) {
    case 'mostRecent':
      return posts.slice().sort((a, b) => a.timestamp < b.timestamp);
    case 'votes':
      return posts.slice().sort((a, b) => a.voteScore < b.voteScore);
    default:
      break;
  }
};

const initialState = {
  categories: [],
  posts: [],
  sortBy: 'mostRecent',
  searchCategory: ''
};

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case UPDATE_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case UPDATE_SORT_PARAM:
      return {
        ...state,
        sortBy: action.payload,
        posts: sortPostsBy(action.payload, state.posts)
      };
    case VOTE_POST:
      return {
        ...state,
        posts: state.posts.slice().map(obj => {
          if (obj.id === action.payload.id) {
            obj.voteScore =
              action.payload.vote === 'upVote' ? obj.voteScore + 1 : obj.voteScore - 1;
          }
          return obj;
        })
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

export default infoReducer;
