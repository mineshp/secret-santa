const secretSanta = (state = {}, action) => {
  switch (action.type) {
  case 'WELCOME_MESSAGE_SUCCESS':
    return {
      notification: {
          message: `Successfully got message ${action.data}.`,
          level: 'success',
          title: 'Success'
      },
      data: action.data
    };

  case 'WELCOME_MESSAGE_ERROR':
    return {
      notification: {
          message: action.error,
          level: 'error',
          title: 'Error'
      },
      error: {
          isError: true
      }
    };

  default:
      return state;
  }
};

export default secretSanta;
