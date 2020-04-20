import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { fireEvent, render, waitForElement } from '@testing-library/react';
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
      const [{ container }] = renderWithContext();

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

      const targetTableRowColumn = (row, col) => `table > tbody > tr:nth-child(${row}) > td:nth-child(${col})`;
      const groupNameRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 1)} > h3`).textContent);
      const groupMembersCountRow1 = await waitForElement(() =>
        container.querySelector(targetTableRowColumn(1, 2)).textContent);
      const groupMemberDrawRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 3)} > button`).textContent);
      const groupMemberRemoveRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 4)} > button`).textContent);
      const groupMemberEmailRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 5)} > button`).textContent);

      expect(groupNameRow1).toEqual('group1');
      expect(groupMembersCountRow1).toEqual('2');
      expect(groupMemberDrawRow1).toEqual('Draw');
      expect(groupMemberRemoveRow1).toEqual('Delete');
      expect(groupMemberEmailRow1).toEqual('Send');
    });

    it('successfully generates a draw for a group', async () => {
      const [{ container, getByText }] = renderWithContext();

      const mockSubmitDrawResponse = { data: [{}, {}] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSubmitDrawResponse));

      const targetTableRowColumn = (row, col) => `table > tbody > tr:nth-child(${row}) > td:nth-child(${col})`;

      const groupMemberDrawRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 3)} > button`));
      fireEvent.click(groupMemberDrawRow1);

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

        await waitForElement(() => getByText('Successfully created draw for group1.'));
    });

    it('errors when attempting to generate a draw for a group', async () => {
      const [{ container, getByText }] = renderWithContext();

      const mockSubmitDrawErrorResponse = 'oops something bad happened!';
      api.get.mockImplementationOnce(() => Promise.reject(mockSubmitDrawErrorResponse));

      const targetTableRowColumn = (row, col) => `table > tbody > tr:nth-child(${row}) > td:nth-child(${col})`;

      const groupMemberDrawRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 3)} > button`));
      fireEvent.click(groupMemberDrawRow1);

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

        await waitForElement(() => getByText('Error creating draw for group1, oops something bad happened!'));
    });

    it('successfully generates a draw for a group', async () => {
      const [{ container, getByText }] = renderWithContext();

      const mockSubmitDrawResponse = { data: [{}, {}] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSubmitDrawResponse));

      const targetTableRowColumn = (row, col) => `table > tbody > tr:nth-child(${row}) > td:nth-child(${col})`;

      const groupMemberDrawRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 3)} > button`));
      fireEvent.click(groupMemberDrawRow1);

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

        await waitForElement(() => getByText('Successfully created draw for group1.'));
    });

    it('successfully deletes a group', async () => {
      const [{ container, getByText }] = renderWithContext();

      const mockSubmitDeleteGroupResponse = { data: [] };
      api.delete.mockImplementationOnce(() => Promise.resolve(mockSubmitDeleteGroupResponse));

      const targetTableRowColumn = (row, col) => `table > tbody > tr:nth-child(${row}) > td:nth-child(${col})`;

      const groupDeleteRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 4)} > button`));
      fireEvent.click(groupDeleteRow1);

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

        await waitForElement(() => getByText('Successfully deleted group group1!'));
    });

    it('errors when attempting to delete a group', async () => {
      const [{ container, getByText }] = renderWithContext();

      const mockSubmitDeleteGroupErrorResponse = { data: { error: 'oops something bad happended!' } };
      api.delete.mockImplementationOnce(() => Promise.resolve(mockSubmitDeleteGroupErrorResponse));

      const targetTableRowColumn = (row, col) => `table > tbody > tr:nth-child(${row}) > td:nth-child(${col})`;

      const groupDeleteRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 4)} > button`));
      fireEvent.click(groupDeleteRow1);

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

      await waitForElement(() => getByText('Unable to delete group1!'));
    });

    it('successfully sends an email to everyone in the group, regarding who they drew', async () => {
      const [{ container, getByText }] = renderWithContext();

      const mockSubmitEmailGroupResponse = { data: [] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSubmitEmailGroupResponse));

      const targetTableRowColumn = (row, col) => `table > tbody > tr:nth-child(${row}) > td:nth-child(${col})`;

      const groupSendRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 5)} > button`));
      fireEvent.click(groupSendRow1);

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

        await waitForElement(() => getByText('Successfully sent email for group1.'));
    });

    it('errors when attempting to send an email to everyone in the group, regarding who they drew', async () => {
      const [{ container, getByText }] = renderWithContext();

      const mockSubmitEmailGroupErrorResponse = 'oops something bad happended!';
      api.get.mockImplementationOnce(() => Promise.reject(mockSubmitEmailGroupErrorResponse));

      const targetTableRowColumn = (row, col) => `table > tbody > tr:nth-child(${row}) > td:nth-child(${col})`;

      const groupSendRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 5)} > button`));
      fireEvent.click(groupSendRow1);

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

        await waitForElement(() => getByText('Error sending email for group1, oops something bad happended!'));
    });
  });

  describe('Search Groups', () => {
    it('Searches by group name', async () => {
      const [{ container, getByText, getByPlaceholderText }] = renderWithContext();

      fireEvent.click(getByText('Search Group'));

      const mockSearchResponse = { data :[{ memberName: 'member1', email: 'member1@group1.com', drawn: true, admin: false }] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSearchResponse));

      const groupNameInput = await waitForElement(() => getByPlaceholderText('Search Group Name'));
      fireEvent.change(groupNameInput, { target: { value: 'group1' } });
      fireEvent.click(getByText('Search'));

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

      const targetTableRowColumn = (row, col) => `#membersList > tbody > tr:nth-child(${row}) > td:nth-child(${col})`;

      const memberNameRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 1)} > h3`).textContent);
      const memberEmailRow1 = await waitForElement(() =>
        container.querySelector(targetTableRowColumn(1, 2)).textContent);
      const memberDrawAssignedRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 3)} > i`).className);
      const memberWishlistLastUpdatedInRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 4)} > i`).className);
      const memberLastLoggedInRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 5)}`).textContent);
      const memberSendEmailRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 6)} > button`).textContent);

      expect(memberNameRow1).toEqual('member1');
      expect(memberEmailRow1).toEqual('member1@group1.com');
      expect(memberDrawAssignedRow1).toEqual('green check icon');
      expect(memberWishlistLastUpdatedInRow1).toEqual('red close icon');
      expect(memberLastLoggedInRow1).toEqual('never');
      expect(memberSendEmailRow1).toEqual('Send');
    });

    it('Returns an error if group name not found', async () => {
      const [{ container, getByText, getByPlaceholderText }] = renderWithContext();

      fireEvent.click(getByText('Search Group'));

      const mockSearchErrorResponse = 'Oops not found!';
      api.get.mockImplementationOnce(() => Promise.reject(mockSearchErrorResponse));

      const groupNameInput = await waitForElement(() => getByPlaceholderText('Search Group Name'));
      fireEvent.change(groupNameInput, { target: { value: 'randomgroup' } });
      fireEvent.click(getByText('Search'));

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

      expect(container.querySelector('#membersList > tbody > tr')).not.toBeInTheDocument();

      await waitForElement(() => getByText('Unable to find secret santa group randomgroup, Oops not found!'));
    });

    it('Sends an email to a member to remind them who they have drawn', async () => {
      const [{ container, getByText, getByPlaceholderText }] = renderWithContext();

      fireEvent.click(getByText('Search Group'));

      const mockSearchResponse = { data :[{ memberName: 'member1', email: 'member1@group1.com', drawn: true, admin: false }] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSearchResponse));

      const groupNameInput = await waitForElement(() => getByPlaceholderText('Search Group Name'));
      fireEvent.change(groupNameInput, { target: { value: 'group1' } });
      fireEvent.click(getByText('Search'));

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

      const targetTableRowColumn = (row, col) => `#membersList > tbody > tr:nth-child(${row}) > td:nth-child(${col})`;

      const mockSendMemberEmailResponse = [];
      api.get.mockImplementationOnce(() => Promise.resolve(mockSendMemberEmailResponse));

      const memberSendEmailRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 6)} > button`));
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

      await waitForElement(() => getByText('Successfully sent email for group1 to member1.'));
    });

    it('Displays an error when unable to send an email to a member to remind them who they have drawn', async () => {
      const [{ container, getByText, getByPlaceholderText }] = renderWithContext();

      fireEvent.click(getByText('Search Group'));

      const mockSearchResponse = { data :[{ memberName: 'member1', email: 'member1@group1.com', drawn: true, admin: false }] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSearchResponse));

      const groupNameInput = await waitForElement(() => getByPlaceholderText('Search Group Name'));
      fireEvent.change(groupNameInput, { target: { value: 'group1' } });
      fireEvent.click(getByText('Search'));

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

      const targetTableRowColumn = (row, col) => `#membersList > tbody > tr:nth-child(${row}) > td:nth-child(${col})`;

      const mockSendMemberEmailResponse = 'problems connecting to server!';
      api.get.mockImplementationOnce(() => Promise.reject(mockSendMemberEmailResponse));

      const memberSendEmailRow1 = await waitForElement(() =>
        container.querySelector(`${targetTableRowColumn(1, 6)} > button`));
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

      await waitForElement(() => getByText('Error sending email for group1 to member1, problems connecting to server!'));
    });
  });

  describe('Create Group', () => {
    it('successfully creates a new group', async () => {
      const [{ getByText, getByPlaceholderText }] = renderWithContext();

      fireEvent.click(getByText('Setup New Group'));

      const mockSearchResponse = { data :[{ memberName: 'member1', email: 'member1@group1.com', drawn: true, admin: false }] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSearchResponse));

      const groupNameInput = await waitForElement(() => getByPlaceholderText('New Group Name'));
      fireEvent.change(groupNameInput, { target: { value: 'newgroupx' } });

      const addNameInput1 = await waitForElement(() => getByPlaceholderText('Name'));
      fireEvent.change(addNameInput1, { target: { value: 'new member' } });

      const addEmailInput1 = await waitForElement(() => getByPlaceholderText('Email'));
      fireEvent.change(addEmailInput1, { target: { value: 'new email' } });

      const mockCreateNewGroupResponse = { data :[] };
      api.post.mockImplementationOnce(() => Promise.resolve(mockCreateNewGroupResponse));

      fireEvent.click(getByText('Setup'));

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

      await waitForElement(() => getByText('Successfully created new secret santa group newgroupx.'));
    });

    it('errors when creating a new group', async () => {
      const [{ getByText, getByPlaceholderText }] = renderWithContext();

      fireEvent.click(getByText('Setup New Group'));

      const mockSearchResponse = { data :[{ memberName: 'member1', email: 'member1@group1.com', drawn: true, admin: false }] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSearchResponse));

      const groupNameInput = await waitForElement(() => getByPlaceholderText('New Group Name'));
      fireEvent.change(groupNameInput, { target: { value: 'newgroupx' } });

      const addNameInput1 = await waitForElement(() => getByPlaceholderText('Name'));
      fireEvent.change(addNameInput1, { target: { value: 'new member' } });

      const addEmailInput1 = await waitForElement(() => getByPlaceholderText('Email'));
      fireEvent.change(addEmailInput1, { target: { value: 'new email' } });

      const mockCreateNewGroupErrorResponse = 'oops unexpected error occurred!';
      api.post.mockImplementationOnce(() => Promise.reject(mockCreateNewGroupErrorResponse));

      fireEvent.click(getByText('Setup'));

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

      await waitForElement(() => getByText('Error creating new secret santa group newgroupx, oops unexpected error occurred!'));
    });

    it('adds a new name and email group for a new member', async () => {
      const [{ container, getByText, getByPlaceholderText }] = renderWithContext();

      fireEvent.click(getByText('Setup New Group'));

      const mockSearchResponse = { data :[{ memberName: 'member1', email: 'member1@group1.com', drawn: true, admin: false }] };
      api.get.mockImplementationOnce(() => Promise.resolve(mockSearchResponse));

      const groupNameInput = await waitForElement(() => getByPlaceholderText('New Group Name'));
      fireEvent.change(groupNameInput, { target: { value: 'newgroupx' } });

      const addNameInput1 = await waitForElement(() => getByPlaceholderText('Name'));
      fireEvent.change(addNameInput1, { target: { value: 'new member' } });

      const addEmailInput1 = await waitForElement(() => getByPlaceholderText('Email'));
      fireEvent.change(addEmailInput1, { target: { value: 'new email' } });

      fireEvent.click(getByText('Add Member'));

      await waitForElement(() => container.querySelector('div.form-input:nth-child(4) input[name="memberName"]'));
      await waitForElement(() => container.querySelector('div.form-input:nth-child(4) input[name="email"]'));
    });
  });
});
