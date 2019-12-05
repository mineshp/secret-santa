import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Entry from './Features/Authentication/Entry';
import SecretSanta from './Features/SecretSanta/Main';
import Wishlist from './Features/SecretSanta/Wishlist';
import Panel from './Features/Admin/Panel';
import Terms from './Shared/Terms';
import Privacy from './Shared/Privacy';
import Enrol from './Features/Authentication/Enrol';
import NotFound from './Shared/NotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Entry} />
    <Route exact path="/secretsanta" component={SecretSanta} />
    <Route exact path="/secretsanta/wishlist/:memberName/:groupID" component={Wishlist} />
    <Route exact path="/terms" component={Terms} />
    <Route exact path="/privacy" component={Privacy} />
    <Route exact path="/enrol" component={Enrol} />
    <Route exact path="/admin" component={Panel} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
