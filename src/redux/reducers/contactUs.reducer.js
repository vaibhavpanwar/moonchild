import {contactUsConstants} from '../constants';

const contactUsReducers = (state = {contacts: [], contact: {}}, action) => {
  switch (action.type) {
    case contactUsConstants.CONTACT_US_LOADING:
      return {...state, loading: true};

    case contactUsConstants.CONTACT_US_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        contacts: action.payload.listing,
        count: action.payload.count,
      };

    case contactUsConstants.CONTACT_US_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        contacts: [action.payload, ...state.contacts],
      };

    case contactUsConstants.CONTACT_US_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        contacts: state.contacts.filter((i) => i?._id !== action.payload),
      };
    case contactUsConstants.CONTACT_US_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        contacts: state.contacts.map((item) =>
          item._id === action.payload?._id ? action.payload : item,
        ),
      };

    case contactUsConstants.CONTACT_US_GET_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        contact: action.payload,
      };
    case contactUsConstants.CONTACT_US_RESET_SINGLE:
      return {
        ...state,

        contact: {},
      };

    case contactUsConstants.CONTACT_US_ERROR:
      return {...state, loading: false, error: action.payload};
    case 'LOGOUT':
      return {
        ...state,
        contacts: [],
        contact: {},
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default contactUsReducers;
