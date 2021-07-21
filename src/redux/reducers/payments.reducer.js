import {paymentsConstants} from '../constants';

const paymentsReducer = (state = {payments: [], payment: {}}, action) => {
  switch (action.type) {
    case paymentsConstants.PAYMENT_LOADING:
      return {...state, loading: true};

    case paymentsConstants.PAYMENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        payments: action.payload.listing,
        count: action.payload.count,
      };

    case paymentsConstants.PAYMENT_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        payments: [action.payload, ...state.payments],
      };

    case paymentsConstants.PAYMENT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        payments: state.payments.filter((i) => i?._id !== action.payload),
      };
    case paymentsConstants.PAYMENT_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        payments: state.payments.map((item) =>
          item._id === action.payload?._id ? action.payload : item,
        ),
      };

    case paymentsConstants.PAYMENT_GET_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        payment: action.payload,
      };
    case paymentsConstants.PAYMENT_RESET_SINGLE:
      return {
        ...state,

        payment: {},
      };

    case paymentsConstants.PAYMENT_ERROR:
      return {...state, loading: false, error: action.payload};

    case 'LOGOUT':
      return {
        ...state,
        payments: [],
        payment: {},
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default paymentsReducer;
