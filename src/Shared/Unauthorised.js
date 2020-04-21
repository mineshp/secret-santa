import React from 'react';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import './ErrorPage.css';

const Unauthorised = () => {
  document.body.className = 'error-page';
  return (
    <div className="error-page-container error-page-bg">
      <div className="wrapper">
        <div className="box">
          <Header as="h1" className="error-code-heading">401 Unauthorised!</Header>
          <p className="error-description">Bah Humbug, looks like you do not have permission to view the page.</p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorised;