import React, { useEffect, useState } from 'react';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import useInput from '../../Shared/useInput';
import useMembers from './useMembers'
import { getToken, setAuthorisationToken } from '../Authentication/Auth';
import api from '../../Services/api';
import './Panel.css';;


export default function SetupGroup(props) {
  const [newMembers, addMember, updateMember] = useMembers([]);
  const { value: groupNameValue, bind: bindGroupName } = useInput('');

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
    ))
  };

  return (
    <div className="">
        <Form onSubmit={handleSetupGroup}>
          <Form.Field key="new-group-name">
            <Form.Input
              id="group-name"
              name={'groupName'}
              placeholder={'New Group Name'}
              width={9}
              {...bindGroupName}
            />
          </Form.Field>
          <Divider />
          {addNewGroupMember()}
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
  )


}