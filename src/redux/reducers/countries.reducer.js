import {countriesConstants} from '../constants';

const countriesReducer = (state = {countries: [], country: {}}, action) => {
  switch (action.type) {
    case countriesConstants.COUNTRY_LOADING:
      return {...state, loading: true};

    case countriesConstants.COUNTRY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        countries: action.payload.listing,
        count: action.payload.count,
      };

    case countriesConstants.COUNTRY_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        countries: [action.payload, ...state.countries],
      };

    case countriesConstants.COUNTRY_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        countries: state.countries.filter((i) => i?._id !== action.payload),
      };
    case countriesConstants.COUNTRY_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        countries: state.countries.map((item) =>
          item._id === action.payload?._id ? action.payload : item,
        ),
      };

    case countriesConstants.COUNTRY_GET_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        country: action.payload,
      };
    case countriesConstants.COUNTRY_RESET_SINGLE:
      return {
        ...state,

        country: {},
      };

    case countriesConstants.COUNTRY_ERROR:
      return {...state, loading: false, error: action.payload};
    case 'LOGOUT':
      return {
        ...state,
        countries: [],
        country: {},
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default countriesReducer;
