import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import logo from '../../md-logo-green.png';

import { getToken, setAuthorisationToken, setToken, getMember } from './Auth';
import api from '../../Services/api';
import Notification from '../../Shared/Notification';
import { UserContext } from './useAuth';
import useInput from '../../Shared/useInput';
import './Login.css';


export default function Login(props) {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();

  let history = useHistory();
  const [deviceBP, setDeviceBP] = useState(null);
  const { dispatch }= useContext(UserContext);
  const { value: memberNameInput, bind: bindMemberName } = useInput('');
  const { value: groupNameInput, bind: bindGroupName } = useInput('');
  const { value: secretCodeInput, bind: bindSecretCode } = useInput('');

  document.body.className = 'background-login';

  useEffect(() => {
    if (window.innerWidth <= 480) {
      setDeviceBP('mobile');
    } else if (window.innerWidth > 481 && window.innerWidth <= 768) {
      setDeviceBP('tablet');
    } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
      setDeviceBP('laptop')
    } else if (window.innerWidth > 1024) {
      setDeviceBP('largeDesktop');
    }
  }, []);

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

        const decodedUser = getMember(token);
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
    if (!memberNameInput && !groupNameInput && !secretCodeInput) {
      displayNotification({
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
      .catch((err) => displayNotification({
        type: 'negative',
        messageHeader: 'Login failed, details maybe incorrect!'
      }));
  };

  const setButtonSizeByDeviceRes = () => {
    switch (deviceBP) {
      case 'mobile':
        return 'tiny';
      case 'tablet':
        return 'large';
      case 'laptop':
        return 'small';
      case 'largeDesktop':
        return 'big'
      default:
        break;
    }
  };

  return (
    <div className="login-bg">
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2'  textAlign='center' className="login-header">
        <Image src={logo} /> Secret Santa Login
      </Header>
      <Form size='large' onSubmit={handleSubmit}>
        <Segment stacked>
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            placeholder='Name'
            name='memberName'
            {...bindMemberName}
          />
          <Form.Input
            fluid icon='group'
            iconPosition='left'
            placeholder='Group name'
            name='groupID'
            {...bindGroupName}
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Code'
            name='passphrase'
            {...bindSecretCode}
          />
          <Button color='red' fluid size='large'>
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
  )
}
