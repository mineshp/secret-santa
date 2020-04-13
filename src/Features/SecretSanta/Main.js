import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import './Main.css';
import Notification from '../../Shared/Notification';


import { getToken, setAuthorisationToken } from '../Authentication/Auth';
import api from '../../Services/api';

export default function SecretSanta({ member }) {
  const [mySecretSanta, setMySecretSanta] = useState(false);
  const [deviceBP, setDeviceBP] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
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
    if (showNotification) {
      setTimeout(() => setShowNotification(false), 3000);
    }
  }, [showNotification]);

  const displayNotification = (messageData) => {
    setShowNotification(true);
    return setNotificationMessage(messageData);
  };

  const revealMySecretSanta = async () => {
    const token = getToken();
    const response = await api.get(
      `/secretsanta/reveal/${member.memberName}/${member.groupID}`,
      { headers: setAuthorisationToken(token) }
    )
      .catch((err) => {
        console.error(`Error getting messages ${err}`);
        displayNotification({
          type: 'negative',
          messageHeader: err.message
        });
      });

    if (response && response.data && response.data.secretSanta) {
      const decodedStr = Buffer.from(response.data.secretSanta, 'base64').toString('ascii');
      setMySecretSanta(decodedStr);
    }
  };

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
        <div className="wrapper-main">
          <div className="box-main a-main merry-christmas">
            {
              showNotification && notificationMessage
                ?
                  (
                    <Notification
                      type={notificationMessage.type}
                      messageHeader={notificationMessage.messageHeader}
                    />
                  )
                : 'Ho Ho Ho!'
        }
          </div>
          <div className="box-main b-main secret-santa-heading">
            Hi <span className="displayMemberName">{member.memberName}</span> your giftee is
          </div>
          <div className="box-main c-main"></div>
          <div className="box-main d-main reveal-santa">
            <Button compact fluid color={mySecretSanta ? 'violet' : 'yellow'} className='displayMemberName' size={setButtonSizeByDeviceRes()}
              onClick={revealMySecretSanta}
              data-testid='reveal-btn'>
              {mySecretSanta ? mySecretSanta : 'Reveal'}
            </Button>
          </div>
          <div className="box-main e-main"></div>
          <div className="box-main f-main">
            <Button
              color='teal'
              className='my-wishlist-btn'
              size={setButtonSizeByDeviceRes()}
              as={Link}
              name='my-wishlist'
              to={`/secretsanta/wishlist/${member.memberName}/${member.groupID}`}
              data-testid='my-wishlist-btn'
          >
              My Wishlist
            </Button>
          </div>
          <div className="box-main g-main"></div>
          <div className="box-main h-main">{
          mySecretSanta &&
            <Button
              compact
              fluid
              color='blue'
              className='displayMemberName'
              size={setButtonSizeByDeviceRes()}
              as={Link}
              name='my-wishlist'
              to={`/secretsanta/wishlist/${mySecretSanta}/${member.groupID}`}
              data-testid='giftees-wishlist-btn'
          >
              {`${mySecretSanta}'s Wishlist`}
            </Button>
        }</div>
        </div>
      </div>
    </Container>
  );
}

SecretSanta.propTypes = {
  member: PropTypes.shape({
    memberName: PropTypes.string,
    groupID: PropTypes.string,
  })
};