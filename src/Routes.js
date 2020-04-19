import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Entry from './Features/Authentication/Entry';
import Wishlist from './Features/SecretSanta/Wishlist';
import Panel from './Features/Admin/Panel';
import Terms from './Shared/Terms';
import Privacy from './Shared/Privacy';
import Enrol from './Features/Authentication/Enrol';
import NotFound from './Shared/NotFound';
import Unauthorised from './Shared/Unauthorised';
import { UserContext } from './Features/Authentication/useAuth';


const AuthorisedRoute = ({ component: Component, isAuthorised, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthorised === true
      ? <Component {...props} />
      : <Unauthorised />
  )} />
);

const AdminRoute = ({ component: Component, isAuthorised, isAdmin, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthorised === true && isAdmin === true
      ? <Component {...props} />
      : <Unauthorised />
  )} />
);

AuthorisedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthorised: PropTypes.bool.isRequired,
};

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthorised: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
};

export default function Routes() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.admin);
      setIsAuthorised(true);
    }
  }, [user]);

  return (
    <Switch>
      <Route exact path="/" component={Entry} />
      <AuthorisedRoute isAuthorised={isAuthorised} exact path="/secretsanta/wishlist/:memberName/:groupID" component={Wishlist} />
      <Route exact path="/terms" component={Terms} />
      <Route exact path="/privacy" component={Privacy} />
      <Route exact path="/enrol" component={Enrol} />
      <AdminRoute path='/admin' isAuthorised={isAuthorised} isAdmin={isAdmin} component={Panel} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

