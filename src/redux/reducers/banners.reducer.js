import {bannersConstants} from '../constants';

const bannersReducer = (state = {banners: [], banner: {}}, action) => {
  switch (action.type) {
    case bannersConstants.BANNER_LOADING:
      return {...state, loading: true};

    case bannersConstants.BANNER_LIST_SUCCESS:
      return {...state, loading: false, error: null, banners: action.payload};

    case bannersConstants.BANNER_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        banners: [action.payload, ...state.banners],
      };

    case bannersConstants.BANNER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        banners: state.banners.filter((i) => i?._id !== action.payload),
      };
    case bannersConstants.BANNER_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        banners: state.banners.map((item) =>
          item._id === action.payload?._id ? action.payload : item,
        ),
      };

    case bannersConstants.BANNER_GET_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        banner: action.payload,
      };
    case bannersConstants.BANNER_RESET_SINGLE:
      return {
        ...state,

        banner: {},
      };

    case bannersConstants.BANNER_ERROR:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};

export default bannersReducer;
