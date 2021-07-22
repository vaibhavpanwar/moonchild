import {dashboardConstants} from '../constants';

const dashboardReducer = (state = {dashboard: {}}, action) => {
  switch (action.type) {
    case dashboardConstants.DASHBOARD_LOADING:
      return {...state, loading: true};

    case dashboardConstants.DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        dashboard: action.payload,
      };

    case dashboardConstants.DASHBOARD_ERROR:
      return {...state, loading: false, error: action.payload};

    case 'LOGOUT':
      return {
        ...state,

        dashboardData: {},
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
