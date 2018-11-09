import React from 'react';
import PropTypes from 'prop-types';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Settings from './Settings';

const Main = ({
  data,
  mobile,
  user,
  activeIndex,
  handleAccordionClick,
  handleGiftIdeaNameChange,
  handleSubmit,
  revealMySecretSanta
}) => {
  return (
    <Container text>
      <Header
      as='h1'
      content='Secret Santa'
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content={`Hello ${user.memberName}`}
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
      <Button color='yellow' size='huge' onClick={revealMySecretSanta}>
        {data.secretSanta ? data.secretSanta : 'Reveal'}
      <Icon name='right arrow' />
      </Button>
      <Divider />
      <Settings
        activeIndex={activeIndex}
        handleAccordionClick={handleAccordionClick}
        handleGiftIdeaNameChange={handleGiftIdeaNameChange}
        handleSubmit={handleSubmit}
        data={data}
      />
    </Container>
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
