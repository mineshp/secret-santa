const API_URL='https://0kbaqlx1ue.execute-api.eu-west-1.amazonaws.com/dev/api';

export const successWelcomeMessage = (data) => ({
    type: 'WELCOME_MESSAGE_SUCCESS',
    data
});

export const errorWelcomeMessage = (error) => ({
    type: 'WELCOME_MESSAGE_ERROR',
    error
});

export function secretSanta() {
  return (dispatch) =>
      fetch(API_URL)
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
