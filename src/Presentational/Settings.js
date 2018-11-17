import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
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
      <div class="box-wishlist one-col-span wishlist-input">
        <Form.Field key={`gift-${i}`}>
          <Form.Input
            name={`giftIdea${i}`}
            placeholder={`Gift Idea ${i + 1}`}
            defaultValue={val}
            onChange={handleGiftIdeaNameChange}
            width={9}
            readOnly={readOnly}
          />
        </Form.Field>
      </div>
    )
  });


  return (
    <div class="flex-container">
      <div class="flex-item">
        {giftIdeasFields}
        <div class="box-wishlist">
          <Button color="yellow" type="submit" className="wishlist-submit-btn">
          Save
          </Button>
        </div>
        <div class="box-wishlist">
          <Button color="green" as={Link} className="wishlist-submit-btn" name="home" to="/">
            Home
          </Button>
        </div>
      </div>
   </div>
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