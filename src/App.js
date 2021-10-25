import React, {useEffect, Suspense} from 'react';
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
import {useTranslation} from 'react-i18next';
import {useClearCache} from 'react-clear-cache';

export const history = createHashHistory();
function App() {
  const {i18n} = useTranslation();

  //cache clear
  const {isLatestVersion, emptyCacheStorage} = useClearCache();
  useEffect(() => {
    console.log(isLatestVersion, 'isLatestVersion');
    if (!isLatestVersion) {
      emptyCacheStorage();
    }
  });

  useEffect(() => {
    //axios headers
    headerSetup();
    const savedLang = localStorage.getItem('@gulf-worker-uni/lang');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    } else {
      i18n.language = 'en';
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('@gulf-worker-uni/lang', i18n.language);
  }, [i18n.language]);

  const lang = i18n.language;

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <div className={`${lang === 'ar' ? 'mirrored' : ''}`}>
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
    </Suspense>
  );
}
export default App;
