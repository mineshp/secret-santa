import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';

const Main = ({
  data,
  mobile,
  user,
  revealMySecretSanta
}) => {
  return (
    <Container text>
      <Grid className="button-layout-grid">
      <Grid.Row>
        <Grid.Column width={16}>
          <Header
          as='h3'
            content={`Hi ${user.memberName.charAt(0).toUpperCase() + user.memberName.slice(1)} Your Secret Santa is`}
          style={{
            fontSize: mobile ? '1em' : '2em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile ? '0.2em' : '1.9em',
          }}
          className='your-secret-santa'
          />
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column width={1}>
        </Grid.Column>
        <Grid.Column width={7}>
          <Button color={data.secretSanta ? 'olive' : 'yellow'} className='reveal-btn' size='large' onClick={revealMySecretSanta}>
          {data.secretSanta ? data.secretSanta : 'Reveal'}
            <Icon name='gift' />
          </Button>
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
        <Grid.Column width={2}>
        </Grid.Column>
      </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
          </Grid.Column>
          <Grid.Column width={10}>
          </Grid.Column>
          <Grid.Column width={3}>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <Button
              color='teal'
              className='my-wishlist-btn'
              size='large'
              as={Link}
              name='my-wishlist'
              to={`/giftIdeas/${user.memberName}`}
            >
            My Wishlist
            <Icon name='snowflake' />
          </Button>
          </Grid.Column>
          <Grid.Column width={4}>
          </Grid.Column>
          <Grid.Column width={6}>
            {data.secretSanta &&
              <Button
                color='olive'
                className='my-wishlist-btn'
                size='large'
                as={Link}
                name='my-wishlist'
                to={`/giftIdeas/${data.secretSanta}`}
              >
              {`${data.secretSanta.charAt(0).toUpperCase() + data.secretSanta.slice(1)}'s Wishlist`}
              <Icon name='user secret' />
              </Button>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
