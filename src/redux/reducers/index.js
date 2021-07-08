import {combineReducers} from 'redux';
import auth from './auth';
import bannersReducer from './banners.reducer';

const reducers = combineReducers({
  auth,
  bannersReducer,
});

export default reducers;
