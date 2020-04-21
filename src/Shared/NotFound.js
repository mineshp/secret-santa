import React from 'react';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import './ErrorPage.css';

const NotFound = () => {
  document.body.className = 'error-page';
  return (
    <div className="error-page-container error-page-bg">
      <div className="wrapper">
        <div className="box">
          <Header as="h1" className="error-code-heading">404 Page Not Found!</Header>
          <p className="error-description">Bah Humbug, looks like you are lost.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;