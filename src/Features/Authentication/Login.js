import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import santalogo from '../../assets/secretsantalogo_transparent_small.png';

import { getToken, setAuthorisationToken, setToken, getMember } from './Auth';
import api from '../../Services/api';
import Notification from '../../Shared/Notification';
import { UserContext } from './useAuth';
import useInput from '../../Shared/useInput';
import './Login.css';

export default function Login() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();

  let history = useHistory();
  const { dispatch } = useContext(UserContext);
  const { value: memberNameInput, bind: bindMemberName } = useInput('');
  const { value: groupNameInput, bind: bindGroupName } = useInput('');
  const { value: secretCodeInput, bind: bindSecretCode } = useInput('');

  document.body.className = 'login-page';

  const displayNotification = (messageData) => {
    setShowNotification(true);
    return setNotificationMessage(messageData);
  };

  const loginUser = async (loginDetails) => {
    const token = getToken();

    const response = await api.post(
      '/user/login',
      { ...loginDetails },
      { headers: setAuthorisationToken(token) }
    );

    if (response.data) {
      const { token, error } = JSON.parse(response.data);
      if (token) {
        setToken(token);
        displayNotification({
          type: 'positive',
          messageHeader: `${memberNameInput.toUpperCase()} - Successfully logged in`
        });

        const decodedUser = getMember();
        return dispatch({
          type: 'SET_USER',
          user: { ...decodedUser }
        });
      } else if (error) {
        displayNotification({
          type: 'negative',
          messageHeader: `Unable to login, ${error}`
        });
      }
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setShowNotification(false);

    if (!memberNameInput || !groupNameInput || !secretCodeInput) {
      return displayNotification({
        type: 'negative',
        messageHeader: 'Name, group or passphrase missing!'
      });
    }
    await loginUser({
      memberName: memberNameInput.toLowerCase(),
      groupID: groupNameInput.toLowerCase(),
      passphrase: secretCodeInput.toLowerCase()
    })
      .then(() => history.push('/'))
      .catch(() => displayNotification({
        type: 'negative',
        messageHeader: 'Login failed, details maybe incorrect!'
      }));
  };

  return (
    <div className="login-bg">
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2'  textAlign='center' className="login-header">
            <Image src={santalogo} /> Secret Santa Login
          </Header>
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked>
              <label htmlFor="memberName" className="visibilly-hidden">memberName</label>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Name'
                name='memberName'
                id="memberName"
                data-testid='memberName'
                {...bindMemberName}
          />
              <label htmlFor="groupID" className="visibilly-hidden">groupID</label>
              <Form.Input
                fluid icon='group'
                iconPosition='left'
                placeholder='Group name'
                name='groupID'
                id="groupID"
                data-testid='groupID'
                {...bindGroupName}
          />
              <label htmlFor="passphrase" className="visibilly-hidden">passphrase</label>
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Code'
                name='passphrase'
                id='passphrase'
                data-testid='passphrase'
                {...bindSecretCode}
          />
              <Button color='red' fluid size='large' data-testid='login-btn'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            { showNotification && notificationMessage
        ? (
          <Notification
            type={notificationMessage.type}
            messageHeader={notificationMessage.messageHeader}
        />
        )
        : <span className="unknown-login-details">See email for login details</span>
      }

          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}
