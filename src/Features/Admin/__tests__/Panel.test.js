import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { UserProvider } from '../../Authentication/useAuth';
import Panel from '../Panel';
import api from '../../../Services/api';

jest.mock('../../../Services/api');

const mockJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJOYW1lIjoic2FudGEiLCJpYXQiOjE1MTYyMzkwMjJ9.T_ZxErKlKM9s92-dOsEHOpGa-mB2BU_SVGoEZHx_g2s';

const renderWithContext = (context) => {
  const history = createMemoryHistory();

  window.localStorage.setItem('jwtToken', mockJwtToken); // Set explicit jwtToken to mock logged in user

  if (context === 'errorGetWishlist') {
    api.get.mockRejectedValue(new Error('Oopsy unable to retrieve all groups!'));
  } else {
    const mockAllGroupsResponse = {
      data: [{ groupName: 'group1', count:2 }, { groupName: 'group2', count: 3 }]
    };
    api.get.mockResolvedValue(mockAllGroupsResponse);
  }

  return [
    render(
      <UserProvider>
        <Router history={history}>
          <Panel />
        </Router>
      </UserProvider>
    ),
    history
  ];
};

describe('Admin Panel', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Manage groups', () => {
    it('allows admin user to view all groups', async () => {
      renderWithContext();

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith(
        '/admin/allgroups',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${mockJwtToken}`,
            'Content-Type': 'application/json',
            'credentials': 'same-origin'
          }
        }
      );

      await waitFor(() => screen.getByTestId('row-group1'));
      const manageGroupRowForGroup1 = screen.getByTestId('row-group1');

      const groupName = within(manageGroupRowForGroup1).getByText('group1').textContent;
      const groupCount = within(manageGroupRowForGroup1).getByTestId('count-group1').textContent;
      const groupDrawBtn = within(manageGroupRowForGroup1).getByTestId('group1-draw-btn').textContent;
      const groupDeleteBtn = within(manageGroupRowForGroup1).getByTestId('group1-delete-btn').textContent;
      const groupSendEmailAllBtn = within(manageGroupRowForGroup1).getByTestId('group1-send-email-all-btn').textContent;

      expect(groupName).toEqual('group1');
      expect(groupCount).toEqual('2');
      expect(groupDrawBtn).toEqual('Draw');
      expect(groupDeleteBtn).toEqual('Delete');
      expect(groupSendEmailAllBtn).toEqual('Send');
    });

    it('successfully generates a draw for a group', async () => {
      renderWithContext();

      const mockSubmitDrawResponse = { data: [{}, {}] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSubmitDrawResponse));

      await waitFor(() => screen.getByTestId('row-group1'));
      const manageGroupRowForGroup1 = screen.getByTestId('row-group1');
      const drawBtnForGroup1 = within(manageGroupRowForGroup1).getByTestId('group1-draw-btn');

      fireEvent.click(drawBtnForGroup1);

      expect(api.get).toHaveBeenCalledTimes(2);
      expect(api.get).toHaveBeenNthCalledWith(
        2,
        '/admin/draw/group1',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${mockJwtToken}`,
            'Content-Type': 'application/json',
            'credentials': 'same-origin'
          }
        }
      );

      await waitFor(() => screen.getByText('Successfully created draw for group1.'));
    });

    it('errors when attempting to generate a draw for a group', async () => {
      renderWithContext();

      const mockSubmitDrawErrorResponse = 'oops something bad happened!';
      api.get.mockImplementationOnce(() => Promise.reject(mockSubmitDrawErrorResponse));

      await waitFor(() => screen.getByTestId('row-group1'));
      const manageGroupRowForGroup1 = screen.getByTestId('row-group1');
      const drawBtnForGroup1 = within(manageGroupRowForGroup1).getByTestId('group1-draw-btn');


      fireEvent.click(drawBtnForGroup1);

      expect(api.get).toHaveBeenCalledTimes(2);
      expect(api.get).toHaveBeenNthCalledWith(
        2,
        '/admin/draw/group1',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${mockJwtToken}`,
            'Content-Type': 'application/json',
            'credentials': 'same-origin'
          }
        }
      );

      await waitFor(() => screen.getByText('Error creating draw for group1, oops something bad happened!'));
    });

    it('successfully deletes a group', async () => {
      renderWithContext();

      const mockSubmitDeleteGroupResponse = { data: [] };
      api.delete.mockImplementationOnce(() => Promise.resolve(mockSubmitDeleteGroupResponse));

      await waitFor(() => screen.getByTestId('row-group1'));
      const manageGroupRowForGroup1 = screen.getByTestId('row-group1');
      const deleteBtnForGroup1 = within(manageGroupRowForGroup1).getByTestId('group1-delete-btn');

      fireEvent.click(deleteBtnForGroup1);

      expect(api.delete).toHaveBeenCalledTimes(1);
      expect(api.delete).toHaveBeenCalledWith(
        '/admin/group1',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${mockJwtToken}`,
            'Content-Type': 'application/json',
            'credentials': 'same-origin'
          }
        }
      );

      await waitFor(() => screen.getByText('Successfully deleted group group1!'));
    });

    it('errors when attempting to delete a group', async () => {
      renderWithContext();

      const mockSubmitDeleteGroupErrorResponse = { data: { error: 'oops something bad happended!' } };
      api.delete.mockImplementationOnce(() => Promise.resolve(mockSubmitDeleteGroupErrorResponse));

      await waitFor(() => screen.getByTestId('row-group1'));
      const manageGroupRowForGroup1 = screen.getByTestId('row-group1');
      const deleteBtnForGroup1 = within(manageGroupRowForGroup1).getByTestId('group1-delete-btn');

      fireEvent.click(deleteBtnForGroup1);

      expect(api.delete).toHaveBeenCalledTimes(1);
      expect(api.delete).toHaveBeenCalledWith(
        '/admin/group1',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${mockJwtToken}`,
            'Content-Type': 'application/json',
            'credentials': 'same-origin'
          }
        }
      );

      await waitFor(() => screen.getByText('Unable to delete group1!'));
    });

    it('successfully sends an email to everyone in the group, regarding who they drew', async () => {
      renderWithContext();

      const mockSubmitEmailGroupResponse = { data: [] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSubmitEmailGroupResponse));

      await waitFor(() => screen.getByTestId('row-group1'));
      const manageGroupRowForGroup1 = screen.getByTestId('row-group1');
      const sendEmailToAllBtnForGroup1 = within(manageGroupRowForGroup1).getByTestId('group1-send-email-all-btn');

      fireEvent.click(sendEmailToAllBtnForGroup1);

      expect(api.get).toHaveBeenCalledTimes(2);
      expect(api.get).toHaveBeenNthCalledWith(
        2,
        '/admin/sendEmail/group1',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${mockJwtToken}`,
            'Content-Type': 'application/json',
            'credentials': 'same-origin'
          }
        }
      );

        await waitFor(() => screen.getByText('Successfully sent email for group1.'));
    });

    it('errors when attempting to send an email to everyone in the group, regarding who they drew', async () => {
      renderWithContext();

      const mockSubmitEmailGroupErrorResponse = 'oops something bad happended!';
      api.get.mockImplementationOnce(() => Promise.reject(mockSubmitEmailGroupErrorResponse));

      await waitFor(() => screen.getByTestId('row-group1'));
      const manageGroupRowForGroup1 = screen.getByTestId('row-group1');
      const sendEmailToAllBtnForGroup1 = within(manageGroupRowForGroup1).getByTestId('group1-send-email-all-btn');

      fireEvent.click(sendEmailToAllBtnForGroup1);

      expect(api.get).toHaveBeenCalledTimes(2);
      expect(api.get).toHaveBeenNthCalledWith(
        2,
        '/admin/sendEmail/group1',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${mockJwtToken}`,
            'Content-Type': 'application/json',
            'credentials': 'same-origin'
          }
        }
);

        await waitFor(() => screen.getByText('Error sending email for group1, oops something bad happended!'));
    });
  });

  describe('Search Groups', () => {
    it('Searches by group name', async () => {
      renderWithContext();

      fireEvent.click(screen.getByText('Search Group'));

      const mockSearchResponse = { data :[{ memberName: 'member1', email: 'member1@group1.com', drawn: true, admin: false }] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSearchResponse));

      const groupNameInput = await waitFor(() => screen.getByPlaceholderText('Search Group Name'));
      fireEvent.change(groupNameInput, { target: { value: 'group1' } });
      fireEvent.click(screen.getByText('Search'));

      expect(api.get).toHaveBeenCalledTimes(2);
      expect(api.get).toHaveBeenNthCalledWith(
        2,
        '/admin/group1',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${mockJwtToken}`,
            'Content-Type': 'application/json',
            'credentials': 'same-origin'
          }
        }
      );

      await waitFor(() => screen.getByTestId('row-member1'));
      const manageMembersRowForGroup1 = screen.getByTestId('row-member1');

      const memberNameRow1 = within(manageMembersRowForGroup1).getByText('member1').textContent;
      const memberEmailRow1 = within(manageMembersRowForGroup1).getByTestId('member1-email').textContent;
      const memberGifteeAssignedRow1 = within(manageMembersRowForGroup1).getByTestId('member1-giftee-assigned');
      const memberWishlistUpdatedInRow1 = within(manageMembersRowForGroup1).getByTestId('member1-wishlist-updated');
      const memberLastLoggedInRow1 = within(manageMembersRowForGroup1).getByTestId('member1-last-logged-in').textContent;
      const memberSendEmailRow1 = within(manageMembersRowForGroup1).getByTestId('member1-send-email').textContent;

      expect(memberNameRow1).toEqual('member1');
      expect(memberEmailRow1).toEqual('member1@group1.com');
      expect(memberGifteeAssignedRow1).toHaveClass('green check icon');
      expect(memberWishlistUpdatedInRow1).toHaveClass('red close icon');
      expect(memberLastLoggedInRow1).toEqual('never');
      expect(memberSendEmailRow1).toEqual('Send');
    });

    it('Returns an error if group name not found', async () => {
      renderWithContext();

      fireEvent.click(screen.getByText('Search Group'));

      const mockSearchErrorResponse = 'Oops not found!';
      api.get.mockImplementationOnce(() => Promise.reject(mockSearchErrorResponse));

      const groupNameInput = await waitFor(() => screen.getByPlaceholderText('Search Group Name'));
      fireEvent.change(groupNameInput, { target: { value: 'randomgroup' } });
      fireEvent.click(screen.getByText('Search'));

      expect(api.get).toHaveBeenCalledTimes(2);
      expect(api.get).toHaveBeenNthCalledWith(
        2,
        '/admin/randomgroup',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${mockJwtToken}`,
            'Content-Type': 'application/json',
            'credentials': 'same-origin'
          }
        }
);

      expect(screen.queryByTestId('row-member1')).not.toBeInTheDocument();

      await waitFor(() => screen.getByText('Unable to find secret santa group randomgroup, Oops not found!'));
    });

    it('Sends an email to a member to remind them who they have drawn', async () => {
      renderWithContext();

      fireEvent.click(screen.getByText('Search Group'));

      const mockSearchResponse = { data :[{ memberName: 'member1', email: 'member1@group1.com', drawn: true, admin: false }] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSearchResponse));

      const groupNameInput = await waitFor(() => screen.getByPlaceholderText('Search Group Name'));
      fireEvent.change(groupNameInput, { target: { value: 'group1' } });
      fireEvent.click(screen.getByText('Search'));

      expect(api.get).toHaveBeenCalledTimes(2);
      expect(api.get).toHaveBeenNthCalledWith(
        2,
        '/admin/group1',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${mockJwtToken}`,
            'Content-Type': 'application/json',
            'credentials': 'same-origin'
          }
        }
      );

      const mockSendMemberEmailResponse = [];
      api.get.mockImplementationOnce(() => Promise.resolve(mockSendMemberEmailResponse));

      await waitFor(() => screen.getByTestId('row-member1'));
      const manageMembersRowForGroup1 = screen.getByTestId('row-member1');
      const memberSendEmailRow1 = within(manageMembersRowForGroup1).getByRole('button', { name: /Send/i });

      fireEvent.click(memberSendEmailRow1);

      expect(api.get).toHaveBeenCalledTimes(3);
      expect(api.get).toHaveBeenNthCalledWith(
        3,
        '/admin/sendEmail/group1/member1',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${mockJwtToken}`,
            'Content-Type': 'application/json',
            'credentials': 'same-origin'
          }
        }
      );

      await waitFor(() => screen.getByText('Successfully sent email for group1 to member1.'));
    });

    it('Displays an error when unable to send an email to a member to remind them who they have drawn', async () => {
      renderWithContext();

      fireEvent.click(screen.getByText('Search Group'));

      const mockSearchResponse = { data :[{ memberName: 'member1', email: 'member1@group1.com', drawn: true, admin: false }] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSearchResponse));

      const groupNameInput = await waitFor(() => screen.getByPlaceholderText('Search Group Name'));
      fireEvent.change(groupNameInput, { target: { value: 'group1' } });
      fireEvent.click(screen.getByText('Search'));

      expect(api.get).toHaveBeenCalledTimes(2);
      expect(api.get).toHaveBeenNthCalledWith(
        2,
        '/admin/group1',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${mockJwtToken}`,
            'Content-Type': 'application/json',
            'credentials': 'same-origin'
          }
        }
      );

      await waitFor(() => screen.getByTestId('row-member1'));
      const manageMembersRowForGroup1 = screen.getByTestId('row-member1');

      const mockSendMemberEmailResponse = 'problems connecting to server!';
      api.get.mockImplementationOnce(() => Promise.reject(mockSendMemberEmailResponse));

      const memberSendEmailRow1 = within(manageMembersRowForGroup1).getByRole('button', { name: /Send/i });
      fireEvent.click(memberSendEmailRow1);

      expect(api.get).toHaveBeenCalledTimes(3);
      expect(api.get).toHaveBeenNthCalledWith(
        3,
        '/admin/sendEmail/group1/member1',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${mockJwtToken}`,
            'Content-Type': 'application/json',
            'credentials': 'same-origin'
          }
        }
);

      await waitFor(() => screen.getByText('Error sending email for group1 to member1, problems connecting to server!'));
    });
  });

  describe('Create Group', () => {
    it('successfully creates a new group', async () => {
      renderWithContext();

      fireEvent.click(screen.getByText('Setup New Group'));

      const mockSearchResponse = { data :[{ memberName: 'member1', email: 'member1@group1.com', drawn: true, admin: false }] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSearchResponse));

      const groupNameInput = await waitFor(() => screen.getByPlaceholderText('New Group Name'));
      fireEvent.change(groupNameInput, { target: { value: 'newgroupx' } });

      const addNameInput1 = await waitFor(() => screen.getByPlaceholderText('Name'));
      fireEvent.change(addNameInput1, { target: { value: 'new member' } });

      const addEmailInput1 = await waitFor(() => screen.getByPlaceholderText('Email'));
      fireEvent.change(addEmailInput1, { target: { value: 'new email' } });

      const mockCreateNewGroupResponse = { data :[] };
      api.post.mockImplementationOnce(() => Promise.resolve(mockCreateNewGroupResponse));

      fireEvent.click(screen.getByText('Setup'));

      expect(api.post).toHaveBeenCalledTimes(1);
      expect(api.post).toHaveBeenCalledWith(
        '/admin/setup/newgroupx',
        [{ email: 'new email', memberName: 'new member' }],
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${mockJwtToken}`,
            'Content-Type': 'application/json',
            'credentials': 'same-origin'
          },
        }
      );

      await waitFor(() => screen.getByText('Successfully created new secret santa group newgroupx.'));
    });

    it('errors when creating a new group', async () => {
      renderWithContext();

      fireEvent.click(screen.getByText('Setup New Group'));

      const mockSearchResponse = { data :[{ memberName: 'member1', email: 'member1@group1.com', drawn: true, admin: false }] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSearchResponse));

      const groupNameInput = await waitFor(() => screen.getByPlaceholderText('New Group Name'));
      fireEvent.change(groupNameInput, { target: { value: 'newgroupx' } });

      const addNameInput1 = await waitFor(() => screen.getByPlaceholderText('Name'));
      fireEvent.change(addNameInput1, { target: { value: 'new member' } });

      const addEmailInput1 = await waitFor(() => screen.getByPlaceholderText('Email'));
      fireEvent.change(addEmailInput1, { target: { value: 'new email' } });

      const mockCreateNewGroupErrorResponse = 'oops unexpected error occurred!';
      api.post.mockImplementationOnce(() => Promise.reject(mockCreateNewGroupErrorResponse));

      fireEvent.click(screen.getByText('Setup'));

      expect(api.post).toHaveBeenCalledTimes(1);
      expect(api.post).toHaveBeenCalledWith(
        '/admin/setup/newgroupx',
        [{ email: 'new email', memberName: 'new member' }],
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${mockJwtToken}`,
            'Content-Type': 'application/json',
            'credentials': 'same-origin'
          },
        }
      );

      await waitFor(() => screen.getByText('Error creating new secret santa group newgroupx, oops unexpected error occurred!'));
    });

    it('adds a new name and email group for a new member', async () => {
      renderWithContext();

      fireEvent.click(screen.getByText('Setup New Group'));

      const mockSearchResponse = { data :[{ memberName: 'member1', email: 'member1@group1.com', drawn: true, admin: false }] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSearchResponse));

      const groupNameInput = await waitFor(() => screen.getByPlaceholderText('New Group Name'));
      fireEvent.change(groupNameInput, { target: { value: 'newgroupx' } });

      const addNameInput1 = await waitFor(() => screen.getByPlaceholderText('Name'));
      fireEvent.change(addNameInput1, { target: { value: 'new member' } });

      const addEmailInput1 = await waitFor(() => screen.getByPlaceholderText('Email'));
      fireEvent.change(addEmailInput1, { target: { value: 'new email' } });

      fireEvent.click(screen.getByText('Add Member'));

      await waitFor(() => expect(screen.getAllByPlaceholderText('Name')));
      expect(screen.getAllByPlaceholderText('Name')).toHaveLength(2);
      expect(screen.getAllByPlaceholderText('Name')[1]).toBeInTheDocument();

      expect(screen.getAllByPlaceholderText('Email')).toHaveLength(2);
      expect(screen.getAllByPlaceholderText('Email')[1]).toBeInTheDocument();
    });
  });
});
