import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../../actions/authentication';
import { addNotification } from '../../actions/notification';
import LoginForm from '../../Presentational/Authentication/Login';
import Auth from './Auth';

class Login extends Component {
  constructor(props, context) {
      super(props, context);

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.auth = new Auth();

      this.state = {
        memberName: null,
        groupID: null,
        passphrase: null
      };
  }

  componentDidMount() {
    const { isAuthenticated } = this.props.authentication;

    if (isAuthenticated) {
      this.context.router.history.push('/');
    }
  }

  async loginUser() {
      const loginDetails = {
        memberName: this.state.memberName,
        groupID: this.state.groupID,
        passphrase: this.state.passphrase
      };

      const loginStatus = await this.props.actions.loginUser(loginDetails);
      this.props.actions.addNotification(this.props.notification);
      if (loginStatus.type === 'SUCCESS_LOGIN') {
          this.context.router.history.push('/');
      }
  }

  handleChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({
          [name]: value
      });
  }

  async handleSubmit(event) {
      event.preventDefault();
      if (this.state.memberName && this.state.groupID && this.state.passphrase) {
          return this.loginUser();
      }
      return undefined;
  }

    render() {
      return (
          <div>
              <LoginForm
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  data={this.state}
              />
          </div>
      );
  }
}

Login.propTypes = {
  actions: PropTypes.shape({
      loginUser: PropTypes.func.isRequired,
      addNotification: PropTypes.func.isRequired
  }),
  notification: PropTypes.shape({
      message: PropTypes.string,
      level: PropTypes.string,
      title: PropTypes.string
  })
};

Login.defaultProps = {
  actions: null,
  authentication: null,
  notification: null
};

Login.contextTypes = {
  router: PropTypes.object
};

/* istanbul ignore next: not testing mapStateToProps */
const mapStateToProps = (state) => (
  {
      authentication: state.authentication,
      notification: state.authentication.notification
  }
);

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
  {
      actions: bindActionCreators({
          loginUser, addNotification
      }, dispatch)
  }
);

const LoginConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export {
  Login,
  LoginConnectedComponent
};
