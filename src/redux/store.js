import {createStore} from 'redux';
import reducers from './reducers';
let store = undefined;
export function configureStore() {
  if (store) {
    return store;
  }
  store = createStore(reducers);
  return store;
}
