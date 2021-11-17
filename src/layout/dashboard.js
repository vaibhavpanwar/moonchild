import React, {useState, useRef, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import routes from './routes/index';
import Sidebar from '../components/Navbars/SideNavbar';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import {useDispatch} from 'react-redux';
import {listContactUs} from '../redux/actions/contactUs.actions';

const Admin = (props) => {
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listContactUs());
  }, [dispatch]);

  return (
    <>
      <div className="layout--new">
        <Sidebar
          {...props}
          routes={routes}
          bgColor={state.backgroundColor}
          activeColor={state.activeColor}
        />
        <div className="main-content" ref={mainContent}>
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
