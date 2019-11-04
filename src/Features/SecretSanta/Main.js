import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

import { getToken, setAuthorisationToken } from '../Authentication/Auth';
import api from '../../Services/api';

export default function SecretSanta({ member }) {
  const [mySecretSanta, setMySecretSanta] = useState(false);

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

  return (
    <div className="container">
      <Header as='h3' className='your-secret-santa'>
        Hi <span className="toUppperCase">{member.memberName}</span> your Secret Santa is
      </Header>
      <Button color={'secretSanta' ? 'red' : 'yellow'} className='reveal-btn toUpperCase' size='large' onClick={revealMySecretSanta}>
        {mySecretSanta ? mySecretSanta : 'Reveal'}
        <Icon name='gift' className='icon-btn' />
      </Button>
      <div className="wishlist-buttons">
        <Button
          color='teal'
          className='my-wishlist-btn'
          size='large'
          as={Link}
          name='my-wishlist'
          to={`/secretsanta/wishlist/${member.memberName}/${member.groupID}`}
        >
          My Wishlist
          <Icon name='snowflake' className='icon-btn' />
        </Button>
        {
          mySecretSanta &&
          <Button
            color='olive'
            className='secret-santa-wishlist-btn toUpperCase'
            size='large'
            as={Link}
            name='my-wishlist'
            to={`/secretsanta/wishlist/${mySecretSanta}/${member.groupID}`}
          >
            {`${mySecretSanta}'s Wishlist`}
            <Icon name='user secret' className='icon-btn' />
          </Button>
        }
      </div>
    </div>
  );
};
