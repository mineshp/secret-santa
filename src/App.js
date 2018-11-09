import React from 'react';
import { MainNavConnectedComponent } from './Container/Shared/MainNav';
import MainContainer from './Presentational/Shared/MainContainer';
import Notification from './Container/Shared/Notification';
import './App.css';

const App = () => (
  <div className="App main-container">
    <Notification props />
    <MainNavConnectedComponent />
    <MainContainer />
  </div>
);

export default App;
