import React, { useContext, useEffect } from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Routes from './Routes';
import { Link, useHistory  } from 'react-router-dom';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import { UserContext } from './Features/Authentication/useAuth';
import { loggedIn, logout, getMember } from './Features/Authentication/Auth';
import logo from './assets/secretsantalogo_transparent_small.png';

const MainNavigation = ({ handleLogout, user }) => (
    <div>
    {
      user && user.memberName
      ?
      <Menu className='nav-main' secondary>
        <Menu.Item><Image src={logo} size='mini'/></Menu.Item>
        <Menu.Menu position='right'>
        <Dropdown item className="toUpperCase menu-style" text={user.memberName}>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              {user.admin && <Dropdown.Item as={Link} to='/admin'>Admin</Dropdown.Item>}
              <Dropdown item text='Policies'>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/privacy'>Privacy</Dropdown.Item>
                <Dropdown.Item as={Link} to='/terms'>Terms</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
      </Menu>
        :
        <Menu className='nav-main' secondary>
        <Menu.Item><Image src={logo} size='mini'/></Menu.Item>
        <Menu.Menu position='right'>
        <Dropdown item className="toUpperCase" text="Santas Secret App">
          <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/'>Login</Dropdown.Item>
              <Dropdown item text='Policies'>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/privacy'>Privacy</Dropdown.Item>
                <Dropdown.Item as={Link} to='/terms'>Terms</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
    }

    </div>
  );

const AppContainer = (props) => {
  const { user, dispatch } = useContext(UserContext);

  let history = useHistory();

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
    history.push('/')
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