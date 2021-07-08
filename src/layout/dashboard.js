import React, {useState, useRef} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import routes from './routes';
import Sidebar from '../components/Navbars/SideNavbar';
import AdminNavbar from '../components/Navbars/AdminNavbar';

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
          style={{marginLeft: '400px'}}
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
