import React, { useContext, useEffect } from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Routes from './Routes';
import { Link } from 'react-router-dom';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import { UserContext } from './Features/Authentication/useAuth';
import { loggedIn, logout, getMember } from './Features/Authentication/Auth';

const MainNavigation = ({ handleLogout, user }) => (
    <div>
    {
      user && user.memberName
      &&
      <Menu className='nav-main' inverted secondary>
        <Menu.Menu position='right'>
        <Dropdown item className="toUpperCase" text={user.memberName}>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                { user.admin && <Dropdown.Item as={Link} to='/admin'>Admin</Dropdown.Item> }
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
    }
    </div>
  );

const AppContainer = (props) => {
  const { user, dispatch } = useContext(UserContext);

  useEffect(() => {
    // SET_USER if global state does not exist but user is loggedIn
    if (!user && loggedIn()) {
      dispatch({
        type: 'SET_USER',
        user: { ...getMember() }
      });
    }
  }, [dispatch, user]);

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    dispatch({
      type: 'REMOVE_USER'
    });
  };

  return (
    <Container>
      <MainNavigation handleLogout={handleLogout} user={user} />
      <div className="App main-container">
        <Routes />
      </div>
    </Container>
  )
};

  export default AppContainer;