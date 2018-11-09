import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MainConnectedComponent } from '../../Container/Main';
import { LoginConnectedComponent } from '../../Container/Authentication/Login';
import NotFound from './NotFound';
import requireAuth from '../../utils/requireAuth';

const Main = () => (
  <Switch>
    <Route exact path="/" component={requireAuth(MainConnectedComponent)} />
    <Route exact path="/user/login" component={LoginConnectedComponent} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Main;
