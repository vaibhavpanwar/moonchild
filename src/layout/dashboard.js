import React, {useState, useRef} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import routes from './routes';
import Sidebar from '../components/Navbars/SideNavbar';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import {Container} from 'reactstrap';

const Admin = (props) => {
  const mainContent = useRef(null);
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
        return <Route path={prop.path} component={prop.component} key={key} />;
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
