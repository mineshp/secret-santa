import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { UserProvider } from '../../Authentication/useAuth';
import Main from '../Main';
import api from '../../../Services/api';

jest.mock('../../../Services/api');

describe('Main', () => {
  let member;
  let history;

  const setup = () =>
    render(
      <UserProvider>
        <Router history={history}>
          <Main member={member} />
        </Router>
      </UserProvider>
    );

  beforeEach(() => {
    history = createMemoryHistory();

    member = {
      memberName: 'santa',
      groupID: 'northpole',
      secretSanta: window.btoa('rudolph'),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Displays notification if reveal button clicked before draw has been made', async () => {
    setup();
    await screen.findByText('Ho Ho Ho!');

    expect(history.location.pathname).toEqual('/');

    const mockUserResponse = { data: {} };

    api.get.mockImplementationOnce(() => Promise.resolve(mockUserResponse));

    fireEvent.click(screen.getByText('Reveal'));

    expect(api.get).toHaveBeenCalledTimes(1);

    expect(api.get).toHaveBeenCalledWith(
      `/reveal/${member.memberName}/${member.groupID}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    await screen.findByText(
      "Draw has not taken place yet, please wait or contact your group's admin!"
    );
  });

  it('successfully reveals your giftee', async () => {
    setup();
    await screen.findByText('Ho Ho Ho!');

    expect(history.location.pathname).toEqual('/');

    const mockUserResponse = {
      data: { secretSanta: member.secretSanta },
    };

    api.get.mockImplementationOnce(() => Promise.resolve(mockUserResponse));

    fireEvent.click(screen.getByText('Reveal'));

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith(
      `/reveal/${member.memberName}/${member.groupID}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    const gifteeNameBtn = await screen.findByText('rudolph');
    expect(gifteeNameBtn).toBeInTheDocument();
    expect(screen.queryByText('Reveal')).not.toBeInTheDocument();
  });

  it('returns an error when the call to reveal giftee fails', async () => {
    setup();
    api.get.mockImplementationOnce(() =>
      Promise.reject(new Error('oops an error occurred!'))
    );

    fireEvent.click(screen.getByText('Reveal'));
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith(
      `/reveal/${member.memberName}/${member.groupID}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    await screen.findByText('oops an error occurred!');
  });

  it('successfully takes you to your wishlist', async () => {
    setup();
    await screen.findByText('Ho Ho Ho!');

    const mockUserResponse = {
      data: { secretSanta: member.secretSanta },
    };

    api.get.mockImplementationOnce(() => Promise.resolve(mockUserResponse));

    const myWishlistBtn = screen.getByText('My Wishlist');

    fireEvent.click(myWishlistBtn);

    expect(history.location.pathname).toEqual(
      `/secretsanta/wishlist/${member.memberName}/${member.groupID}`
    );
  });

  it("successfully takes you to your giftee's wishlist once you have revealed you giftee", async () => {
    setup();
    await screen.findByText('Ho Ho Ho!');

    const mockUserResponse = {
      data: { secretSanta: member.secretSanta },
    };

    api.get.mockImplementationOnce(() => Promise.resolve(mockUserResponse));

    fireEvent.click(screen.getByText('Reveal'));

    await screen.findByText("rudolph's Wishlist");

    fireEvent.click(screen.getByText("rudolph's Wishlist"));

    expect(history.location.pathname).toEqual(
      `/secretsanta/wishlist/rudolph/${member.groupID}`
    );
  });
});
