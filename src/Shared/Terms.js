import React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import './Terms.css';

const Terms = () => {
  document.body.className = 'background-terms';
  return (
    <Container>
      <div className='terms-bg'>
        <Header as='h2' className='headings'>Terms of Use</Header>
        <Header as='h4' className='headings'>Installation and Use of the App</Header>
        <p className='terms-content'>
        Under data protection laws, we are required to provide you with certain information about who we are, how we process your personal data and for what purposes, and your rights in relation to your personal data. This information is provided in the Santa’s Secret Privacy Policy and Amazon’s Privacy Policy and it is important that you read that information together with Alexa Terms of Use before installation and use of this Skill. By installing and using this Skill you hereby agree to all terms and various privacy policies.
        </p>
        <Header as='h4' className='headings'>Sharing data with Amazon</Header>
        <p className='terms-content'>
        When you use the Skill you have to talk to Alexa, providing your first name, santa's secret group and a code word. Users can only use the Skill currently if they have been setup to do so, i.e. they would have been emailed these details as part of the setup and draw of their secret santa group which is handled via the web application and not the Skill. This voice input is sent to Amazon and mineshdesigns where we use it to understand what the apps response should be. This is absolutely necessary for our service to give you an appropriate answer. The only personal data we request is your first name, which is collected, stored and processed in line with our Privacy Policy.
        </p>
        <Header as='h4' className='headings'>Changes or Amendments</Header>
        <p className='terms-content'>
        Our Skill or parts of it may change or be updated at any time. Your continued use of the Skill after changes of the Privacy Policy or the Skill itself will be seen as your acceptance of both. Also, we may at any time discontinue or suspend the Skill without prior notice.
        </p>
        <Header as='h4' className='headings'>Contacting the User</Header>
        <p className='terms-content'>
        The Skill is for non-commercial use, meaning it is only for personal use.  However, we may seek your constructive feedback on the Skill including problems you encounter, aspects that work well, and suggestions for improving it. You agree that mineshdesigns may email you from time to time about your experience with the Skill.
        </p>
        <Header as='h4' className='headings'>Termination</Header>
        <p className='terms-content'>
        We may terminate your access to the Skill at any time and without notice if you fail to comply with any of the Terms of Use or Privacy Policies. We may also terminate your access to the Skill if the Skill is no longer available.
        </p>
        <Header as='h4' className='headings'>Intellectual Property</Header>
        <p className='terms-content'>
        All intellectual property rights in any information, content, materials, data or processes contained in or underlying the Skill belong to us and must not be copied or used in any way other than for the proper use of the Skill for its intended purpose.
        </p>
        <Header as='h4' className='headings'>Applicable law</Header>
        <p className='terms-content'>
        These terms and conditions are governed by and shall be construed in accordance with the laws of England and Wales.
        </p>
      </div>
    </Container>
  );
}

export default Terms;
