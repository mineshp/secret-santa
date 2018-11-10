import React from 'react';
import MainContainer from './Presentational/Shared/MainContainer';
import Notification from './Container/Shared/Notification';
import './App.css';

const App = () => (
  <div className="App main-container main-page-image">
    <Notification props />
    <MainContainer />
  </div>
);

export default App;
