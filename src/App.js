import React, {useEffect} from 'react';
import {createHashHistory} from 'history';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import {Offline, Online} from 'react-detect-offline';
import {isAuthenticated, headerSetup} from './services/auth';
import OfflinePage from './components/OfflinePage';
import LoginPage from './views/pages/login';
import {Provider} from 'react-redux';
import DashboardPage from './layout/dashboard';
import AppLoading from './components/app-loading';
import {configureStore} from './redux/store';
export const history = createHashHistory();
function App() {
  useEffect(() => {
    //axios headers
    headerSetup();
  }, []);
  return (
    <div>
      <Offline>
        <OfflinePage />
      </Offline>
      <Online>
        <Router history={history}>
          <Switch>
            <Route
              path="/login"
              render={(props) => (
                <Provider store={configureStore()}>
                  <LoginPage {...props} />{' '}
                </Provider>
              )}></Route>
            <Route
              path="/admin"
              render={(props) =>
                isAuthenticated() ? (
                  <Provider store={configureStore()}>
                    <DashboardPage {...props} />
                  </Provider>
                ) : (
                  <Redirect to="/login"></Redirect>
                )
              }></Route>
            <Route path="/">
              <AppLoading />
            </Route>
          </Switch>
        </Router>
      </Online>
    </div>
  );
}
export default App;
