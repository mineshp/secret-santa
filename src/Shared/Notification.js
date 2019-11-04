import React from 'react';
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
        <Message negative>
          <NotificationContent
            messageHeader={messageHeader}
            message={message}
          />
        </Message>
      );
    case 'positive':
      return (
        <Message positive>
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


export default Notification;
