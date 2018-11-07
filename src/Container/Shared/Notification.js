import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotificationSystem from 'react-notification-system';
import { addNotification } from '../../actions/notification';

class Notification extends Component {
  /* istanbul ignore next: not testing componentDidMount */
  componentDidMount() {
    // eslint-disable-next-line react/no-string-refs
    this.notificationSystem = this.refs.notificationSystem;
  }

  /* istanbul ignore next: not testing componentWillReceiveProps */
  componentWillReceiveProps(newProps) {
    const { message, level, title } = newProps.notification;
    this.notificationSystem.addNotification({
      message,
      level,
      title
    });
  }

  /* istanbul ignore next: not testing render */
  render() {
    return (
    // eslint-disable-next-line react/no-string-refs
      <NotificationSystem ref="notificationSystem" />
    );
  }
}

/* istanbul ignore next: not testing mapStateToProps */
const mapStateToProps = (state) => (
  {
    notification: state.notification
  }
);

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators({
      addNotification
    }, dispatch)
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
