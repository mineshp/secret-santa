import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';

const uppercaseFirstLetter = (str) => `${str.charAt(0).toUpperCase() + str.slice(1)}`;

const Main = ({
  data,
  mobile,
  user,
  revealMySecretSanta
}) => {
  let decodedSecretSanta;
  if (data && data.secretSanta) {
    const decodedStr = Buffer.from(data.secretSanta, 'base64').toString('ascii');
    decodedSecretSanta = uppercaseFirstLetter(decodedStr);
  }
  return (
    <div className="container">
      <Header
        as='h3'
        content={`Hi ${uppercaseFirstLetter(user.memberName)} your Secret Santa is`}
        className='your-secret-santa'
      />
      <Button color={data.secretSanta ? 'red' : 'yellow'} className='reveal-btn' size='large' onClick={revealMySecretSanta}>
        {data.secretSanta ? decodedSecretSanta : 'Reveal'}
        <Icon name='gift' className='icon-btn' />
      </Button>
      <div className="wishlist-buttons">
        <Button
          color='teal'
          className='my-wishlist-btn'
          size='large'
          as={Link}
          name='my-wishlist'
          to={`/giftIdeas/${user.memberName}`}
        >
          My Wishlist
          <Icon name='snowflake' className='icon-btn' />
        </Button>
        {data.secretSanta &&
          <Button
            color='olive'
            className='secret-santa-wishlist-btn'
            size='large'
            as={Link}
            name='my-wishlist'
            to={`/giftIdeas/${decodedSecretSanta}`}
          >
            {`${decodedSecretSanta}'s Wishlist`}
            <Icon name='user secret' className='icon-btn' />
          </Button>
        }
        </div>
    </div>
  );
};

Main.propTypes = {
  // data: PropTypes.shape({})
};

Main.defaultProps = {
  message: {},
  data: {
    giftIdeas: []
  }
};

export default Main;
