import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { secretSanta } from '../actions/secretSanta';
import { addNotification } from '../actions/notification';
import Main from '../Presentational/Main';

class MainComponent extends Component {
  async componentDidMount() {
    const { actions } = this.props;

    await actions.secretSanta();
  }

  render() {
    const { secretSanta } = this.props;
    if (secretSanta) {
      return (
        <Main data={secretSanta}/>
      );
    }
    return;

  }
}

MainComponent.propTypes = {
  actions: PropTypes.shape({
    secretSanta: PropTypes.func.isRequired,
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
const mapStateToProps = ({secretSanta}) => ({
  secretSanta: secretSanta.data,
  notification: secretSanta.notification
});

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators({
      secretSanta, addNotification
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
