import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import logo from '../../md-logo-green.png';

export default class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'view'
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { activeItem } = this.state;
    const { user: { memberName } } = this.props;
    const displayName = memberName
      ? `${memberName.charAt(0).toUpperCase() + memberName.slice(1)}`
      : null;

    return (
      <div className="header-main">
        <Menu inverted>
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            <img alt="logo" src={logo} />
          </Menu.Item>
          <Menu.Menu position="right">
          {
            memberName
                ?
                (
                  <Menu.Item>
                    <Dropdown text={`Welcome ${displayName}`} icon="user circle" floating labeled button className="icon green">
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Menu.Item>
                  )
                :
                  (
                    <Menu.Item
                        as={Link}
                        to="/user/login"
                        name="login"
                        active={activeItem === 'login'}
                        onClick={this.handleItemClick}
                    >Login
                    </Menu.Item>
                  )
        }
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}