import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setup, draw } from '../actions/secretSanta';
import { addNotification } from '../actions/notification';
import Admin from '../Presentational/Admin';
import uuidv4 from 'uuid/v4';

class AdminComponent extends Component {
  constructor(props) {
    super(props);
    this.setupGroup = this.setupGroup.bind(this);
    this.handleSetup = this.handleSetup.bind(this);
    this.handleDraw = this.handleDraw.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addMember = this.addMember.bind(this);
    this.state = {
      groupID: null,
      group: [
        { rowId: uuidv4(), memberName: '', email: '' }
      ],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params && match.params.groupID) {
      this.setState({ groupID: match.params.groupID });
    }
  }

  addMember() {
    const newItemRows = [...this.state.group, {
      rowId: uuidv4(),
      memberName: '',
      email: ''
    }];

    this.setState({
        group: newItemRows
    });
  }

  async setupGroup() {
    const { actions, match, notification } = this.props;
    const { group } = this.state;

    const parseGroup = group.reduce((acc, { memberName, email }) => [...acc, {
      memberName,
      email
    }], []);

    if (match.params && match.params.groupID) {
      await actions.setup(match.params.groupID, parseGroup);
      // actions.addNotification(notification);
    }
  }

  async generateDraw() {
    const { actions, match, notification } = this.props;

    if (match.params && match.params.groupID) {
      await actions.draw(match.params.groupID);
      // actions.addNotification(notification);
    }
  }

  handleInputChange(event, data) {
    const name = event.target.name;
    const value = event.target.value;

    const rowToReplaceIndex = this.state.group.findIndex((row) => row.rowId === data.id);
    const itemsClone = [...this.state.group];
    const rowToUpdate = itemsClone[rowToReplaceIndex];
    rowToUpdate[name] = value;

    this.setState({
       group: itemsClone
    });
  }

  async handleSetup(event) {
    event.preventDefault();
    await this.setupGroup();
  }

  async handleDraw(event) {
    event.preventDefault();
    await this.generateDraw();
  }

  render() {
    const { secretSanta } = this.props;
    const { groupID, group } = this.state;

    if (secretSanta) {
      return (
        <Admin
          groupID={groupID}
          handleInputChange={this.handleInputChange}
          handleSetup={this.handleSetup}
          handleDraw={this.handleDraw}
          addMember={this.addMember}
          group={group}
        />
      );
    }
    return;

  }
}

AdminComponent.propTypes = {
  actions: PropTypes.shape({
    setup: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired,
    draw: PropTypes.func.isRequired,
  }),
  secretSanta: PropTypes.shape({}),
  notification: PropTypes.shape({
    message: PropTypes.string,
    level: PropTypes.string,
    title: PropTypes.string
  })
};

AdminComponent.defaultProps = {
  actions: null,
  secretSanta: {},
  notification: null
};

AdminComponent.contextTypes = {
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
      setup, addNotification, draw
    }, dispatch)
  }
);

const AdminConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminComponent);

export {
  AdminComponent,
  AdminConnectedComponent
};
