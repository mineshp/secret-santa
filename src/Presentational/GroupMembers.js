import React from 'react';
import PropTypes from 'prop-types';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';

const GroupMembers = ({
  handleInputChange,
  group
}) => {
  const groupInputs = group.map((row) => (
    <div className="flex-setup-form member-row" key={row.rowId}>
      <div className="box-wishlist setup-input two-col-span">
        <Form.Field key={`member-${row.rowId}`}>
          <Form.Input
            id={row.rowId}
            name={'memberName'}
            placeholder={'Name'}
            onChange={handleInputChange}
            width={4}
          />
        </Form.Field>
      </div>
      <div className="box-wishlist setup-input">
        <Form.Field key={`email-${row.rowId}`}>
        <Form.Input
          id={row.rowId}
          name={'email'}
          placeholder={'Email'}
          onChange={handleInputChange}
          width={4}
          />
        </Form.Field>
      </div>
    </div>
  ));

  return (
    <div>
      {groupInputs}
    </div>
  );
};

export default GroupMembers;


