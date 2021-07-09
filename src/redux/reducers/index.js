import {combineReducers} from 'redux';
import auth from './auth';
import bannersReducer from './banners.reducer';
import categoriesReducer from './categories.reducer';

const reducers = combineReducers({
  auth,
  bannersReducer,
  categoriesReducer,
});

export default reducers;
