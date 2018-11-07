import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../media';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = (status, statusText, response) => new window.Response(response, {
  status,
  statusText,
  headers: {
    'Content-type': 'application/json'
  }
});

describe('Welcome actions', () => {
  const url = '/dev';
  const mockRetrieveWelcomeSuccessAPIResponse = [{ product: 123 }];
  const mockRetrieveWelcomeFailureAPIResponse = {
    message: 'Unable to retrieve welcome.'
  };

  it('should dispatch an action for WELCOME_MESSAGE_SUCCESS when calling successWelcomeMessage', () => {
    const expectedAction = {
      type: 'WELCOME_MESSAGE_SUCCESS',
      data: mockRetrieveWelcomeSuccessAPIResponse
    };

    expect(actions.successWelcomeMessage(mockRetrieveWelcomeSuccessAPIResponse))
      .toEqual(expectedAction);
  });

  it('should dispatch an action for WELCOME_MESSAGE_ERROR when calling errorWelcomeMessage to notify the user we were unable to retrieve media', () => {
    const expectedAction = {
      type: 'MEDIA_RETRIEVED_ERROR',
      error: mockRetrieveWelcomeFailureAPIResponse.message
    };

    expect(actions.errorRetrievingProductWithMedia(mockRetrieveWelcomeFailureAPIResponse.message))
      .toEqual(expectedAction);
  });

  it('successful welcome via the store, dispatches WELCOME_MESSAGE_SUCCESS action', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(
      mockResponse(200, null, JSON.stringify(mockRetrieveWelcomeSuccessAPIResponse))
    ));

    const store = mockStore({ welcomeMessage: [] });

    const expectedActions = [
      {
        type: 'WELCOME_MESSAGE_SUCCESS',
        data: mockRetrieveWelcomeSuccessAPIResponse
      }
    ];

    return store.dispatch(actions.welcome()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('unsuccessful welcome via the store, dispatches WELCOME_MESSAGE_ERROR action', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(
      mockResponse(500, null, JSON.stringify(mockRetrieveWelcomeFailureAPIResponse))
    ));

    const store = mockStore({ welcomeMessage: [] });

    const expectedAction = [
      {
        type: 'WELCOME_MESSAGE_ERROR',
        error: mockRetrieveWelcomeFailureAPIResponse.message
      }
    ];

    return store.dispatch(actions.welcome()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
