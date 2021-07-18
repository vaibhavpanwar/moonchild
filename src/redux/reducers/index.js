import {combineReducers} from 'redux';
import auth from './auth';
import bannersReducer from './banners.reducer';
import categoriesReducer from './categories.reducer';
import subCategoriesReducer from './sub-categories.reducer';
import usersReducer from './users.reducer';
import contactUsReducer from './contactUs.reducer';
import questionsReducer from './questions.reducer';
import notificationsReducer from './notifications.reducer';
import countriesReducer from './countries.reducer';

const reducers = combineReducers({
  auth,
  bannersReducer,
  categoriesReducer,
  subCategoriesReducer,
  usersReducer,
  contactUsReducer,
  questionsReducer,
  notificationsReducer,
  countriesReducer,
});

export default reducers;
