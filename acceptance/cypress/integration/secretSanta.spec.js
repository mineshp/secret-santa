/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/await-async-utils */
describe('Secret Santa', () => {
  const GIFTEE = 'dancer';
  const MEMBERNAME = 'rudolph';
  const GROUPNAME = 'testgroup';
  const PASSPHRASE = 'noel';

  const user = {
    memberName: MEMBERNAME,
    groupName: GROUPNAME,
    passphrase: PASSPHRASE,
  };

  it('logs in', () => {
    cy.goTo('/');
    cy.get('input[name=memberName]').type(MEMBERNAME);
    cy.get('input[name=groupID]').type(GROUPNAME);
    cy.get('input[name=passphrase]').type(PASSPHRASE);

    cy.get('[data-testid="login-btn"]').click();
  });

  it('reveals my giftee', () => {
    cy.intercept('GET', `/dev/api/reveal/${MEMBERNAME}/${GROUPNAME}`).as(
      'revealGiftee'
    );

    cy.login(user);

    cy.get('[data-testid="reveal-btn"]').should('have.class', 'yellow').click();

    cy.wait('@revealGiftee');

    cy.get('[data-testid="reveal-btn"]').should('have.class', 'violet');
    cy.findByText(GIFTEE);
  });

  it('updates my wishlist', () => {
    cy.intercept('GET', `/dev/api/giftIdeas/${MEMBERNAME}/${GROUPNAME}`).as(
      'getMyWishlist'
    );

    cy.intercept('PUT', `/dev/api/giftIdeas/${MEMBERNAME}/${GROUPNAME}`).as(
      'updateMyWishlist'
    );

    cy.login(user);

    cy.get('[data-testid="my-wishlist-btn"]')
      .should('have.class', 'teal')
      .click();

    cy.wait('@getMyWishlist');

    cy.get('[data-testid="members-wishlist"]').should(
      'contain',
      `${MEMBERNAME}'s Wishlist`
    );

    cy.get('input[name=giftIdea1]').clear().type('carrot');

    cy.get('input[name=giftIdea2]').clear().type('scarf');

    cy.get('input[name=giftIdea3]').clear().type('http://christmas-jumper.com');

    cy.get('[data-testid="save-btn"]').click();

    cy.wait('@updateMyWishlist');

    cy.get('div.ui.tiny.positive.message.notification > div > div').contains(
      'Successfully updated gift ideas.'
    );

    // Go back to main page
    cy.goTo('/');

    // Click the My Wishlist buttons again to assert values were saved
    cy.get('[data-testid="my-wishlist-btn"]')
      .should('have.class', 'teal')
      .click();

    cy.get('input[name=giftIdea1]').should('have.value', 'carrot');

    cy.get('input[name=giftIdea2]').should('have.value', 'scarf');

    cy.get('input[name=giftIdea3]').should(
      'have.value',
      'http://christmas-jumper.com'
    );

    cy.get('[data-testid="back-btn"]').should('have.class', 'grey').click();
  });

  it("displays my giftee's wishlist ", () => {
    cy.intercept('GET', `/dev/api/reveal/${MEMBERNAME}/${GROUPNAME}`).as(
      'revealGiftee'
    );

    cy.intercept('GET', `/dev/api/giftIdeas/${GIFTEE}/${GROUPNAME}`, {
      body: { giftIdeas: ['cat', 'http://foo.com/present', 'coq'] },
    }).as('getMyWishlist');

    cy.login(user);

    cy.get('[data-testid="reveal-btn"]').should('have.class', 'yellow').click();

    // Wait for reveal xhr request
    cy.wait('@revealGiftee');

    cy.get('[data-testid="giftees-wishlist-btn"]')
      .should('have.class', 'blue')
      .click();

    // Wait for get giftee's wishlist
    cy.wait('@getMyWishlist');

    cy.get('[data-testid="giftees-wishlist"]').should(
      'contain',
      `${GIFTEE}'s Wishlist`
    );

    cy.get('[data-testid="giftIdea1"]')
      .should('have.class', 'readonlylist')
      .and('contain', 'cat');

    cy.get('[data-testid="giftIdea2"]')
      .should('have.class', 'readonlylist')
      .and('contain', '🔗 Link has been added, click to view');

    cy.get('[data-testid="giftIdea3"]')
      .should('have.class', 'readonlylist')
      .and('contain', 'coq');

    cy.get('[data-testid="back-btn"]').should('have.class', 'grey').click();
  });
});
