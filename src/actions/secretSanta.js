import setAuthorisationToken from '../utils/setAuthorisationToken';
import Auth from '../Container/Authentication/Auth';

const auth = new Auth();
const API_URL = 'https://0kbaqlx1ue.execute-api.eu-west-1.amazonaws.com/dev/api';

export const successWelcomeMessage = (data) => ({
    type: 'WELCOME_MESSAGE_SUCCESS',
    data
});

export const errorWelcomeMessage = (error) => ({
    type: 'WELCOME_MESSAGE_ERROR',
    error
});

export const successGetGiftIdeas = (data) => ({
  type: 'GET_GIFTIDEAS_SUCCESS',
  data
});

export const errorGetGiftIdeas = (error) => ({
  type: 'GET_GIFTIDEAS_ERROR',
  error
});

export const successAddGiftIdeas = (data) => ({
  type: 'ADD_GIFTIDEAS_SUCCESS',
  data
});

export const errorAddGiftIdeas = (error) => ({
  type: 'ADD_GIFTIDEAS_ERROR',
  error
});

export const successRevealSecretSanta = (data) => ({
  type: 'REVEAL_SECRET_SANTA_SUCCESS',
  data
});

export const errorRevealSecretSanta = (error) => ({
  type: 'REVEAL_SECRET_SANTA_ERROR',
  error
});

export function secretSanta() {
  const token = auth.getToken();
  return (dispatch) =>
      fetch(API_URL, { headers: setAuthorisationToken(token) })
      .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error(`Error getting message.`)
          );
        })
        .then((data) => dispatch(successWelcomeMessage(data)))
        .catch((error) => dispatch(errorWelcomeMessage(error.message)));
}

export function addGiftIdeas(memberName, groupID, giftIdeas) {
  const token = auth.getToken();
  return (dispatch) =>
    fetch(`${API_URL}/secretsanta/giftIdeas/${memberName}/${groupID}`, {
      method: 'put',
      headers: setAuthorisationToken(token),
      body: JSON.stringify(giftIdeas)
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(`Error getting message.`)
        );
      })
      .then((data) => dispatch(successAddGiftIdeas(data)))
      .catch((error) => dispatch(errorAddGiftIdeas(error.message)));
}

export function getGiftIdeas(memberName, groupID) {
  const token = auth.getToken();
  return (dispatch) =>
    fetch(`${API_URL}/secretsanta/giftIdeas/${memberName}/${groupID}`, {
      headers: setAuthorisationToken(token)
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(`Error getting message.`)
        );
      })
      .then((data) => dispatch(successGetGiftIdeas(data)))
      .catch((error) => dispatch(errorGetGiftIdeas(error.message)));
}

export function revealMySecretSanta(memberName, groupID) {
  const token = auth.getToken();
  return (dispatch) =>
    fetch(`${API_URL}/secretsanta/reveal/${memberName}/${groupID}`, {
      headers: setAuthorisationToken(token)
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(`Error getting message.`)
        );
      })
      .then((data) => dispatch(successRevealSecretSanta(data)))
      .catch((error) => dispatch(errorRevealSecretSanta(error.message)));
}