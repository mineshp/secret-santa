import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProvider } from '../useAuth';
import Login from '../Login';
import api from '../../../Services/api';

jest.mock('../../../Services/api');
jest.mock('jwt-decode');

describe('login', () => {
  const history = createMemoryHistory();
  const setup = () =>
    render(
      <UserProvider>
        <Router history={history}>
          <Login />
        </Router>
      </UserProvider>
    );
  beforeEach(() => {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('isLoggedIn');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('is successful', async () => {
    setup();
    const mockUserResponse = {
      data: JSON.stringify({ token: 'fake_user_token' }),
    };

    api.post.mockImplementationOnce(() => Promise.resolve(mockUserResponse));

    userEvent.clear(screen.getByLabelText('memberName'));
    await userEvent.type(screen.getByLabelText('memberName'), 'test-user');

    userEvent.clear(screen.getByLabelText('groupID'));
    await userEvent.type(screen.getByLabelText('groupID'), 'test-group');

    userEvent.clear(screen.getByLabelText('passphrase'));
    await userEvent.type(screen.getByLabelText('passphrase'), 'pass123');

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await screen.findByText('TEST-USER - Successfully logged in');
    expect(window.localStorage.getItem('jwtToken')).toEqual('fake_user_token');
    expect(window.localStorage.getItem('isLoggedIn')).toEqual('true');
  });

  it('login failed invalid token', async () => {
    setup();
    const mockUserResponse = {
      data: JSON.stringify({ error: 'oops error occurred!' }),
    };

    api.post.mockImplementationOnce(() => Promise.resolve(mockUserResponse));

    userEvent.clear(screen.getByLabelText('memberName'));
    await userEvent.type(screen.getByLabelText('memberName'), 'test-user');

    userEvent.clear(screen.getByLabelText('groupID'));
    await userEvent.type(screen.getByLabelText('groupID'), 'test-group');

    userEvent.clear(screen.getByLabelText('passphrase'));
    await userEvent.type(screen.getByLabelText('passphrase'), 'pass123');
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await screen.findByText('Unable to login, oops error occurred!');
    expect(window.localStorage.getItem('jwtToken')).toEqual(null);
    expect(window.localStorage.getItem('isLoggedIn')).toEqual(null);
  });

  it('login failed incorrect details', async () => {
    setup();
    api.post.mockImplementationOnce(() =>
      Promise.reject(new Error('oops an error occurred'))
    );

    userEvent.clear(screen.getByLabelText('memberName'));
    await userEvent.type(screen.getByLabelText('memberName'), 'test-user');

    userEvent.clear(screen.getByLabelText('groupID'));
    await userEvent.type(screen.getByLabelText('groupID'), 'test-group');

    userEvent.clear(screen.getByLabelText('passphrase'));
    await userEvent.type(screen.getByLabelText('passphrase'), 'pass123');

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await screen.findByText('Login failed, details maybe incorrect!');
    expect(window.localStorage.getItem('jwtToken')).toEqual(null);
    expect(window.localStorage.getItem('isLoggedIn')).toEqual(null);
  });

  describe('login failed due to missing field', () => {
    const formFieldsToEnter = {
      memberName: ['groupID', 'passphrase'],
      groupID: ['memberName', 'passphrase'],
      passphrase: ['memberName', 'groupID'],
    };

    ['memberName', 'groupID', 'passphrase'].forEach((fieldToOmit) => {
      it(`${fieldToOmit} missing`, async () => {
        setup();
        formFieldsToEnter[fieldToOmit].forEach(async (field) => {
          fireEvent.change(screen.getByLabelText(field), {
            target: { value: `test-${field}` },
          });
        });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await screen.findByText('Name, group or passphrase missing!');
        expect(window.localStorage.getItem('jwtToken')).toEqual(null);
        expect(window.localStorage.getItem('isLoggedIn')).toEqual(null);
      });
    });
  });
});
