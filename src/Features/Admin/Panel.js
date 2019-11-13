import React, { useEffect, useState } from 'react';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Notification from '../../Shared/Notification';
import useInput from '../../Shared/useInput';
import { getToken, setAuthorisationToken } from '../Authentication/Auth';
import api from '../../Services/api';
import useMembers from './useMembers';

const allGroups = (groups, handleDraw) => {
  console.log(groups);
  const groupRows = groups.map(({ groupName, count }) => (
    <Table.Row key={groupName}>
      <Table.Cell>
        <Header as='h3' textAlign='center'>
          {groupName}
        </Header>
      </Table.Cell>
      <Table.Cell singleLine>{count}</Table.Cell>
      <Table.Cell><Button color="blue" type="button" id={groupName} onClick={handleDraw}>
        Draw</Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>GroupName</Table.HeaderCell>
          <Table.HeaderCell># of Members</Table.HeaderCell>
          <Table.HeaderCell>Draw</Table.HeaderCell>
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

  const groupMembers = () => {
    return newMembers.map((row) => (
      <div className="flex-setup-form member-row" key={row.rowId}>
      <div className="box-wishlist setup-input two-col-span">
        <Form.Field key={`member-${row.rowId}`}>
          <Form.Input
            id={row.rowId}
            name={'memberName'}
            placeholder={'Name'}
            width={4}
            value={row.memberName}
            onChange={updateMember('name')}
          />
        </Form.Field>
      </div>
      <div className="box-wishlist setup-input">
        <Form.Field key={`email-${row.rowId}`}>
        <Form.Input
          id={row.rowId}
          name={'email'}
          placeholder={'Email'}
          width={4}
          value={row.email}
          onChange={updateMember('email')}
          />
        </Form.Field>
      </div>
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
    console.log(groupName);

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

  const handleSetupGroup = async (event) => {
    event.preventDefault();
    const payload = newMembers.reduce((acc, { memberName, email }) =>
      [...acc, { memberName, email }], []);

    if (groupNameValue) {
      const token = getToken();
      await api.post(
        `/secretsanta/setup/${groupNameValue}`,
        payload,
        { headers: setAuthorisationToken(token) }
      )
        .then(({ data }) => displayNotification({
          type: 'positive',
          messageHeader: `Successfully created new secret santa group ${groupNameValue}.`
        }))
        .catch((err) => displayNotification({
          type: 'negative',
          messageHeader: `Error creating new secret santa group ${groupNameValue}, ${err}`
        }));
    }
  };


  useEffect(() => {
    console.log('use effect called');
    const token = getToken();
    const fetchData = async () => {
      const { data } = await api.get(
        '/secretsanta/admin/allgroups',
        { headers: setAuthorisationToken(token) }
      );
      console.log(data);
      if (data) setGroups(data);
    };
    fetchData();
  }, []);

  const handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  // const handleUpdateGameClick = (event) => {
  //   setUpdateGameMode(!updateGameMode);
  //   setGameToUpdate(event.currentTarget.value);
  // };

  // const handleSubmit = async (evt) => {
  //   evt.preventDefault();
  //   const gameDataToUpdate = {
  //     gameId: gameData.gameId,
  //     gameName: gameData.gameName,
  //     gameDate: chosenGameDate.toISOString(),
  //     gameStatus: updatedGameStatus,
  //     fileName: `${gameData.gameName.toLowerCase()}-${gameData.gameDate.slice(0, 10)}`
  //   };
  //   console.log(gameDataToUpdate);
  //   await api.put(`admin/game/${gameData.gameName}/update`, JSON.stringify(gameDataToUpdate))
  //     .then((data) => {
  //       console.log(data);
  //       // setNotification({
  //       //   type: 'success',
  //       //   messageHeader: `Successfully updated ${gameData.gameName} game data`
  //       // })
  //     })
  //     .catch((err) => console.log(err) || setNotification({
  //       type: 'error',
  //       messageHeader: `Unable to update ${gameData.gameName} game data`,
  //       message: err
  //     }));
  // };


  return (
    <div className="container-admin">
    <Accordion styled>
      { showNotification && notificationMessage
        && (
        <Notification
          type={notificationMessage.type}
          messageHeader={notificationMessage.messageHeader}
        />
        )
      }
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={handleAccordionClick}
      >
        <Icon name="dropdown" />
        Manage Groups
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
          {allGroups(groups, handleDraw)}
      </Accordion.Content>

      <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={handleAccordionClick}
      >
        <Icon name="dropdown" />
        Setup New Group
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
      <Header as='h3'>
        Setup <span className="toUpperCase">{groupNameValue}</span> Group
      </Header>
      <div className="box-wishlist">
        <Divider />
        <form onSubmit={handleSetupGroup}>
          <Form.Field key="new-group-name">
            <Form.Input
              id="group-name"
              name={'groupName'}
              placeholder={'New Group Name'}
              width={4}
              {...bindGroupName}
            />
          </Form.Field>
          <Divider />
          {groupMembers()}
          <Button color="yellow" onClick={addMember} onKeyPress={addMember} type="button" className="setup-add-row-btn">
            Add Member
          </Button>
          <Button color="green" type="submit">
            Setup
          </Button>
        </form>
      </div>
      </Accordion.Content>
      </Accordion>
      </div>
  );
}