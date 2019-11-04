import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Entry from './Features/Authentication/Entry';
import SecretSanta from './Features/SecretSanta/Main';
import Wishlist from './Features/SecretSanta/Wishlist';
import Admin from './Features/Admin/Manage';

import NotFound from './Shared/NotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Entry} />
    <Route exact path="/secretsanta" component={SecretSanta} />
    <Route exact path="/secretsanta/wishlist/:memberName/:groupID" component={Wishlist} />
    <Route exact path="/admin" component={Admin} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
