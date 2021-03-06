import React from 'react';
import AppContainer from './AppContainer';

// import './App.css';
import { UserProvider } from './Features/Authentication/useAuth';

const App = () => {
  return (
    <UserProvider>
      <AppContainer />
    </UserProvider>
  );
};

export default App;
