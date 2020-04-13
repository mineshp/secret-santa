import React from 'react';
import PropTypes from 'prop-types';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

const NotificationContent = ({ messageHeader, message }) => (
  <div>
    <Message.Header>{messageHeader}</Message.Header>
    {
      message && <p>{message}</p>
    }
  </div>
);

const Notification = ({ type, messageHeader, message }) => {
  switch (type) {
    case 'negative':
      return (
        <Message negative size='tiny' className='notification'>
          <NotificationContent
            messageHeader={messageHeader}
            message={message}
          />
        </Message>
      );
    case 'positive':
      return (
        <Message positive size='tiny' className='notification'>
          <NotificationContent
            messageHeader={messageHeader}
            message={message}
          />
        </Message>
      );

    default:
      break;
  }
};

NotificationContent.propTypes = {
  messageHeader: PropTypes.string,
  message: PropTypes.string
};

export default Notification;

