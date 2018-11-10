import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { secretSanta, revealMySecretSanta } from '../actions/secretSanta';
import { addNotification } from '../actions/notification';
import Main from '../Presentational/Main';

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.revealMySecretSanta = this.revealMySecretSanta.bind(this);
  }

  async revealMySecretSanta() {
    const { user: { memberName, groupID } } = this.props;

    await this.props.actions.revealMySecretSanta(memberName, groupID);
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.updateGiftIdeas();
  }

  render() {
    const { secretSanta, user } = this.props;

    if (secretSanta) {
      return (
        <Main
          data={secretSanta}
          user={user}
          revealMySecretSanta={this.revealMySecretSanta}
        />
      );
    }
    return;

  }
}

MainComponent.propTypes = {
  actions: PropTypes.shape({
    secretSanta: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired,
    revealMySecretSanta: PropTypes.func.isRequired,
  }),
  secretSanta: PropTypes.shape({}),
  notification: PropTypes.shape({
    message: PropTypes.string,
    level: PropTypes.string,
    title: PropTypes.string
  })
};

MainComponent.defaultProps = {
  actions: null,
  secretSanta: {},
  notification: null
};

MainComponent.contextTypes = {
  router: PropTypes.shape({})
};

/* istanbul ignore next: not testing mapStateToProps */
const mapStateToProps = ({secretSanta, authentication}) => ({
  secretSanta: secretSanta.data,
  notification: secretSanta.notification,
  user: authentication.user
});

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators({
      secretSanta, addNotification,
      revealMySecretSanta
    }, dispatch)
  }
);

const MainConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);

export {
  MainComponent,
  MainConnectedComponent
};
