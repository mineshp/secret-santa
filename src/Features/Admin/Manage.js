import React, { useState } from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Notification from '../../Shared/Notification';

import useInput from '../../Shared/useInput'
import { getToken, setAuthorisationToken } from '../Authentication/Auth';
import api from '../../Services/api';
import useMembers from './useMembers';

export default function Admin(props) {
  const [newMembers, addMember, updateMember] = useMembers([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();
  const { value: groupNameValue, bind: bindGroupName } = useInput('');

  const displayNotification = (messageData) => {
    setShowNotification(true);
    return setNotificationMessage(messageData);
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

  const handleDraw = async (event) => {
    event.preventDefault();

    if (newMembers && newMembers.length > 1) {
      const token = getToken();
      await api.get(
        `/secretsanta/draw/${groupNameValue}`,
        { headers: setAuthorisationToken(token) }
      )
        .then(({ data }) => displayNotification({
          type: 'positive',
          messageHeader: `Successfully created draw for ${groupNameValue}.`
        }))
        .catch((err) => displayNotification({
          type: 'negative',
          messageHeader: `Error creating draw for ${groupNameValue}, ${err}`
        }));
    }
  };

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

  return (
    <div className="container-admin">
      { showNotification && notificationMessage
        && (
        <Notification
          type={notificationMessage.type}
          messageHeader={notificationMessage.messageHeader}
        />
        )
      }
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
          <Button color="blue" type="button" onClick={handleDraw}>
            Draw
          </Button>
        </form>
      </div>
    </div>
  );
}