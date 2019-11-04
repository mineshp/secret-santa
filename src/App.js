import React from 'react';
import Routes from './Routes';
import './App.css';
import { StateProvider } from './State';

const App = () => {
  const initialState = {
    member: undefined
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_MEMBER':
        return {
          ...state,
          member: action.member
        };
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className="App main-container">
        <Routes />
      </div>
    </StateProvider>
  );
};

export default App;
