import {notificationsConstants} from '../constants';

const notificationsReducer = (
  state = {notifications: [], notification: {}},
  action,
) => {
  switch (action.type) {
    case notificationsConstants.NOTIFICATION_LOADING:
      return {...state, loading: true};

    case notificationsConstants.NOTIFICATION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        notifications: action.payload.listing,
        count: action.payload.count,
      };

    case notificationsConstants.NOTIFICATION_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        notifications: [action.payload, ...state.notifications],
      };

    case notificationsConstants.NOTIFICATION_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        notifications: state.notifications.filter(
          (i) => i?._id !== action.payload,
        ),
      };
    case notificationsConstants.NOTIFICATION_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        notifications: state.notifications.map((item) =>
          item._id === action.payload?._id ? action.payload : item,
        ),
      };

    case notificationsConstants.NOTIFICATION_GET_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        notification: action.payload,
      };
    case notificationsConstants.NOTIFICATION_RESET_SINGLE:
      return {
        ...state,

        notification: {},
      };

    case notificationsConstants.NOTIFICATION_ERROR:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};

export default notificationsReducer;
