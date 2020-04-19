import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { getMember } from './Auth';

const initialState = {};

const authReducer = (prevState, data) => {
  switch (data.type) {
    case 'SET_USER':
      return {
        ...prevState,
        ...data
      };
    case 'GET_USER': {
      return getMember();
    }
    case 'REMOVE_USER': {
      const {
        // eslint-disable-next-line no-unused-vars
        user,
        ...loggedOutUser
      } = prevState;
      return {
        ...loggedOutUser
      };
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

UserProvider.propTypes = {
  children: PropTypes.element.isRequired
};