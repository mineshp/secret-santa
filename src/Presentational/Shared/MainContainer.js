import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MainConnectedComponent } from '../../Container/Main';

import NotFound from './NotFound';

const Main = () => (
  <Switch>
    <Route exact path="/" component={MainConnectedComponent} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Main;
