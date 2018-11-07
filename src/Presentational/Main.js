import React from 'react';
import PropTypes from 'prop-types';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';

const Main = ({data}) => {
  return (
    <Container>
      <div>Received from api ggg {data.message}</div>
    </Container>
  );
};

Main.propTypes = {
  message: PropTypes.shape({})
};

Main.defaultProps = {
  message: {}
};

export default Main;
