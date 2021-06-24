import React, {useState, useRef} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import AdminNavbar from './navbar/main-navbar';
import routes from './routes';
import Sidebar from './sidebar/sidebar';
const Admin = (props) => {
  const mainPanelRef = useRef(null);
  const [state, setState] = useState({
    backgroundColor: 'white',
    activeColor: 'white',
    sidebarMini: false,
  });
  const handleMiniClick = () => {
    if (document.body.classList.contains('sidebar-mini')) {
      setState({...state, sidebarMini: false});
    } else {
      setState({...state, sidebarMini: true});
    }
    document.body.classList.toggle('sidebar-mini');
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="wrapper">
      <AdminNavbar {...props} handleMiniClick={handleMiniClick} />
      <div className="layout--new">
        <Sidebar
          {...props}
          routes={routes}
          bgColor={state.backgroundColor}
          activeColor={state.activeColor}
        />
        <div className="main-panel layout--new__panel" ref={mainPanelRef}>
          <Switch>
            {getRoutes(routes)}
            <Redirect to="/admin/dashboard" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Admin;
