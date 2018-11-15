import React from 'react';
import PropTypes from 'prop-types';
import Settings from './Settings';

const GiftIdeas = ({
  data,
  user,
  handleGiftIdeaNameChange,
  handleSubmit,
  wishlistFor
}) => {
  return (
    <div className="container-wishlist">
    <Settings
      handleGiftIdeaNameChange={handleGiftIdeaNameChange}
      handleSubmit={handleSubmit}
      data={data}
      wishlistFor={wishlistFor}
      user={user.memberName}
    />
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
