import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import './Main.css';

import { getToken, setAuthorisationToken } from '../Authentication/Auth';
import api from '../../Services/api';

export default function SecretSanta({ member }) {
  const [mySecretSanta, setMySecretSanta] = useState(false);
  const [deviceBP, setDeviceBP] = useState(null);

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

  const revealMySecretSanta = async () => {
    const token = getToken();

    const response = await api.get(
      `/secretsanta/reveal/${member.memberName}/${member.groupID}`,
      { headers: setAuthorisationToken(token) }
    )
      .catch((err) => {
        console.log(`Error getting messages ${err}`);
      });

    if (response.data && response.data.secretSanta) {
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
        return 'large'
      default:
        break;
    }
  };

  return (
    <Container>
      <div className="main-bg">
      <div className="wrapper-main">
        <div className="box-main a-main merry-christmas">Ho Ho Ho!</div>
        <div className="box-main b-main secret-santa-heading">Hi <span className="displayMemberName">{member.memberName}</span> your Secret Santa is
        </div>
        <div className="box-main c-main"></div>
        <div className="box-main d-main reveal-santa">
          <Button compact fluid color={mySecretSanta ? 'olive' : 'yellow'} className='displayMemberName' size={setButtonSizeByDeviceRes()} onClick={revealMySecretSanta}>
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
          >
            {`${mySecretSanta}'s Wishlist`}
          </Button>
        }</div>
        </div>
        </div>
      </Container>
  );
};
