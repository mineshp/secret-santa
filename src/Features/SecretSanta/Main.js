import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import './Main.css';
import '../../Shared/Notification.css';
import Notification from '../../Shared/Notification';

import { getToken, setAuthorisationToken } from '../Authentication/Auth';
import api from '../../Services/api';

const setNotification = ({ type, messageHeader, message }) => (
  <Notification
    type={type}
    messageHeader={messageHeader}
    message={message || null}
  />
);
export default function SecretSanta({ member }) {
  const [mySecretSanta, setMySecretSanta] = useState(false);
  const [deviceBP, setDeviceBP] = useState(null);
  const [notificationState, setNotificationState] = useState('hide');
  const [notificationMessage, setNotificationMessage] = useState();

  document.body.className = 'main-page';

  useEffect(() => {
    if (window.innerWidth <= 480) {
      setDeviceBP('mobile');
    } else if (window.innerWidth > 481 && window.innerWidth <= 768) {
      setDeviceBP('tablet');
    } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
      setDeviceBP('laptop');
    } else if (window.innerWidth > 1024) {
      setDeviceBP('largeDesktop');
    }
  }, []);

  useEffect(() => {
    if (notificationState) {
      setTimeout(() => setNotificationState('hide'), 3000);
    }
  }, [notificationState]);

  const displayNotification = (messageData) => {
    setNotificationState('show');
    return setNotificationMessage(messageData);
  };

  const revealMySecretSanta = async () => {
    const token = getToken();
    const response = await api
      .get(`/reveal/${member.memberName}/${member.groupID}`, {
        headers: setAuthorisationToken(token),
      })
      .catch((err) => {
        displayNotification({
          type: 'negative',
          messageHeader: err.message,
        });
      });

    if (response && response.data && response.data.secretSanta) {
      const decodedStr = Buffer.from(
        response.data.secretSanta,
        'base64'
      ).toString('ascii');
      setMySecretSanta(decodedStr);
    } else if (
      response &&
      response.data &&
      Object.keys(response.data).length === 0
    ) {
      displayNotification({
        type: 'warning',
        messageHeader:
          "Draw has not taken place yet, please wait or contact your group's admin!",
      });
    }
  };

  // eslint-disable-next-line consistent-return
  const setButtonSizeByDeviceRes = () => {
    switch (deviceBP) {
      case 'mobile':
        return 'small';
      case 'tablet':
        return 'large';
      case 'laptop':
        return 'small';
      case 'largeDesktop':
        return 'large';
      default:
        break;
    }
  };

  return (
    <Container>
      <div className="main-bg">
        <div
          data-testid="notification"
          className={`${notificationState} notification-wrapper`}
        >
          {notificationMessage &&
            notificationState === 'show' &&
            setNotification(notificationMessage)}
        </div>
        <div className="main-wrapper">
          <div className="row-heading">Ho Ho Ho!</div>
          <div className="row-your-giftee-heading secret-santa-heading">
            Hi <span className="displayMemberName">{member.memberName}</span>{' '}
            your giftee is
          </div>
          <div className="row-reveal-btn reveal-santa">
            <Button
              compact
              fluid
              color={mySecretSanta ? 'violet' : 'yellow'}
              className="displayMemberName"
              size={setButtonSizeByDeviceRes()}
              onClick={revealMySecretSanta}
              data-testid="reveal-btn"
            >
              {mySecretSanta || 'Reveal'}
            </Button>
          </div>
          <div className="row-mywishlist-btn button-row">
            <Button
              color="teal"
              className="my-wishlist-btn"
              size={setButtonSizeByDeviceRes()}
              as={Link}
              name="my-wishlist"
              to={`/secretsanta/wishlist/${member.memberName}/${member.groupID}`}
              data-testid="my-wishlist-btn"
            >
              My Wishlist
            </Button>
          </div>
          {mySecretSanta && (
            <div className="row-gifteewishlist-btn button-row">
              <Button
                compact
                fluid
                color="blue"
                className="displayMemberName"
                size={setButtonSizeByDeviceRes()}
                as={Link}
                name="my-wishlist"
                to={`/secretsanta/wishlist/${mySecretSanta}/${member.groupID}`}
                data-testid="giftees-wishlist-btn"
              >
                {`${mySecretSanta}'s Wishlist`}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

SecretSanta.propTypes = {
  member: PropTypes.shape({
    memberName: PropTypes.string,
    groupID: PropTypes.string,
  }),
};

SecretSanta.defaultProps = { member: PropTypes.shape({}) };
