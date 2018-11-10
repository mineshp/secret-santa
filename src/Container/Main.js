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

    // this.handleGiftIdeaNameChange = this.handleGiftIdeaNameChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.revealMySecretSanta = this.revealMySecretSanta.bind(this);

    // this.state = {
    //   giftIdea0: '',
    //   giftIdea1: '',
    //   giftIdea2: ''
    // };
  }

  // async componentDidMount() {
  //   const { actions, user } = this.props;

  //   // this.getGiftIdeas();
  // }

  // async getGiftIdeas() {
  //   const { actions, user } = this.props;

  //   if (user) {
  //     const { type, data } = await actions.getGiftIdeas(user.memberName, user.groupID);
  //     if (type === 'GET_GIFTIDEAS_SUCCESS') {
  //       this.setState({
  //         giftIdea0: data.giftIdeas[0],
  //         giftIdea1: data.giftIdeas[1],
  //         giftIdea2: data.giftIdeas[2]
  //       })
  //     }
  //   }
  // }

  // async updateGiftIdeas() {
  //   const { giftIdea0, giftIdea1, giftIdea2 } = this.state;
  //   const { user: { memberName, groupID } } = this.props;

  //   const allGiftIdeaSuggestions = [];
  //   allGiftIdeaSuggestions.push(giftIdea0, giftIdea1, giftIdea2);

  //   await this.props.actions.addGiftIdeas(memberName, groupID, { giftIdeas: allGiftIdeaSuggestions })
  //     .then(() => this.getGiftIdeas());

  //   this.props.actions.addNotification(this.props.notification);
  // }

  async revealMySecretSanta() {
    const { user: { memberName, groupID } } = this.props;

    await this.props.actions.revealMySecretSanta(memberName, groupID);
  }

  // handleGiftIdeaNameChange(event) {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   this.setState({
  //       [name]: value
  //   });
  // }

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
          // handleGiftIdeaNameChange={this.handleGiftIdeaNameChange}
          // handleSubmit={this.handleSubmit}
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
