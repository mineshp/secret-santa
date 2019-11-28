import React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import './Terms.css';

const Privacy = () => {
  document.body.className = 'terms-page';
  return (
    <Container>
      <div className='terms-bg'>
        <Header as='h2' className='headings'>Privacy Policy</Header>
        <ol>
          <li><Header as='h4' className='headings'>Santa's Secret App</Header></li>
          <p className='terms-content'>
        Welcome to Santa’s Secret, this application consists of an Alexa skill developed by mineshdesigns
        (“App”) and below is a short guide on how the App is used by the User (“You”, “Your” or “User”) and
        mineshdesigns (“We”, “Us”, or “Our”).
        </p>
        <li><Header as='h4' className='headings'>Installation and Use of the App</Header></li>
        <p className='terms-content'>
        Under data protection laws, we are required to provide you with certain information about who we are, how we
        process your personal data and for what purposes, and your rights in relation to your personal data. This
        information is provided in the Santa’s Secret Privacy Policy and Amazon’s <a href='https://developer.amazon.com/docs/policy-center/privacy-security.html' target='_blank' rel='noopener noreferrer'>Privacy Policy</a> and it is important
        that you read that information together with Alexa <a href='https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=201809740' target='_blank' rel='noopener noreferrer'>Terms of Use</a> before installation and use of this App. By
        installing and using this App you hereby agree to all terms and aforementioned privacy policies.
        </p>
          <li>
            <Header as='h4' className='headings'>The data we collect about you and how we use it</Header>
            <ol>
              <li>The only personal data that we shall collect, use, store and transfer is your first name.</li>
              <li>We will only use your personal data for the purpose for which we collected it, which is to enable you to use the App.</li>
            </ol>
          </li>

          <li><Header as='h4' className='headings'>Sharing data with Amazon</Header></li>
          <p className='terms-content'>
          When you use the App you have to talk to Alexa, providing your first name, Santa's Secret group and a code
          word. Users can only use the App currently if they have been setup to do so, i.e. they would have been
          emailed these details as part of the setup and draw of their Secret Santa group which is handled via the web
          application and outside of the App. This voice input is sent to Amazon and mineshdesigns where we use it to
          understand what the App’s response should be. This is absolutely necessary for our service to give you an
          appropriate answer. The only personal data we request is your first name, which is collected, stored and
          processed in line with Our Privacy Policy and Amazon’s Privacy Policy.
          </p>
          <li><Header as='h4' className='headings'>Your rights</Header></li>
          <p className='terms-content'>You have the right to:</p>
          <p className='terms-content'><b>Request access to your personal data</b> (commonly known as a "data subject access request"). This enables you to receive a copy of the personal data we hold about you and to check that we are lawfully processing it.
          </p>
          <p className='terms-content'><b>Request correction of the personal data that we hold about you.</b> This enables you to have any incomplete or inaccurate data we hold about you corrected, though we may need to verify the accuracy of the new data you provide to us.
          </p>
          <p className='terms-content'><b>Request erasure of your personal data.</b> This enables you to ask us to delete or remove personal data where there is no good reason for us continuing to process it. You also have the right to ask us to delete or remove your personal data where you have successfully exercised your right to object to processing (see below), where we may have processed your information unlawfully or where we are required to erase your personal data to comply with local law. Note, however, that we may not always be able to comply with your request of erasure for specific legal reasons which will be notified to you, if applicable, at the time of your request.
          </p>
          <p className='terms-content'><b>Object to processing of your personal data where we are relying on a legitimate interest</b> (or those of a third party) and there is something about your particular situation which makes you want to object to processing on this ground as you feel it impacts on your fundamental rights and freedoms. You also have the right to object where we are processing your personal data for direct marketing purposes. In some cases, we may demonstrate that we have compelling legitimate grounds to process your information which override your rights and freedoms.
          </p>
          <p className='terms-content'><b>Request restriction of processing of your personal data.</b> This enables you to ask us to suspend the processing of your personal data in the following scenarios:
          </p>
          <ol>
            <ol>
              <li>If you want us to establish the data's accuracy.</li>
              <li>Where our use of the data is unlawful but you do not want us to erase it.</li>
              <li>Where you need us to hold the data even if we no longer require it as you need it to establish, exercise or defend legal claims.</li>
              <li>You have objected to our use of your data but we need to verify whether we have overriding legitimate grounds to use it.</li>
            </ol>
          </ol>
          <p className='terms-content'>Request the transfer of your personal data to you or to a third party. We will provide to you, or a third party you have chosen, your personal data in a structured, commonly used, machine-readable format. Note that this right only applies to automated information which you initially provided consent for us to use or where we used the information to perform a contract with you.</p>
          <p className='terms-content'>You may change your mind and withdraw consent at any time by contacting us info@mineshdesigns.co.uk but that will not affect the lawfulness of any processing carried out before you withdraw your consent.  Please note that if you withdraw your consent, we may not be able to provide certain products or services to you.</p>
        </ol>
      </div>
    </Container>
  );
}

export default Privacy;
