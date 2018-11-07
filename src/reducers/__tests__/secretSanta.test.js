import welcome from '../welcome';

const initialState = {};

describe('Secret Santa reducer', () => {
  it('State should be set', () => {
    expect(welcome(undefined, {})).toEqual({});
  });
  describe('WELCOME ACTIONS', () => {
    it('should handle initial state', () => {
      expect(welcome(initialState, {})).toEqual(
        {}
      );
    });

    it('should handle WELCOME_MESSAGE_SUCCESS', () => {
      expect(welcome(initialState, {
        type: 'WELCOME_MESSAGE_SUCCESS',
        data: 'Welcome Sir'
      })).toEqual({
        notification: {
          message: '`Successfully got message Welcome.',
          level: 'success',
          title: 'Success'
        },
        data: 'Welcome Sir'
      });
    });

    it('should handle WELCOME_MESSAGE_ERROR', () => {
      expect(welcome(initialState, {
        type: 'WELCOME_MESSAGE_ERROR',
        error: 'Error retrieveing message'
      })).toEqual({
        notification: {
          message: 'Error retrieveing media',
          level: 'error',
          title: 'Error'
        },
        error: {
          isError: true
        }
      });
    });


  });
});
