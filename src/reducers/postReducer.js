import {
  UPDATE_POSTS,
  VOTE_POST,
  MODIFY_POST,
  DELETE_POST,
  CREATE_POST,
  UPDATE_SORT_PARAM
} from '../actions/actionTypes';

const initialState = {
  posts: [],
  sortBy: 'mostRecent'
};

const sortPostsBy = (sortBy, posts) => {
  switch (sortBy) {
    case 'mostRecent':
      return posts.slice().sort((a, b) => a.timestamp < b.timestamp);
    case 'votes':
      return posts.slice().sort((a, b) => a.voteScore < b.voteScore);
    default:
      return posts;
  }
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POSTS:
      return {
        ...state,
        posts: action.payload
          .slice()
          .filter(obj => obj.deleted === false)
          .reverse()
      };
    case UPDATE_SORT_PARAM:
      return {
        ...state,
        sortBy: action.payload,
        posts: sortPostsBy(action.payload, state.posts)
      };
    case MODIFY_POST:
      return {
        ...state,
        posts: state.posts.slice().map(obj => {
          const { id, body, title } = action.payload;
          if (obj.id === id) {
            const newObj = { ...obj };
            newObj.body = body;
            newObj.title = title;
            return newObj;
          }
          return obj;
        })
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.slice().filter(obj => obj.id !== action.payload)
      };

    case CREATE_POST:
      return {
        ...state,
        posts:
          state.sortBy === 'mostRecent'
            ? [action.payload, ...state.posts]
            : [...state.posts, action.payload]
      };
    case VOTE_POST:
      return {
        ...state,
        posts: state.posts.slice().map(obj => {
          if (obj.id === action.payload.id) {
            const newObj = { ...obj };
            newObj.voteScore =
              action.payload.vote === 'upVote' ? obj.voteScore + 1 : obj.voteScore - 1;
            return newObj;
          }
          return obj;
        })
      };
    default:
      return state;
  }
};

export default postReducer;

