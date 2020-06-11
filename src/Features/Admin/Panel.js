import React, { useEffect, useState } from 'react';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Notification from '../../Shared/Notification';
import useInput from '../../Shared/useInput';
import { formatDate } from '../../Utils/Date';
import { getToken, setAuthorisationToken } from '../Authentication/Auth';
import api from '../../Services/api';
import useMembers from './useMembers';
import './Panel.css';
import '../../Shared/Notification.css';

const displayMembersForGroup = (members, sendEmailToMember) => {
  const memberRows = members.map(({
    memberName,
    email,
    drawn,
    wishlistUpdated,
    lastLoggedIn
  }) => (
    <Table.Row key={memberName} data-testid={`row-${memberName}`}>
      <Table.Cell>
        <Header as='h3' textAlign='center' className="group-name">
          {memberName}
        </Header>
      </Table.Cell>
      <Table.Cell data-testid={`${memberName}-email`}>{email}</Table.Cell>
      <Table.Cell className="format-center">{drawn ? <Icon name='check' color='green' data-testid={`${memberName}-giftee-assigned`} /> : <Icon name='close' color='red' data-testid={`${memberName}-giftee-assigned`}  />}</Table.Cell>
      <Table.Cell className="format-center">
        {
          wishlistUpdated
            ? <Popup
              trigger={<Icon name='check' color='green' data-testid={`${memberName}-wishlist-updated`} />}
              content={`Wishlist last updated ${formatDate(wishlistUpdated)}`}
              position='top center'
            />
            : <Popup
              trigger={<Icon name='close' color='red' data-testid={`${memberName}-wishlist-updated`} />}
              content='Wishlist has not been updated'
              position='top center'
          />
        }
      </Table.Cell>
      <Table.Cell data-testid={`${memberName}-last-logged-in`}>{ lastLoggedIn ? formatDate(lastLoggedIn) : 'never' }</Table.Cell>
      <Table.Cell data-testid={`${memberName}-send-email`}><Button color="pink" type="button" id={memberName} onClick={sendEmailToMember}>
        Send</Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Table celled className="groups-admin" id="membersList">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Giftee Assigned</Table.HeaderCell>
          <Table.HeaderCell>Wishlist Updated</Table.HeaderCell>
          <Table.HeaderCell>Last Logged In</Table.HeaderCell>
          <Table.HeaderCell>Send Email</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {memberRows}
      </Table.Body>
    </Table>
  );
};

const allGroups = (groups, handleDraw, deleteGroup, sendEmailToAll) => {
  const groupRows = groups.map(({ groupName, count }) => (
    <Table.Row key={groupName} data-testid={`row-${groupName}`}>
      <Table.Cell>
        <Header as='h3' textAlign='center' className="group-name">
          {groupName}
        </Header>
      </Table.Cell>
      <Table.Cell data-testid={`count-${groupName}`} singleLine>{count}</Table.Cell>
      <Table.Cell><Button color="blue" type="button" id={groupName} onClick={handleDraw} data-testid={`${groupName}-draw-btn`}>
        Draw</Button>
      </Table.Cell>
      <Table.Cell><Button color="teal" type="button" id={groupName} onClick={deleteGroup} data-testid={`${groupName}-delete-btn`}>
        Delete</Button>
      </Table.Cell>
      <Table.Cell><Button color="pink" type="button" id={groupName} onClick={sendEmailToAll} data-testid={`${groupName}-send-email-all-btn`}>
        Send</Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Table celled className="groups-admin" data-testid='allgroups'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>GroupName</Table.HeaderCell>
          <Table.HeaderCell># of Members</Table.HeaderCell>
          <Table.HeaderCell>Draw</Table.HeaderCell>
          <Table.HeaderCell>Remove</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {groupRows}
      </Table.Body>
    </Table>
  );
};

export default function Panel() {
  const [newMembers, addMember, updateMember] = useMembers([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [groups, setGroups] = useState([]);
  const [membersForGroup, setMembersForGroup] = useState([]);
  const [notificationState, setNotificationState] = useState('hide');
  const [notificationMessage, setNotificationMessage] = useState();
  const { value: groupNameValue, bind: bindGroupName } = useInput('');
  const { value: searchGroupName, bind: bindSearchGroupName } = useInput('');

  document.body.className = 'background-admin';

  useEffect(() => {
    const token = getToken();
    const fetchData = async () => {
      const { data } = await api.get(
        '/admin/allgroups',
        { headers: setAuthorisationToken(token) }
      );

      if (data) setGroups(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (notificationState) {
      setTimeout(() => setNotificationState('hide'), 3000);
    }
  }, [notificationState]);

  const handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const addNewGroupMember = () => {
    return newMembers.map((row) => (
      <div className="form-input" key={row.rowId}>
        <Form.Field key={`member-${row.rowId}`}>
          <Form.Input
            id={row.rowId}
            name={'memberName'}
            placeholder={'Name'}
            width={12}
            value={row.memberName}
            onChange={updateMember('name')}
          />
        </Form.Field>
        <Form.Field key={`email-${row.rowId}`}>
          <Form.Input
            id={row.rowId}
            name={'email'}
            placeholder={'Email'}
            width={12}
            value={row.email}
            onChange={updateMember('email')}
          />
        </Form.Field>
      </div>
    ));
  };

  const displayNotification = (messageData) => {
    setNotificationState('show');
    return setNotificationMessage(messageData);
  };

  const handleDraw = async (event) => {
    event.preventDefault();
    const groupName = event.target.id;

    const token = getToken();
    await api.get(
      `/admin/draw/${groupName}`,
      { headers: setAuthorisationToken(token) }
    )
    .then(() => displayNotification({
      type: 'positive',
      messageHeader: `Successfully created draw for ${groupName}.`
    }))
    .catch((err) => displayNotification({
      type: 'negative',
      messageHeader: `Error creating draw for ${groupName}, ${err}`
    }));
  };

  const sendEmailToAll = async (event) => {
    event.preventDefault();
    const groupName = event.target.id;

    const token = getToken();
    await api.get(
      `/admin/sendEmail/${groupName}`,
      { headers: setAuthorisationToken(token) }
    )
    .then(() => displayNotification({
      type: 'positive',
      messageHeader: `Successfully sent email for ${groupName}.`
    }))
    .catch((err) => displayNotification({
      type: 'negative',
      messageHeader: `Error sending email for ${groupName}, ${err}`
    }));
  };

  const sendEmailToMember = async (event) => {
    event.preventDefault();
    const memberName = event.target.id;

    const token = getToken();
    await api.get(
      `/admin/sendEmail/${searchGroupName}/${memberName}`,
      { headers: setAuthorisationToken(token) }
    )
    .then(() => displayNotification({
      type: 'positive',
      messageHeader: `Successfully sent email for ${searchGroupName} to ${memberName}.`
    }))
    .catch((err) => displayNotification({
      type: 'negative',
      messageHeader: `Error sending email for ${searchGroupName} to ${memberName}, ${err}`
    }));
  };

  const handleSetupGroup = async (event) => {
    event.preventDefault();
    const payload = newMembers.reduce((acc, { memberName, email }) =>
      [...acc, { memberName: memberName.toLowerCase(), email: email.toLowerCase(0) }], []);

    if (groupNameValue) {
      const token = getToken();
      const groupName = groupNameValue.toLowerCase();
      await api.post(
        `/admin/setup/${groupName}`,
        payload,
        { headers: setAuthorisationToken(token) }
      )
        .then(() => {
          displayNotification({
            type: 'positive',
            messageHeader: `Successfully created new secret santa group ${groupName}.`
          });
          setActiveIndex(0);
        })
        .catch((err) => displayNotification({
          type: 'negative',
          messageHeader: `Error creating new secret santa group ${groupName}, ${err}`
        }));
    }
  };

  const deleteGroup = async (event) => {
    event.preventDefault();
    const groupName = event.target.id;

    const token = getToken();
    const { data } = await api.delete(
      `/admin/${groupName}`,
      { headers: setAuthorisationToken(token) }
    ).catch((err) => displayNotification({
      type: 'negative',
      messageHeader: `Unable to delete ${groupName}!`,
      message: err
    }));

    if (data) {
      if (data.error) {
        displayNotification({
          type: 'negative',
          messageHeader: `Unable to delete ${groupName}!`,
          message: data.error
        });
      } else {
        displayNotification({
          type: 'positive',
          messageHeader: `Successfully deleted group ${groupName}!`
        });
      }
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchGroupName) {
      const token = getToken();
      const groupName = searchGroupName.toLowerCase();
      await api.get(
        `/admin/${groupName}`,
        { headers: setAuthorisationToken(token) }
      )
        .then(({ data }) => {
          setMembersForGroup(data);
        })
        .catch((err) => displayNotification({
          type: 'negative',
          messageHeader: `Unable to find secret santa group ${groupName}, ${err}`
        }));
    }
  };

  return (
    <Container>
      <div className="admin-panel">
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 780 }}>
            <div data-testid='notification' className={`${notificationState} notification-wrapper`}>
              {
              ( notificationState === 'show' && notificationMessage ) && (
              <Notification
                type={notificationMessage.type}
                messageHeader={notificationMessage.messageHeader}
                message={notificationMessage.message || null}
                />
              )
            }
            </div>
            <Accordion styled>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={handleAccordionClick}
                className="accordion-panel"
                data-testid="manage-groups-accordion"
      >
                <Icon name="dropdown" color="blue"/>
                Manage Groups
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                {allGroups(groups, handleDraw, deleteGroup, sendEmailToAll)}
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={handleAccordionClick}
                className="accordion-panel"
                data-testid="search-groups-accordion"
    >
                <Icon name="dropdown" color="blue"/>
                Search Group
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <div className="search-input-wrapper">
                  <Form onSubmit={handleSetupGroup}>
                    <Form.Group key="search-group" className="search-input">
                      <Form.Input
                        id="searchGroup"
                        name={'groupName'}
                        placeholder={'Search Group Name'}
                        width={9}
                        {...bindSearchGroupName}
          />
                      <Button type="button" onClick={handleSearchSubmit} onKeyPress={handleSearchSubmit} data-testid="search-group-btn">Search</Button>
                    </Form.Group>
                    <Divider />
                    {displayMembersForGroup(membersForGroup, sendEmailToMember)}
                  </Form>
                </div>
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={handleAccordionClick}
                className="accordion-panel"
                data-testid="setup-groups-accordion"
      >
                <Icon name="dropdown" color="blue"/>
                Setup New Group
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 2}>
                <div className="">
                  <Form onSubmit={handleSetupGroup}>
                    <Form.Field key="new-group-name">
                      <Form.Input
                        id="group-name"
                        name={'groupName'}
                        placeholder={'New Group Name'}
                        width={12}
                        {...bindGroupName}
            />
                    </Form.Field>
                    <Divider />
                    {addNewGroupMember()}
                    <div className="button-spacing">
                      <Button color="pink" onClick={addMember} onKeyPress={addMember} type="button" className="button-spacing" data-testid="add-member-btn">
                        Add Member
                      </Button>
                      <Button color="blue" type="submit" data-testid="setup-group-btn">
                        Setup
                      </Button>
                    </div>
                  </Form>
                </div>
              </Accordion.Content>
            </Accordion>
          </Grid.Column>
        </Grid>
      </div>
    </Container>
  );
}