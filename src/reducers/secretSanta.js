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

  case 'GET_GIFTIDEAS_SUCCESS':
    return {
      notification: {
          message: `Successfully got giftideas: ${action.data.giftIdeas}.`,
          level: 'success',
          title: 'Success'
      },
      data: action.data
    };

  case 'GET_GIFTIDEAS_ERROR':
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

    case 'ADD_GIFTIDEAS_SUCCESS':
    return {
      notification: {
          message: `Successfully updated giftideas: ${action.data.giftIdeas}.`,
          level: 'success',
          title: 'Success'
      },
      data: action.data
    };

  case 'ADD_GIFTIDEAS_ERROR':
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

  case 'REVEAL_SECRET_SANTA_SUCCESS':
    return {
      notification: {
          message: `Successfully revealed my secret santa.`,
          level: 'success',
          title: 'Success'
      },
      data: action.data
    };

  case 'REVEAL_SECRET_SANTA_ERROR':
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
