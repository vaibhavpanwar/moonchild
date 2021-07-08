import {bannersConstants} from '../constants';

const bannersReducer = (state = {banners: []}, action) => {
  switch (action.type) {
    case bannersConstants.BANNER_LOADING:
      return {...state, loading: true};
    case bannersConstants.BANNER_LIST_SUCCESS:
      return {...state, loading: false, error: null, banners: action.payload};
    case bannersConstants.BANNER_ERROR:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};

export default bannersReducer;
