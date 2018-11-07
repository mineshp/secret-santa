// eslint-disable-next-line import/prefer-default-export
export const addNotification = ({ message, level, title }) => ({
  type: 'ADD_NOTIFICATION',
  message,
  level,
  title
});
