import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import { Link, useHistory } from 'react-router-dom';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import Routes from './Routes';
import { UserContext } from './Features/Authentication/useAuth';
import { loggedIn, logout, getMember } from './Features/Authentication/Auth';
import logo from './assets/secretsantalogo_transparent_small.png';

const MainNavigation = ({ handleLogout, user }) => {
  const dropDownMainTitle =
    user && user.memberName ? user.memberName : 'Santas Secret App';

  const isLoggedIn = user && user.memberName && (
    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
  );

  const isAdmin = user && user.memberName && user.admin && (
    <Dropdown.Item as={Link} to="/admin">
      Admin
    </Dropdown.Item>
  );

  return (
    <div>
      <Menu className="nav-main top-nav" secondary>
        <Menu.Item>
          <Image src={logo} size="mini" />
        </Menu.Item>
        <Menu.Menu position="right" className="top-nav__right-menu">
          <Dropdown
            item
            className="toUpperCase menu-style top-nav__dropdown"
            text={dropDownMainTitle}
            data-testid="main-user-nav"
          >
            <Dropdown.Menu>
              {isLoggedIn}
              {isAdmin}
              <Dropdown item text="Policies">
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/privacy">
                    Privacy
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/terms">
                    Terms
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

const AppContainer = () => {
  const { user, dispatch } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    // SET_USER if global state does not exist but user is loggedIn
    if (!user && loggedIn()) {
      dispatch({
        type: 'SET_USER',
        user: { ...getMember() },
      });
    }
  }, [dispatch, user]);

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    dispatch({
      type: 'REMOVE_USER',
    });
    history.push('/');
  };

  return (
    <Container>
      <MainNavigation handleLogout={handleLogout} user={user} />
      <div className="App main-container">
        <Routes />
      </div>
    </Container>
  );
};

MainNavigation.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    memberName: PropTypes.string,
    admin: PropTypes.bool,
  }),
};

MainNavigation.defaultProps = { user: PropTypes.shape({}) };

export default AppContainer;
