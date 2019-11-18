import React, { useReducer } from 'react';

const initialState = {};

const authReducer = (prevState, data) => {
  switch (data.type) {
    case 'SET_USER':
      return {
        ...prevState,
        ...data
      }
    case 'GET_USER':
      return prevState;
    case 'REMOVE_USER':
      const {
        user,
        ...loggedOutUser
      } = prevState;
      return {
        ...loggedOutUser
      }
    default:
      return prevState;
  }
};

export const UserContext = React.createContext({});

export function UserProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <UserContext.Provider value={{ user: state.user, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
}
