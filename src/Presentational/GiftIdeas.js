import React from 'react';
import PropTypes from 'prop-types';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Settings from './Settings';

const GiftIdeas = ({
  data,
  user,
  handleGiftIdeaNameChange,
  handleSubmit,
  wishlistFor
}) => {
  return (
    <Container text className="button-layout-giftideas">
      <Settings
        handleGiftIdeaNameChange={handleGiftIdeaNameChange}
        handleSubmit={handleSubmit}
        data={data}
        wishlistFor={wishlistFor}
        user={user.memberName}
      />
    </Container>
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
