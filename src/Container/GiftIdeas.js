import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGiftIdeas, addGiftIdeas } from '../actions/secretSanta';
import { addNotification } from '../actions/notification';
import GiftIdeas from '../Presentational/GiftIdeas';

class GiftIdeasComponent extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGiftIdeaNameChange = this.handleGiftIdeaNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      giftIdea0: '',
      giftIdea1: '',
      giftIdea2: '',
      wishlistName: ''
    };
  }

  async componentDidMount() {
    const { actions, user, match } = this.props;

    if (match.params && match.params.name) {
      this.setState({
        wishlistName: match.params.name
      })
      this.getGiftIdeas(match.params.name);
    }
  }

  async getGiftIdeas(name) {
    const { actions, user } = this.props;

    if (user) {
      const getGiftIdeasFor = (name) ? name : user.memberName;
      const { type, data } = await actions.getGiftIdeas(getGiftIdeasFor, user.groupID);
      if (type === 'GET_GIFTIDEAS_SUCCESS') {
        console.log('DATA FROM GET GIFTIDEAS');
        console.log(data);
        this.setState({
          giftIdea0: data.giftIdeas[0],
          giftIdea1: data.giftIdeas[1],
          giftIdea2: data.giftIdeas[2]
        })
      }
    }
  }

  async updateGiftIdeas() {
    const { giftIdea0, giftIdea1, giftIdea2 } = this.state;
    const { user: { memberName, groupID } } = this.props;

    const allGiftIdeaSuggestions = [];
    allGiftIdeaSuggestions.push(giftIdea0, giftIdea1, giftIdea2);

    await this.props.actions.addGiftIdeas(memberName, groupID, { giftIdeas: allGiftIdeaSuggestions })
      .then(() => this.getGiftIdeas());

    this.props.actions.addNotification(this.props.notification);
  }

  handleGiftIdeaNameChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
        [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.updateGiftIdeas();
  }

  render() {
    const { user } = this.props;
    const { wishlistName, giftIdea0, giftIdea1, giftIdea2 } = this.state;

    return (
      <GiftIdeas
        data={{ giftIdeas: [giftIdea0, giftIdea1, giftIdea2] }}
        user={user}
        handleGiftIdeaNameChange={this.handleGiftIdeaNameChange}
        handleSubmit={this.handleSubmit}
        wishlistFor={wishlistName}
      />
    );
  }
}

GiftIdeasComponent.propTypes = {
  actions: PropTypes.shape({
    getGiftIdeas: PropTypes.func.isRequired,
    addGiftIdeas: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired
  }),
  notification: PropTypes.shape({
    message: PropTypes.string,
    level: PropTypes.string,
    title: PropTypes.string
  })
};

GiftIdeasComponent.defaultProps = {
  actions: null,
  notification: null
};

GiftIdeasComponent.contextTypes = {
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
      getGiftIdeas, addGiftIdeas, addNotification
    }, dispatch)
  }
);

const GiftIdeasConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftIdeasComponent);

export {
  GiftIdeasComponent,
  GiftIdeasConnectedComponent
};
