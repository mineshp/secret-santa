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
  console.log(`data in gift ideas presenational ${data}`);
  console.log(data);
  return (
    <Container text>
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
