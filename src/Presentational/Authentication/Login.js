import React from 'react';
import PropTypes from 'prop-types';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

const Login = ({
    handleSubmit,
    handleChange,
    data
}) => (
    <Container className="content-body">
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450, marginTop: 20 }}>
            <Header as='h2' color='pink' textAlign='center'>
              <Image src='/logo.png' /> Log-in to secret santa
            </Header>
            <Form size='large' onSubmit={handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='name'
                  name='memberName'
                  onChange={handleChange}
                />
                <Form.Input fluid icon='group' iconPosition='left' placeholder='Group name' name='groupID' onChange={handleChange}/>
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Passphrase'
                  type='password'
                  name='passphrase'
                  onChange={handleChange}
                />

                <Button color='teal' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href='#'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    </Container>
);

Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    data: PropTypes.shape({}).isRequired
};

export default Login;
