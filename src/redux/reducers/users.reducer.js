import {usersConstants} from '../constants';

const usersReducer = (state = {users: [], user: {}}, action) => {
  switch (action.type) {
    case usersConstants.USER_LOADING:
      return {...state, loading: true};

    case usersConstants.USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: action.payload.listing,
        count: action.payload.count,
      };

    case usersConstants.USER_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: [action.payload, ...state.users],
      };

    case usersConstants.USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: state.users.filter((i) => i?._id !== action.payload),
      };
    case usersConstants.USER_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: state.users.map((item) =>
          item._id === action.payload?._id ? action.payload : item,
        ),
      };

    case usersConstants.USER_GET_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case usersConstants.USER_RESET_SINGLE:
      return {
        ...state,

        user: {},
      };

    case usersConstants.USER_ERROR:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};

export default usersReducer;
