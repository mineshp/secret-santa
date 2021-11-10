import React, { useContext } from 'react';
import SecretSanta from '../SecretSanta/Main';
import Login from './Login';
import { UserContext } from './useAuth';

export default function EntryApp() {
  const { user } = useContext(UserContext);
  return user ? <SecretSanta member={user} /> : <Login />;
}
