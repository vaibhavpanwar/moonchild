import {combineReducers} from 'redux';
import auth from './auth';
import bannersReducer from './banners.reducer';
import categoriesReducer from './categories.reducer';
import subCategoriesReducer from './sub-categories.reducer';
import usersReducer from './users.reducer';

const reducers = combineReducers({
  auth,
  bannersReducer,
  categoriesReducer,
  subCategoriesReducer,
  usersReducer,
});

export default reducers;
