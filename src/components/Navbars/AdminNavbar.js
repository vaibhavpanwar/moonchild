import React from 'react';
import {Link} from 'react-router-dom';
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const AdminNavbar = (props) => {
  const {t} = useTranslation();
  const history = useHistory();
  const getCurrentPage = () => props.location.pathname?.split('/')?.[2];
  const getCurrentSubPage = () => props.location.pathname?.split('/')?.[3];
  const getCurrentSubPageId = () => props.location.pathname?.split('/')?.[4];

  const navigationHandler = () => {
    history.push(`/admin/${getCurrentPage()}`);
  };

  const subNavigationHandler = () => {
    if (getCurrentSubPageId()) {
      history.push(
        `/admin/${getCurrentPage()}/${getCurrentSubPage()}/${getCurrentSubPageId()}`,
      );
    } else {
      history.push(`/admin/${getCurrentPage()}/${getCurrentSubPage()}`);
    }
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <div className="custom-breadcrumb">
            <p
              className={`breadcrumb-item-custom ${
                getCurrentSubPage() && 'disabled-breadcrumb '
              }`}
              onClick={navigationHandler}>
              {t(getCurrentPage()?.replaceAll('-', ' '))}
            </p>
            {getCurrentSubPage() && (
              <p
                className="breadcrumb-item-custom"
                onClick={subNavigationHandler}>
                {'> '}
                {t(getCurrentSubPage()?.replaceAll('-', ' '))}
              </p>
            )}
          </div>

          <Nav className="align-items-center d-none d-md-flex" navbar>
            {/* CUSTOM STYLES */}
            <UncontrolledDropdown nav>
              <DropdownToggle
                className="pr-0"
                style={{
                  backgroundColor: '#F7FAFC',
                  padding: '10px',
                  borderRadius: '31px',
                  boxShadow: '0px 3px 6px #1717172D;',
                }}
                nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        require('../../assets/img/theme/team-4-800x800.jpg')
                          .default
                      }
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    {/* CUSTOM STYLES */}
                    <span
                      className="mb-0 text-sm font-weight-bold"
                      style={{color: '#4D4F5C'}}>
                      Jessica Jones
                    </span>
                    <span
                      className="mb-0 text-sm font-weight-bold"
                      style={{
                        color: '#4D4F5C',
                        marginRight: '10px',
                        display: 'inline-block',
                        paddingBottom: '4px',

                        transform: 'rotate(+90deg)',
                      }}>
                      &nbsp; &nbsp;{'>'} &nbsp; &nbsp;
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
