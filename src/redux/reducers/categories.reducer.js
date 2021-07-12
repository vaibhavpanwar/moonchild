import {categoriesConstants} from '../constants';

const categoriesReducer = (state = {categories: [], category: {}}, action) => {
  switch (action.type) {
    case categoriesConstants.CATEGORY_LOADING:
      return {...state, loading: true};

    case categoriesConstants.CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: action.payload,
      };

    case categoriesConstants.CATEGORY_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: [action.payload, ...state.categories],
      };

    case categoriesConstants.CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: state.categories.filter((i) => i?._id !== action.payload),
      };
    case categoriesConstants.CATEGORY_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: state.categories.map((item) =>
          item._id === action.payload?._id ? action.payload : item,
        ),
      };

    case categoriesConstants.CATEGORY_GET_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        category: action.payload,
      };
    case categoriesConstants.CATEGORY_RESET_SINGLE:
      return {
        ...state,
        loading: false,
        category: {},
      };

    case categoriesConstants.CATEGORY_ERROR:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};

export default categoriesReducer;
