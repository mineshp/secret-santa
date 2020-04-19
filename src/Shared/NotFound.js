import React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import './ErrorPage.css';

const NotFound = () => {
  document.body.className = 'error-page';
  return (
    <div className="error-page-bg">
      <Container text>
        <Header as="h1" className="error-code-heading">404 Page Not Found!</Header>
        <p className="error-description">Looks like you have strayed off-course, we are unable to find what you are looking for.</p>
      </Container>
    </div>
  );
};

export default NotFound;
