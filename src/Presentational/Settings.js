import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';

const Settings = ({
  handleSubmit,
  handleGiftIdeaNameChange,
  data,
  wishlistFor,
  user
}) => {
  const { giftIdeas } = data;
  const readOnly = (wishlistFor !== user);

  const giftIdeasFields = [0, 1, 2].map((i) => {
    const val = giftIdeas && giftIdeas[i]
      ? giftIdeas[i]
      : '';
    return (
      <Form.Field key={`gift-${i}`} className="custom-align">
        <Form.Input
          name={`giftIdea${i}`}
          placeholder={`Gift Idea ${i + 1}`}
          defaultValue={val}
          onChange={handleGiftIdeaNameChange}
          width={9}
          readOnly={readOnly}
        />
      </Form.Field>
    )
  });


  return (
    <Container className="gift-ideas">
      <Form onSubmit={handleSubmit}>
      <Header
        as='h1'
        content={`${wishlistFor.charAt(0).toUpperCase() + wishlistFor.slice(1)}'s Wishlist`}
        className='wishlist-header'
    />
        {giftIdeasFields}
        <Button color="yellow" type="submit" className="gift-submit-btn">
          Save
        </Button>
        <Button color="pink" as={Link} className="gift-submit-btn" name="home" to="/">
          Go Home
          <Icon name='home' />
        </Button>
      </Form>
    </Container>
  );
}

Settings.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleGiftIdeaNameChange: PropTypes.func.isRequired,
  // giftIdeas: PropTypes.array
};

Settings.defaultProps = {
  data: {
    giftIdeas: []
  }
};

export default Settings;