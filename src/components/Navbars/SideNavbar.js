import React, {useState} from 'react';

import logoImage from '../../assets/images/logo_primary.png';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../services/auth';
// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap';
import routes from '../../layout/routes/index';
import {getImageUrl} from '../../utils/renderImage';
import {useTranslation} from 'react-i18next';
import {getPendingRequestsNumber} from '../../utils/dataHelpers';

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const dispatch = useDispatch();
  const {contacts} = useSelector((state) => state.contactUsReducer);
  const {t, i18n} = useTranslation();
  const lang = i18n.language;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1;
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  const navigateTo = (route) => props.history.push(route);

  // // closes the collapse
  // const closeCollapse = () => {
  //   setCollapseOpen(false);
  // };

  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((item, key) => {
      return (
        //CUSTOME STYLE HERE
        item?.sideBar && (
          <div
            key={key}
            onClick={() => navigateTo(item.path)}
            className={`nav-links-wrapper ${
              activeRoute(item.path) && 'nav-links-active'
            }`}>
            <span className={item.icon} />
            <p>{t(item.name)}</p>
            {item.name === 'contactUs' &&
              getPendingRequestsNumber(contacts) >= 1 && (
                <span
                  className={`${
                    activeRoute(item.path) ? 'counter-active' : 'counter'
                  }`}>
                  {getPendingRequestsNumber(contacts) > 10
                    ? '10+'
                    : getPendingRequestsNumber(contacts)}
                </span>
              )}
          </div>
        )
      );
    });
  };

  return (
    // CUSTOM STYLE HERE
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      style={{
        minWidth: '300px',
      }}
      id="sidenav-main">
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}>
          <span className="navbar-toggler-icon" />
          {/* {mobike hamburger change here} */}
        </button>
        {/* Brand */}

        <NavbarBrand className="pt-0">
          <div style={{marginTop: '30px'}} />
          <img
            alt="logo"
            src={logoImage}
            className="web-logo-custom"
            style={{cursor: 'pointer'}}
            onClick={() => navigateTo('/admin/dashboard')}
          />
          {/* change logo here */}
        </NavbarBrand>

        {/* User */}
        <Nav className="align-items-center d-md-none">
          {/* <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right>
              MOBILE NOTIFICATION BELL HERE
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={getImageUrl(
                      localStorage?.getItem('@gulf-worker-uni/image'),
                      50,
                      50,
                    )}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">
                  {' '}
                  {localStorage?.getItem('@gulf-worker-uni/name')}
                </h6>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({type: 'LOGOUT'});
                  logout();
                }}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
              <DropdownItem
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  if (lang === 'en') {
                    i18n.changeLanguage('ar');
                  } else {
                    i18n.changeLanguage('en');
                  }
                }}>
                <i className="ni ni-user-run" />

                <span> {lang === 'ar' ? 'English' : 'العربية'}</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-brand" xs="6">
                <img
                  src={logoImage}
                  alt="logo"
                  style={{cursor: 'pointer'}}
                  onClick={() => navigateTo('/admin/dashboard')}
                />
              </Col>

              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}>
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>

          <Nav navbar>{createLinks(routes)}</Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
