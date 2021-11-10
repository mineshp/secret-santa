import React from 'react';
import PropTypes from 'prop-types';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

const NotificationContent = ({ messageHeader, message }) => (
  <div>
    <Message.Header>{messageHeader}</Message.Header>
    {message && <p>{message}</p>}
  </div>
);

// eslint-disable-next-line consistent-return
const Notification = ({ type, messageHeader, message }) => {
  switch (type) {
    case 'negative':
      return (
        <Message negative size="tiny" className="notification">
          <NotificationContent
            messageHeader={messageHeader}
            message={message}
          />
        </Message>
      );
    case 'warning':
      return (
        <Message warning size="tiny" className="notification">
          <NotificationContent
            messageHeader={messageHeader}
            message={message}
          />
        </Message>
      );
    case 'positive':
      return (
        <Message positive size="tiny" className="notification">
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

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  messageHeader: PropTypes.string.isRequired,
  message: PropTypes.string,
};

Notification.defaultProps = {
  message: '',
};

NotificationContent.propTypes = {
  messageHeader: PropTypes.string.isRequired,
  message: PropTypes.string,
};

NotificationContent.defaultProps = {
  message: '',
};

export default Notification;
