import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/authentication';
import MainNavComponent from '../../Presentational/Shared/MainNav';

class MainNav extends Component {
    constructor(props, context) {
        super(props, context);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.actions.logout();
        this.context.router.history.push('/user/login');
    }

    /* istanbul ignore next: not testing render */
    render() {
        const { user } = this.props;

        return (
            <MainNavComponent
                user={user}
                logout={this.logout}
            />
        );
    }
}

/* istanbul ignore next: not testing mapStateToProps */
const mapStateToProps = (state) => ({
    user: state.authentication.user
});

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({ logout }, dispatch)
    }
);

const MainNavConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainNav);

MainNav.propTypes = {
    user: PropTypes.shape({
        memberName: PropTypes.string,
        isAdmin: PropTypes.bool,
        email: PropTypes.string,
        groupID: PropTypes.string
    }),
    actions: PropTypes.shape({
        logout: PropTypes.func.isRequired
    })
};

MainNav.defaultProps = {
    user: null,
    actions: null
};

MainNav.contextTypes = {
    router: PropTypes.object
};

export {
    MainNav,
    MainNavConnectedComponent
};
