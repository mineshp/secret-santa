import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { fireEvent, render, waitForElement, wait } from '@testing-library/react';
import { UserProvider } from '../../Authentication/useAuth';
import Main from '../Main';
import api from '../../../Services/api';

jest.mock('../../../Services/api');

describe('Main', () => {
  let renderComponent;
  let member;
  let history;

  beforeEach(() => {
    history = createMemoryHistory();

    member = {
      memberName: 'santa',
      groupID: 'northpole',
      secretSanta: window.btoa('rudolph')
    };

    renderComponent = render(
      <UserProvider>
        <Router history={history}>
          <Main member={member} /></Router>
      </UserProvider>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('successfully reveals your giftee', async () => {
    const { getByText, queryByText } = renderComponent;

    await waitForElement(() => getByText('Ho Ho Ho!'));

    expect(history.location.pathname).toEqual('/');

    const mockUserResponse = {
      data: { secretSanta: member.secretSanta }
    };

    api.get.mockImplementationOnce(() => {
      return Promise.resolve(mockUserResponse);
    });

    fireEvent.click(getByText('Reveal'));

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith(
      `/reveal/${member.memberName}/${member.groupID}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    const gifteeNameBtn = await waitForElement(() => getByText('rudolph'));
    expect(gifteeNameBtn).toBeDefined();
    expect(queryByText('Reveal')).toBeNull();
  });

  it('returns an error when the call to reveal giftee fails', async () => {
    const { getByText } = renderComponent;

    api.get.mockImplementationOnce(() => {
      return Promise.reject(new Error('oops an error occurred!'));
    });

    fireEvent.click(getByText('Reveal'));
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith(
      `/reveal/${member.memberName}/${member.groupID}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    await waitForElement(() => getByText('oops an error occurred!'));
  });

  it('successfully takes you to your wishlist', async () => {
    const { getByText } = renderComponent;

    await waitForElement(() => getByText('Ho Ho Ho!'));

    const mockUserResponse = {
      data: { secretSanta: member.secretSanta }
    };

    api.get.mockImplementationOnce(() => {
      return Promise.resolve(mockUserResponse);
    });

    const myWishlistBtn = getByText('My Wishlist');

    fireEvent.click(myWishlistBtn);

    await wait();

    expect(history.location.pathname).toEqual(`/secretsanta/wishlist/${member.memberName}/${member.groupID}`);
  });

  it('successfully takes you to your giftee\'s wishlist once you have revealed you giftee', async () => {
    const { getByText } = renderComponent;

    await waitForElement(() => getByText('Ho Ho Ho!'));

    const mockUserResponse = {
      data: { secretSanta: member.secretSanta }
    };

    api.get.mockImplementationOnce(() => {
      return Promise.resolve(mockUserResponse);
    });

    fireEvent.click(getByText('Reveal'));

    await waitForElement(() => getByText('rudolph\'s Wishlist'));

    fireEvent.click(getByText('rudolph\'s Wishlist'));

    await wait();

    expect(history.location.pathname).toEqual(`/secretsanta/wishlist/rudolph/${member.groupID}`);
  });
});

