import setAuthorisationToken from '../utils/setAuthorisationToken';
import Auth from '../Container/Authentication/Auth';

const API_URL='https://0kbaqlx1ue.execute-api.eu-west-1.amazonaws.com/dev/api';
const auth = new Auth();

export const successLogin = (user) => console.log(user) || ({
  type: 'SUCCESS_LOGIN',
  user
});

export const errorLogin = (error) => ({
  type: 'ERROR_LOGIN',
  error
});

export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    user
  };
}

export function loginUser(loginDetails) {
    const token = auth.getToken();
    return (dispatch) =>
      fetch(`${API_URL}/user/login`, {
        method: 'post',
        headers: setAuthorisationToken(token),
        body: JSON.stringify(loginDetails)
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error(
              `Unable to login with name ${loginDetails.memberName}.`
            ));
        })
        .then((data) => {
          const { token, error } = JSON.parse(data);
          if (token) {
            auth.setToken(token);
          } else if (error) {
            return dispatch(errorLogin(error.message));
          }

          const decodedUser = auth.getUser(token);
          dispatch(setCurrentUser(decodedUser));
          return dispatch(successLogin(decodedUser));
        })
        .catch((error) => dispatch(errorLogin(error.message)));
}

export function logout() {
    return (dispatch) => {
        auth.logout();
        // delete headers.Authorization; for future requests
        dispatch(setCurrentUser({}));
    };
}
