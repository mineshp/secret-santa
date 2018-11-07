import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import logo from '../../logo.svg';

export default class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'view'
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

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
        </Menu>
      </div>
    );
  }
}
