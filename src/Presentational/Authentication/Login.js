import React from 'react';
import PropTypes from 'prop-types';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import logo from '../../md-logo-green.png';

const Login = ({
    handleSubmit,
    handleChange,
    data
}) => (
  <div className="container-login">
    <form onSubmit={handleSubmit}>
      <div class="flex-container">
        <div class="flex-item flex-item-login box-login">
          <div class="box-wishlist">
            <Image src={logo} className="home-logo" />
          </div>
          <div class="box-wishlist">
            <Header as="h2" className="login-header" textAlign="center">
              Login to Secret Santa
            </Header>
          </div>
          <div class="box-wishlist one-col-span wishlist-input">
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Name'
              name='memberName'
              onChange={handleChange}
            />
          </div>
          <div class="box-wishlist one-col-span wishlist-input">
            <Form.Input fluid icon='group' iconPosition='left' placeholder='Group name' name='groupID' onChange={handleChange}/>
          </div>
          <div class="box-wishlist one-col-span wishlist-input">
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Code'
              type='password'
              name='passphrase'
              onChange={handleChange}
            />
          </div>
          <div class="box-wishlist one-col-span">
            <Button color='teal' fluid size='large' className="login-btn">
              Login
            </Button>
          </div>
        </div>
      </div>
    </form>
  </div>
);

Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    data: PropTypes.shape({}).isRequired
};

export default Login;
