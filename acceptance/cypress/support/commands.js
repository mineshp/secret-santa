import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', (user) => {
  cy.goTo('/');
  cy.get('input[name=memberName]').type(user.memberName);
  cy.get('input[name=groupID]').type(user.groupName);
  cy.get('input[name=passphrase]').type(user.passphrase);

  cy.get('[data-testid="login-btn"]').click();
});

Cypress.Commands.add('goTo', (path) => {
  cy.visit(path, {
    failOnStatusCode: false,
    timeout: 30000
  });
});
