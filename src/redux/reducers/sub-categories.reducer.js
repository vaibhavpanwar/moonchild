import {subCategoriesConstants} from '../constants';

const subCategoriesReducer = (
  state = {subCategories: [], subCategory: {}},
  action,
) => {
  switch (action.type) {
    case subCategoriesConstants.SUB_CATEGORY_LOADING:
      return {...state, loading: true};

    case subCategoriesConstants.SUB_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        subCategories: action.payload,
      };

    case subCategoriesConstants.SUB_CATEGORY_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        subCategories: [action.payload, ...state.subCategories],
      };

    case subCategoriesConstants.SUB_CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        subCategories: state.subCategories.filter(
          (i) => i?._id !== action.payload,
        ),
      };
    case subCategoriesConstants.SUB_CATEGORY_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        subCategories: state.subCategories.map((item) =>
          item._id === action.payload?._id ? action.payload : item,
        ),
      };

    case subCategoriesConstants.SUB_CATEGORY_GET_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        subCategory: action.payload,
      };
    case subCategoriesConstants.SUB_CATEGORY_RESET_SINGLE:
      return {
        ...state,

        subCategory: {},
      };

    case subCategoriesConstants.SUB_CATEGORY_ERROR:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};

export default subCategoriesReducer;
