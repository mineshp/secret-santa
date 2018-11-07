import React from 'react';
import MainNav from './Presentational/Shared/MainNav';
import MainContainer from './Presentational/Shared/MainContainer';
import Notification from './Container/Shared/Notification';
import './App.css';

const App = () => (
  <div className="App main-container">
    <Notification props />
    <MainNav />
    <MainContainer />
  </div>
);

export default App;
