import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom'
import { fireEvent, render, waitForElement } from '@testing-library/react';
import { UserProvider } from '../useAuth';
import Login from '../Login';
import api from '../../../Services/api';

jest.mock('../../../Services/api');
jest.mock('jwt-decode');

describe('login', () => {
  let renderComponent;

  beforeEach(() => {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('isLoggedIn');

    const history = createMemoryHistory();

    renderComponent = render(
      <UserProvider>
        <Router history={history}>
          <Login /></Router>
      </UserProvider>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('is successful', async () => {
    const { getByText, getByLabelText } = renderComponent;
    const mockUserResponse = {
      data: JSON.stringify({ token: 'fake_user_token' })
    };

    api.post.mockImplementationOnce(() => {
      return Promise.resolve(mockUserResponse);
    });

    fireEvent.change(getByLabelText('memberName'), {
      target: { value: 'test-user' }
    });

    fireEvent.change(getByLabelText('groupID'), {
      target: { value: 'test-group' }
    });

    fireEvent.change(getByLabelText('passphrase'), {
      target: { value: 'pass123' }
    });

    fireEvent.click(getByText('Login'));

    await waitForElement(() => getByText('TEST-USER - Successfully logged in'));
    expect(window.localStorage.getItem('jwtToken')).toEqual('fake_user_token');
    expect(window.localStorage.getItem('isLoggedIn')).toEqual('true');
  });

  it('login failed invalid token', async () => {
    const { getByText, getByLabelText } = renderComponent;
    const mockUserResponse = {
      data: JSON.stringify({ error: 'oops error occurred!' })
    };

    api.post.mockImplementationOnce(() => {
      return Promise.resolve(mockUserResponse);
    });

    fireEvent.change(getByLabelText('memberName'), {
      target: { value: 'test-user' }
    });

    fireEvent.change(getByLabelText('groupID'), {
      target: { value: 'test-group' }
    });

    fireEvent.change(getByLabelText('passphrase'), {
      target: { value: 'pass123' }
    });

    fireEvent.click(getByText('Login'));

    await waitForElement(() => getByText('Unable to login, oops error occurred!'));
    expect(window.localStorage.getItem('jwtToken')).toEqual(null);
    expect(window.localStorage.getItem('isLoggedIn')).toEqual(null);
  });

  it('login failed incorrect details', async () => {
    const { getByText, getByLabelText } = renderComponent;
    api.post.mockImplementationOnce(() => {
      return Promise.reject(new Error('oops an error occurred'));
    });

    fireEvent.change(getByLabelText('memberName'), {
      target: { value: 'test-user' }
    });

    fireEvent.change(getByLabelText('groupID'), {
      target: { value: 'test-group' }
    });

    fireEvent.change(getByLabelText('passphrase'), {
      target: { value: 'pass123' }
    });

    fireEvent.click(getByText('Login'));

    await waitForElement(() => getByText('Login failed, details maybe incorrect!'));
    expect(window.localStorage.getItem('jwtToken')).toEqual(null);
    expect(window.localStorage.getItem('isLoggedIn')).toEqual(null);
  });

  describe('login failed field', () => {
    const formFieldsToEnter = {
      memberName: ['groupID', 'passphrase'],
      groupID: ['memberName', 'passphrase'],
      passphrase: ['memberName', 'groupID']
    };

    ['memberName', 'groupID', 'passphrase'].forEach((fieldToOmit) => {
      it(`${fieldToOmit} missing`, async () => {
        const { getByText, getByLabelText } = renderComponent;

        formFieldsToEnter[fieldToOmit].forEach((field) => {
          fireEvent.change(getByLabelText(field), {
            target: { value: `test-${field}` }
          });
        });

        fireEvent.click(getByText('Login'));

        await waitForElement(() => getByText('Name, group or passphrase missing!'));
        expect(window.localStorage.getItem('jwtToken')).toEqual(null);
        expect(window.localStorage.getItem('isLoggedIn')).toEqual(null);
      });
    });
  });
});

