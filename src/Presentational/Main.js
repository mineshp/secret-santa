import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';


const Main = ({
  data,
  mobile,
  user,
  revealMySecretSanta
}) => {
  let decodedStr;
  if (data && data.secretSanta) {
    decodedStr = Buffer.from(data.secretSanta, 'base64').toString('ascii');
  }

  return (
    <div className="container">
      <Header as='h3' className='your-secret-santa'>
        Hi <span className="toUppperCase">{user.memberName}</span> your Secret Santa is
      </Header>
      <Button color={data.secretSanta ? 'red' : 'yellow'} className='reveal-btn toUpperCase' size='large' onClick={revealMySecretSanta}>
        {decodedStr ? decodedStr : 'Reveal'}
        <Icon name='gift' className='icon-btn' />
      </Button>
      <div className="wishlist-buttons">
        <Button
          color='teal'
          className='my-wishlist-btn toUpperCase'
          size='large'
          as={Link}
          name='my-wishlist'
          to={`/giftIdeas/${user.memberName}`}
        >
          My Wishlist
          <Icon name='snowflake' className='icon-btn' />
        </Button>
        {decodedStr &&
          <Button
            color='olive'
            className='secret-santa-wishlist-btn toUpperCase'
            size='large'
            as={Link}
            name='my-wishlist'
            to={`/giftIdeas/${decodedStr}`}
          >
            {`${decodedStr}'s Wishlist`}
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
