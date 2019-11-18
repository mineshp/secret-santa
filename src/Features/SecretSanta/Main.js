import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Loading from '../../Shared/Loading';

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
        return 'medium';
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
    <div className="container-main">
      <Header as='h3' className='your-secret-santa'>
        Hi <span className="toUppperCase">{member.memberName}</span> your Secret Santa is
      </Header>
        <Button color={mySecretSanta ? 'red' : 'yellow'} className='reveal-btn toUpperCase' size={setButtonSizeByDeviceRes()} onClick={revealMySecretSanta}>
        {mySecretSanta ? mySecretSanta : 'Reveal'}
      </Button>
      <div className="wishlist-buttons">
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
        {
          mySecretSanta &&
          <Button
            color='purple'
            className='secret-santa-wishlist-btn toUpperCase'
            size={setButtonSizeByDeviceRes()}
            as={Link}
            name='my-wishlist'
            to={`/secretsanta/wishlist/${mySecretSanta}/${member.groupID}`}
          >
            {`${mySecretSanta}'s Wishlist`}
          </Button>
        }
      </div>
      </div>
      </Container>
  );
};
