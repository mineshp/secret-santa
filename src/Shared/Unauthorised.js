import React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import './ErrorPage.css';

const Unauthorised = () => {
  document.body.className = 'error-page';
  return (
    <div className="error-page-bg">
      <Container text>
        <Header as="h1" className="error-code-heading">401 Unauthorised!</Header>
        <p className="error-description">Bah Humbug, looks like you do not have permission to view the page.</p>
      </Container>
    </div>
  );
};

export default Unauthorised;
