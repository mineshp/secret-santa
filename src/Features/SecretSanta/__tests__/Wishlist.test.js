import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProvider } from '../../Authentication/useAuth';
import Wishlist from '../Wishlist';
import api from '../../../Services/api';

jest.mock('../../../Services/api');

const mockJwtToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJOYW1lIjoic2FudGEiLCJpYXQiOjE1MTYyMzkwMjJ9.T_ZxErKlKM9s92-dOsEHOpGa-mB2BU_SVGoEZHx_g2s';

const HEADERS = {
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${mockJwtToken}`,
    'Content-Type': 'application/json',
    credentials: 'same-origin',
  },
};

const renderWithContext = (context, memberName = 'santa') => {
  const history = createMemoryHistory();

  window.localStorage.setItem('jwtToken', mockJwtToken); // Set explicit jwtToken to mock logged in user

  const match = {
    params: {
      memberName,
      groupID: 'northpole',
    },
  };

  if (context === 'errorGetWishlist') {
    api.get.mockRejectedValue(new Error('Oopsy unable to retrieve wishlist!'));
  } else {
    const mockWishlistIdeasResponse = {
      data: { giftIdeas: ['idea1', 'idea2', 'idea3'] },
    };
    api.get.mockResolvedValue(mockWishlistIdeasResponse);
    api.get.mockResolvedValue({ data: 'a test quote' });
  }

  return [
    render(
      <UserProvider>
        <Router history={history}>
          <Wishlist match={match} />
        </Router>
      </UserProvider>
    ),
    history,
  ];
};

describe('Wishlist', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Errors when trying to retrieve my wishlist ideas', async () => {
    renderWithContext('errorGetWishlist');

    expect(api.get).toHaveBeenCalledTimes(2);
    expect(api.get).toHaveBeenCalledWith('/giftIdeas/santa/northpole', HEADERS);

    await expect(api.get()).rejects.toThrow(
      'Oopsy unable to retrieve wishlist!'
    );
  });

  it('Displays my wishlist, successfully updated my wishlist', async () => {
    renderWithContext();

    expect(api.get).toHaveBeenCalledTimes(2);
    expect(api.get).toHaveBeenNthCalledWith(1, '/displayQuotes');
    expect(api.get).toHaveBeenNthCalledWith(
      2,
      '/giftIdeas/santa/northpole',
      HEADERS
    );
    expect(screen.getByText("santa's Wishlist"));

    const giftIdea1 = await screen.findByPlaceholderText('Gift Idea 1');
    const giftIdea2 = await screen.findByPlaceholderText('Gift Idea 2');
    const giftIdea3 = await screen.findByPlaceholderText('Gift Idea 3');

    userEvent.clear(giftIdea1);
    await userEvent.type(giftIdea1, 'baubel');
    userEvent.clear(giftIdea2);
    await userEvent.type(giftIdea2, 'http://foo.com/present');
    userEvent.clear(giftIdea3);
    await userEvent.type(giftIdea3, 'surprise me');

    const mockSubmitWishlistIdeasResponse = { data: [] };
    api.put.mockImplementationOnce(() =>
      Promise.resolve(mockSubmitWishlistIdeasResponse)
    );

    const mockSaveWishlistLastUpdatedResponse = { data: [] };
    api.put.mockImplementationOnce(() =>
      Promise.resolve(mockSaveWishlistLastUpdatedResponse)
    );

    expect(await screen.findByText('Back')).toBeInTheDocument();
    expect(await screen.findByText('Save')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => expect(api.put).toHaveBeenCalledTimes(2));

    expect(api.put).toHaveBeenCalledTimes(2);

    expect(api.put).toHaveBeenNthCalledWith(
      1,
      '/giftIdeas/santa/northpole',
      JSON.stringify({
        giftIdeas: [
          encodeURI('baubel'),
          encodeURI('http://foo.com/present'),
          encodeURI('surprise me'),
        ],
      }),
      HEADERS
    );

    expect(api.put).toHaveBeenNthCalledWith(
      2,
      '/giftIdeas/santa/northpole/updated',
      expect.any(String),
      HEADERS
    );

    await screen.findByText('Successfully updated gift ideas.');
  });

  it('Displays my wishlist, error occurred updating my wishlist', async () => {
    renderWithContext();

    expect(api.get).toHaveBeenCalledTimes(2);
    expect(api.get).toHaveBeenCalledWith('/giftIdeas/santa/northpole', HEADERS);
    expect(screen.getByText("santa's Wishlist"));

    const giftIdea1 = await screen.findByPlaceholderText('Gift Idea 1');
    const giftIdea2 = await screen.findByPlaceholderText('Gift Idea 2');
    const giftIdea3 = await screen.findByPlaceholderText('Gift Idea 3');

    userEvent.clear(giftIdea1);
    await userEvent.type(giftIdea1, 'baubel');
    userEvent.clear(giftIdea2);
    await userEvent.type(giftIdea2, 'tree topper');
    userEvent.clear(giftIdea3);
    await userEvent.type(giftIdea3, 'surprise me');

    const mockSubmitErrorWishlistIdeasResponse = {
      error: 'oops something bad happened!',
    };
    api.put.mockImplementationOnce(() =>
      Promise.resolve(mockSubmitErrorWishlistIdeasResponse)
    );

    fireEvent.click(screen.getByText('Save'));

    expect(api.put).toHaveBeenCalledTimes(1);

    await screen.findByText(
      'Error updating gift ideas, oops something bad happened!'
    );
  });

  it("Displays my giftee's wishlist as readonly", async () => {
    renderWithContext(null, 'elve');

    expect(api.get).toHaveBeenCalledTimes(2);
    expect(api.get).toHaveBeenCalledWith('/giftIdeas/elve/northpole', HEADERS);

    expect(screen.getByText("elve's Wishlist"));

    expect(await screen.findByTestId('giftIdea1'));
    expect(screen.getByTestId('giftIdea2'));
    expect(screen.getByTestId('giftIdea3'));

    // Input fields do not exist for giftideas as fields are readonly.
    expect(
      screen.queryByPlaceholderText('Gift Idea 1')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText('Gift Idea 2')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText('Gift Idea 3')
    ).not.toBeInTheDocument();

    expect(await screen.findByText('Back')).toBeInTheDocument();
    expect(screen.queryByText('Save')).not.toBeInTheDocument();
  });
});
