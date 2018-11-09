import React from 'react';
import PropTypes from 'prop-types';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

const Settings = ({ activeIndex, handleAccordionClick, handleSubmit, handleGiftIdeaNameChange, data }) => {
  const { giftIdeas } = data;

  const giftIdeasFields = [0, 1, 2].map((i) => {
    const val = giftIdeas && giftIdeas[i]
      ? giftIdeas[i]
      : '';
    return (
      <Form.Field key={`gift-${i}`}>
        <Input
          name={`giftIdea${i}`}
          placeholder={`Gift Idea ${i+1}`}
          defaultValue={val}
          onChange={handleGiftIdeaNameChange}
        />
      </Form.Field>
    )
  });


  return (
    <Container>
      <Accordion fluid styled>
        <Accordion.Title active={activeIndex === 0} id="0" onClick={handleAccordionClick}>
          <Icon name="dropdown" />
          Add GiftIdeas
            </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Container>
            <Form onSubmit={handleSubmit}>
              {giftIdeasFields}
              <Button color="green" type="submit">Save</Button>
            </Form>
          </Container>
        </Accordion.Content>
      </Accordion>
    </Container>
  );
}

Settings.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  handleAccordionClick: PropTypes.func.isRequired,
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