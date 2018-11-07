import React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';

const NotFound = () => (
  <div>
    <Container text>
      <Header as="h2">404 Page Not Found!</Header>
      <p>Oops it looks like you have ventured off-course.</p>
    </Container>
  </div>
);

export default NotFound;
