const selectItemFromDropdown = (itemName) => {
  cy.get('[data-testid="main-user-nav"]').click();
  cy.get(`a[href*=${itemName}]`).click();
};

const enterInput = (selectorName, value, inputPosNum = 0) => {
  return cy.get(`input[${selectorName}]:eq(${inputPosNum})`)
    .clear()
    .type(value);
};

describe('Admin Panel', () => {
  const MEMBERNAME = 'min';
  const GROUPNAME = 'fairy';
  const PASSPHRASE = 'angel';

  const user = {
    memberName: MEMBERNAME,
    groupName: GROUPNAME,
    passphrase: PASSPHRASE
  };

  beforeEach(() => {
    cy.login(user);
  });

  // TODO: Change users and groups to be testGroup

  describe('Access Admin Area', () => {
    it('Admin user has access to the admin area', () => {
      const ADMIN_MEMBERNAME = 'min';
      const ADMIN_PASSPHRASE = 'angel';

      cy.goTo('/');
      cy.get('input[name=memberName]').type(ADMIN_MEMBERNAME);
      cy.get('input[name=groupID]').type(GROUPNAME);
      cy.get('input[name=passphrase]').type(ADMIN_PASSPHRASE);

      cy.get('[data-testid="login-btn"]').click();
      selectItemFromDropdown('admin');

      cy.get('[data-testid="manage-groups-accordion"]');
    });

    it('Non admin user does not have access to the admin area', () => {
      const NONADMIN_MEMBERNAME = 'jigs';
      const NONADMIN_PASSPHRASE = 'turkey';

      cy.goTo('/');
      cy.get('input[name=memberName]').type(NONADMIN_MEMBERNAME);
      cy.get('input[name=groupID]').type(GROUPNAME);
      cy.get('input[name=passphrase]').type(NONADMIN_PASSPHRASE);

      cy.get('[data-testid="login-btn"]').click();

      // Click User menu
      cy.get('[data-testid="main-user-nav"]').click();
      cy.get('a[href*=admin]').should('not.exist');

      // Try going direct to admin area
      cy.visit('/admin');
      cy.get('[data-testid="manage-groups-accordion"]').should('not.exist');
      cy.get('h2').contains('401 Unauthorised!');
    });
  });

  describe('Setup new group', () => {
    it('Creates a group with members', () => {
      cy.server();
      cy.route('POST', '/dev/api/secretsanta/setup/*').as('setupGroup');

      selectItemFromDropdown('admin');
      cy.get('[data-testid="setup-groups-accordion"]').click();

      enterInput('id=group-name', 'acceptance-test-group');

      enterInput('name=memberName', 'acceptance-test-member1');
      enterInput('name=email', 'acceptance-test-email@member1');

      cy.get('[data-testid="add-member-btn"]')
        .click();

      enterInput('name=memberName', 'acceptance-test-member2', 1);
      enterInput('name=email', 'acceptance-test-email@member2', 1);

      cy.get('[data-testid="setup-group-btn"]')
        .click();

      cy.wait('@setupGroup');

      cy.get('div.ui.tiny.positive.message.notification > div > div').contains('Successfully created new secret santa group acceptance-test-group');
    });
  });


  describe('Manage Groups', () => {
    it('Displays groups', () => {
      // Setup some fake data rather than rely on a db call as tabkle data will dynamically change.
      cy.server();
      cy.fixture('allgroups.json').as('allGroupsJSON');
      cy.route('/dev/api/secretsanta/admin/allgroups', '@allGroupsJSON').as('allGroups');

      selectItemFromDropdown('admin');
      cy.wait('@allGroups');

      cy.get('[data-testid="allgroups"]')
        .children('tbody')
        .within(() => {
          cy.get('tr').eq(0);
              cy.get('td').eq(0).contains('testgroup');
              cy.get('td').eq(1).contains(2);
              cy.get('td').eq(2).contains('button', 'Draw');
              cy.get('td').eq(3).contains('button', 'Delete');
              cy.get('td').eq(4).contains('button', 'Send');
        });
    });

    it('Removes a group', () => {
      const groupName = 'acceptance-test-group';

      cy.server();
      cy.route('GET', '/dev/api/secretsanta/admin/allgroups').as('allGroups');
      cy.route('DELETE', `/dev/api/secretsanta/${groupName}`).as('deleteGroup');

      selectItemFromDropdown('admin');
      cy.wait('@allGroups');

      cy.get('[data-testid="acceptance-test-group-delete-btn"]').click();

      cy.wait('@deleteGroup');

      cy.get('div.ui.tiny.positive.message.notification > div > div').contains(`Successfully deleted group ${groupName}`);
      cy.goTo('/admin');
    });
  });

  describe('Search Groups', () => {
    it('Display group and all it\'s members', () => {
      selectItemFromDropdown('admin');
      cy.get('[data-testid="search-groups-accordion"]').click();

      enterInput('id=searchGroup', 'testGroup');

      cy.get('[data-testid="search-group-btn"]').click();

      cy.get('#membersList')
        .children('tbody')
        .within(() => {
          cy.get('tr').eq(0);
              cy.get('td').eq(0).contains('dancer');
              cy.get('td').eq(1).contains('mineshdesigns@gmail.com');
              cy.get('td').eq(2).get('i').should('have.class', 'green check icon');
              cy.get('td').eq(3).get('i').should('have.class', 'red close icon');
              cy.get('td').eq(4).contains('never');
              cy.get('td').eq(5).contains('button', 'Send');
        });
    });
  });
});