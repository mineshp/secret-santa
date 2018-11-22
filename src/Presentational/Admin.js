import React from 'react';
import PropTypes from 'prop-types';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import GroupMembers from '../Presentational/GroupMembers';

const Admin = ({
  handleSetup,
  handleDraw,
  handleInputChange,
  groupID,
  addMember,
  group
}) => {
  return (
    <div className="container-admin">
      <Header as='h3'>
        Setup <span className="toUpperCase">{groupID}</span> Group
      </Header>
      <div className="box-wishlist">
        <Button color="yellow" onClick={addMember} className="setup-add-row-btn">
          Add Member
        </Button>
        <Divider />
        <form onSubmit={handleSetup}>
          <GroupMembers
            handleInputChange={handleInputChange}
            group={group}
          />
          <Button color="green" onClick={handleSetup}>
            Setup
          </Button>
          <Button color="blue" onClick={handleDraw}>
            Draw
          </Button>
        </form>
      </div>
    </div>
  );
};

Admin.propTypes = {
  // data: PropTypes.shape({})
};

Admin.defaultProps = {
  message: {},
  data: {
    group: []
  }
};

export default Admin;
