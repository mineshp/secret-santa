import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNotification } from '../actions/notification';

export default function (ComposedComponent) {
    class Authenticate extends Component {
        /* istanbul ignore next: not testing componentWillMount */
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this.props.actions.addNotification({
                    message: 'You need to login to access this page',
                    level: 'error',
                    title: 'Authentication Error'
                });
                this.context.router.history.push('/user/login');
            }
        }

        /* istanbul ignore next: not testing componentWillMount */
        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.context.router.history.push('/');
            }
        }

        /* istanbul ignore next: not testing render */
        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    Authenticate.propTypes = {
        actions: PropTypes.shape({
            addNotification: PropTypes.func.isRequired
        }),
        isAuthenticated: PropTypes.bool.isRequired
    };

    Authenticate.defaultProps = {
        actions: null
    };

    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    };

    /* istanbul ignore next: not testing mapStateToProps */
    const mapStateToProps = (state) => (
        {
            isAuthenticated: state.authentication.isAuthenticated
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

    /* istanbul ignore next: not testing connect */
    return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
