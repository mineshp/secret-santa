import React from 'react';
import PropTypes from 'prop-types';
import Settings from './Settings';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';

const GiftIdeas = ({
  data,
  user,
  handleGiftIdeaNameChange,
  handleSubmit,
  wishlistFor
}) => {
  return (
    <div className="container-wishlist">
    <Header
      as='h1'
      content={`${wishlistFor.charAt(0).toUpperCase() + wishlistFor.slice(1)}'s Wishlist`}
      className='wishlist-header'
    />
    <form onSubmit={handleSubmit}>
      <Settings
        handleGiftIdeaNameChange={handleGiftIdeaNameChange}
        handleSubmit={handleSubmit}
        data={data}
        wishlistFor={wishlistFor}
        user={user.memberName}
        />
    </form>
  </div>
  );
};

GiftIdeas.propTypes = {
  // data: PropTypes.shape({})
};

GiftIdeas.defaultProps = {
  message: {},
  data: {
    giftIdeas: []
  }
};

export default GiftIdeas;
