import React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import './Terms.css';

const Terms = () => {
  document.body.className = 'terms-page';
  return (
    <Container>
      <div className='terms-bg'>
        <Header as='h2' className='headings'>Terms of Use</Header>
        <Header as='h4' className='headings'>Santa's Secret App</Header>
        <p className='terms-content'>
        Welcome to Santa’s Secret, this application consists of an Alexa skill developed by mineshdesigns
        (“App”) and below is a short guide on how the App is used by the User (“You”, “Your” or “User”) and
        mineshdesigns (“We”, “Us”, or “Our”).
        </p>
        <Header as='h4' className='headings'>Installation and Use of the App</Header>
        <p className='terms-content'>
        Under data protection laws, we are required to provide you with certain information about who we are, how we
        process your personal data and for what purposes, and your rights in relation to your personal data. This
        information is provided in the Santa’s Secret Privacy Policy and Amazon’s <a href='https://developer.amazon.com/docs/policy-center/privacy-security.html' target='_blank' rel='noopener noreferrer'>Privacy Policy</a> and it is important
        that you read that information together with Alexa <a href='https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=201809740' target='_blank' rel='noopener noreferrer'>Terms of Use</a> before installation and use of this App. By
        installing and using this App you hereby agree to all terms and aforementioned privacy policies.
        </p>
        <Header as='h4' className='headings'>Sharing data with Amazon</Header>
        <p className='terms-content'>
        When you use the App you have to talk to Alexa, providing your first name, Santa's Secret group and a code
        word. Users can only use the App currently if they have been setup to do so, i.e. they would have been
        emailed these details as part of the setup and draw of their Secret Santa group which is handled via the web
        application and outside of the App. This voice input is sent to Amazon and mineshdesigns where we use it to
        understand what the App’s response should be. This is absolutely necessary for our service to give you an
        appropriate answer. The only personal data we request is your first name, which is collected, stored and
        processed in line with Our Privacy Policy and Amazon’s Privacy Policy.
        </p>
        <Header as='h4' className='headings'>Changes or Amendments</Header>
        <p className='terms-content'>
        Our App or parts of it may change or be updated at any time. Your continued use of the App after changes to the Privacy Policy or the App itself will be seen as your acceptance of both. Also, we may at any time discontinue or suspend the App without prior notice.
        </p>
        <Header as='h4' className='headings'>Contacting the User</Header>
        <p className='terms-content'>
        The App is for non-commercial use, meaning it is only for personal use. However, we may seek your constructive feedback on the App including problems you encounter, aspects that work well, and suggestions for improving it. You agree that mineshdesigns may contact you from time to time about your experience with the App.
        </p>
        <Header as='h4' className='headings'>Termination</Header>
        <p className='terms-content'>
        We may terminate your access to the App at any time and without notice if you fail to comply with any of the Terms of Use or Privacy Policies. We may also terminate your access to the App if the App or skill which sits behind the App is no longer available.
        </p>
        <Header as='h4' className='headings'>Intellectual Property</Header>
        <p className='terms-content'>
        All intellectual property rights in any information, content, materials, data or processes contained in or underlying the App and skill belong to Us and must not be copied or used in any way other than for the proper use of the App for its intended purpose.
        </p>
        <Header as='h4' className='headings'>Applicable law</Header>
        <p className='terms-content'>
        These terms and conditions are governed by and shall be construed in accordance with the laws of England and Wales.
        </p>
      </div>
    </Container>
  );
};

export default Terms;
