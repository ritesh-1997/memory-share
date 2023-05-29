/**
 * What actions/reducers we have to do with the post after
 * client performs its work
 *
 */
import {
  FETCH_ALL,
  FETCH_POST,
  CREATE,
  DELETE,
  LIKE,
  UPDATE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  COMMENT,
  PROFILE,
  CONFIG,
} from "../constants/actionTypes";

export default (state = { isLoading: true, posts: [] }, action) => {
  console.log(action.payload?.key);
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_POST:
      return { ...state, post: action.payload.post };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          // change the post that just received a comment.
          if (post._id === action.payload._id) {
            return action.payload;
          }
          // otherwise, return the post
          return post;
        }),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case PROFILE:
      return {
        ...state,
        posts: action.payload.post,
      };
    case CONFIG:
      return { ...state, key: action.payload.key };
    default:
      return state;
  }
};
