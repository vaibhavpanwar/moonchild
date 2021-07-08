import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

let store = undefined;
export function configureStore() {
  const middlewares = [thunkMiddleware];
  if (store) {
    return store;
  }
  store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  return store;
}
