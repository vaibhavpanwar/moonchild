/**
 * Created by rf1804
 *
 * @format
 */

import {langConstants} from '../constants';

const initialState = {
  lang: 'ar',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case langConstants.APP_LANG:
      return {
        ...state,
        lang: action.lang,
      };
    default:
      return state;
  }
};

export default user;
