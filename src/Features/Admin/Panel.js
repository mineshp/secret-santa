import React, { useEffect, useState } from 'react';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Notification from '../../Shared/Notification';
import useInput from '../../Shared/useInput';
import { getToken, setAuthorisationToken } from '../Authentication/Auth';
import api from '../../Services/api';
import useMembers from './useMembers'
import './Panel.css';;

const allGroups = (groups, handleDraw, deleteGroup, sendEmail) => {
  const groupRows = groups.map(({ groupName, count }) => (
    <Table.Row key={groupName}>
      <Table.Cell>
        <Header as='h3' textAlign='center' className="group-name">
          {groupName}
        </Header>
      </Table.Cell>
      <Table.Cell singleLine>{count}</Table.Cell>
      <Table.Cell><Button color="blue" type="button" id={groupName} onClick={handleDraw}>
        Draw</Button>
      </Table.Cell>
      <Table.Cell><Button color="teal" type="button" id={groupName} onClick={deleteGroup}>
        Delete</Button>
      </Table.Cell>
      <Table.Cell><Button color="pink" type="button" id={groupName} onClick={sendEmail}>
        Send</Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Table celled className="groups-admin">
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

export default function Panel(props) {
  const [newMembers, addMember, updateMember] = useMembers([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [groups, setGroups] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();
  const { value: groupNameValue, bind: bindGroupName } = useInput('');

  document.body.className = 'background-admin';

  const groupMembers = () => {
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
    ))
  };

  const displayNotification = (messageData) => {
    setShowNotification(true);
    return setNotificationMessage(messageData);
  };

  const handleDraw = async (event) => {
    event.preventDefault();
    const groupName = event.target.id;

    const token = getToken();
    await api.get(
      `/secretsanta/draw/${groupName}`,
      { headers: setAuthorisationToken(token) }
    )
    .then(({ data }) => displayNotification({
      type: 'positive',
      messageHeader: `Successfully created draw for ${groupName}.`
    }))
    .catch((err) => displayNotification({
      type: 'negative',
      messageHeader: `Error creating draw for ${groupName}, ${err}`
    }));
  };

  const sendEmail = async (event) => {
    event.preventDefault();
    const groupName = event.target.id;

    const token = getToken();
    await api.get(
      `/secretsanta/admin/sendEmail/${groupName}`,
      { headers: setAuthorisationToken(token) }
    )
    .then((response) => displayNotification({
      type: 'positive',
      messageHeader: `Successfully sent email for ${groupName}.`
    }))
    .catch((err) => displayNotification({
      type: 'negative',
      messageHeader: `Error sending email for ${groupName}, ${err}`
    }));
  }

  const handleSetupGroup = async (event) => {
    event.preventDefault();
    const payload = newMembers.reduce((acc, { memberName, email }) =>
      [...acc, { memberName: memberName.toLowerCase(), email: email.toLowerCase(0) }], []);

    if (groupNameValue) {
      const token = getToken();
      const groupName = groupNameValue.toLowerCase();
      await api.post(
        `/secretsanta/setup/${groupName}`,
        payload,
        { headers: setAuthorisationToken(token) }
      )
        .then(({ data }) => {
          displayNotification({
            type: 'positive',
            messageHeader: `Successfully created new secret santa group ${groupName}.`
          });
          setActiveIndex(0)
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
      `/secretsanta/${groupName}`,
      { headers: setAuthorisationToken(token) }
    ).catch((err) => setShowNotification({
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
    };
  };


  useEffect(() => {
    const token = getToken();
    const fetchData = async () => {
      const { data } = await api.get(
        '/secretsanta/admin/allgroups',
        { headers: setAuthorisationToken(token) }
      );
      if (data) setGroups(data);
    };
    fetchData();
  }, []);

  const handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <Container>
      <div className="admin-bg">
      <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 700 }}>
    { showNotification && notificationMessage
      && (
      <Notification
        type={notificationMessage.type}
          messageHeader={notificationMessage.messageHeader}
          message={notificationMessage.message || null}
      />
      )
    }
    <Accordion styled>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={handleAccordionClick}
        className="accordion-panel"
      >
        <Icon name="dropdown" color="blue"/>
        Manage Groups
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
          {allGroups(groups, handleDraw, deleteGroup, sendEmail)}
      </Accordion.Content>

      <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={handleAccordionClick}
        className="accordion-panel"
      >
        <Icon name="dropdown" color="blue"/>
        Setup New Group
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
      <Header as='h3' className="admin-header">
        Setup <span className="toUpperCase">{groupNameValue}</span> Group
      </Header>
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
          {groupMembers()}
          <div className="button-spacing">
            <Button color="pink" onClick={addMember} onKeyPress={addMember} type="button" className="button-spacing">
              Add Member
            </Button>
            <Button color="blue" type="submit">
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