import { addNotification } from '../notification';

describe('Notification actions', () => {
  describe('addNotification Action', () => {
    it('should dispatch an action for ADD_NOTIFICATION when calling addNotification', () => {
      const expectedAction = {
        type: 'ADD_NOTIFICATION',
        message: 'Hi, there',
        level: 'info',
        title: 'Information: Welcome'
      };
      expect(addNotification({
        message: 'Hi, there',
        level: 'info',
        title: 'Information: Welcome'
      })).toEqual(expectedAction);
    });
  });
});
