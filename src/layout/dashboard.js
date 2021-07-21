import React, {useState, useRef, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import I18n from 'i18n-js';
import routes from './routes/index';
import Sidebar from '../components/Navbars/SideNavbar';
import AdminNavbar from '../components/Navbars/AdminNavbar';

import {setLanguage} from '../redux/actions/lang.actions';
import {useTranslation} from 'react-i18next';

const Admin = (props) => {
  const {i18n} = useTranslation();

  const mainContent = useRef(null);
  const [state] = useState({
    backgroundColor: 'white',
    activeColor: 'white',
    sidebarMini: false,
  });

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === '/admin') {
        return (
          <Route exact path={prop.path} component={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  // const changeLang = (lan) => {
  //   console.log('jaja');
  //   i18n.changeLanguage(lan);
  // };

  return (
    <>
      <div className="layout--new">
        <Sidebar
          {...props}
          routes={routes}
          bgColor={state.backgroundColor}
          activeColor={state.activeColor}
        />
        <div
          className="main-content"
          style={{marginLeft: '340px', marginRight: '60px'}}
          ref={mainContent}>
          <AdminNavbar {...props} />

          <Switch>
            {getRoutes(routes)}

            <Redirect from="*" to="/admin/dashboard" />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Admin;
