import {adsConstants} from '../constants';

const adsReducer = (state = {ads: [], ad: {}}, action) => {
  switch (action.type) {
    case adsConstants.AD_LOADING:
      return {...state, loading: true};

    case adsConstants.AD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ads: action.payload.listing,
        count: action.payload.count,
      };

    case adsConstants.AD_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ads: [action.payload, ...state.ads],
      };

    case adsConstants.AD_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ads: state.ads.filter((i) => i?._id !== action.payload),
      };
    case adsConstants.AD_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ads: state.ads.map((item) =>
          item._id === action.payload?._id ? action.payload : item,
        ),
      };

    case adsConstants.AD_GET_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ad: action.payload,
      };
    case adsConstants.AD_RESET_SINGLE:
      return {
        ...state,

        ad: {},
      };
    case 'LOGOUT':
      return {
        ...state,
        ads: [],
        ad: {},
        loading: false,
        error: null,
      };

    case adsConstants.AD_ERROR:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};

export default adsReducer;
