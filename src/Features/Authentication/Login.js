import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import logo from '../../md-logo-green.png';
import { getToken, setAuthorisationToken, setToken, getMember } from './Auth';
import api from '../../Services/api';
import Notification from '../../Shared/Notification';

import useInput from '../../Shared/useInput'
import { useStateValue } from '../../State';

export default function Login(props) {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();
  const [state, dispatch] = useStateValue();
  let history = useHistory();

  const { value: memberNameInput, bind: bindMemberName } = useInput('');
  const { value: groupNameInput, bind: bindGroupName } = useInput('');
  const { value: secretCodeInput, bind: bindSecretCode } = useInput('');

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
          type: 'SET_MEMBER',
          member: { ...decodedUser }
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
      memberName: memberNameInput,
      groupID: groupNameInput,
      passphrase: secretCodeInput
    })
      .then(() => history.push('/'))
      .catch((err) => displayNotification({
        type: 'negative',
        messageHeader: 'Login failed, details maybe incorrect!'
      }));
  };

  return (
    <div className="container-login">
    <form onSubmit={handleSubmit}>
      <div className="flex-container">
        <div className="flex-item flex-item-login box-login">
          <div className="box-wishlist">
            <Image src={logo} className="home-logo" />
          </div>
          <div className="box-wishlist">
            <Header as="h2" className="login-header" textAlign="center">
              Login to Secret Santa
            </Header>
          </div>
          <div className="box-wishlist one-col-span login-input">
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Name'
              name='memberName'
              {...bindMemberName}
            />
          </div>
          <div className="box-wishlist one-col-span login-input">
              <Form.Input
                fluid icon='group'
                iconPosition='left'
                placeholder='Group name'
                name='groupID'
                {...bindGroupName}
              />
          </div>
          <div className="box-wishlist one-col-span login-input">
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Code'
              name='passphrase'
              {...bindSecretCode}
            />
          </div>
          <div className="box-wishlist one-col-span">
            <Button color='teal' fluid size='large' className="login-btn">
              Login
            </Button>
            { showNotification && notificationMessage
              && (
              <Notification
                type={notificationMessage.type}
                messageHeader={notificationMessage.messageHeader}
              />
              )
            }
          </div>
        </div>
      </div>
    </form>
  </div>
  )
}
