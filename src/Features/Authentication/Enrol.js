import React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import './Login.css';

const Enrol = () => {
  document.body.className = 'login-page';
  return (
    <Container>
      <div className='login-bg'>
        <Header as='h2' className='enrol-message'>
          Public enrolment for `Santa&apos;s Secret` application is coming soon...
        </Header>
      </div>
    </Container>
  );
};

export default Enrol;
