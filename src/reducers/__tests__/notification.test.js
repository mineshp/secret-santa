import notification from '../notification';

describe('notification reducer', () => {
  describe('ADD_NOTIFICATION ACTIONS', () => {
    it('should handle initial state', () => {
      expect(notification(undefined, {})).toEqual({});
    });

    it('should handle ADD_NOTIFICATION', () => {
      expect(notification({}, {
        type: 'ADD_NOTIFICATION',
        message: 'Well Done, You did it!',
        level: 'success',
        title: 'Success'
      })).toEqual({
        message: 'Well Done, You did it!',
        level: 'success',
        title: 'Success'
      });
    });
  });
});
