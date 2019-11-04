import React, { useState } from 'react';
import SecretSanta from '../SecretSanta/Main';
import Login from './Login';
import { getMember, getToken } from './Auth';

export default function EntryApp() {
  const [member, setMember] = useState(null);

  const renderApp = () => {
    if (getToken()) {
      const userSession = getMember();
      if (userSession && userSession.memberName) {
        return <SecretSanta member={userSession} />;
      }
    }
    return <Login setMember={setMember} />;
  };

  return (
    <div className="container">
      {renderApp()}
    </div>
  );
}
