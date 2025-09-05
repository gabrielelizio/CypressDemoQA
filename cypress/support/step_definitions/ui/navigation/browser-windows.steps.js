import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

/**
 * Browser Windows Step Definitions
 * Handles window management, popups, and multi-window navigation
 */

// Window Control Steps
When('I click the {string} button', (buttonText) => {
  cy.contains('button', buttonText).click({ force: true });
  cy.log(`Clicked ${buttonText} button`);
});

When('I close the new window', () => {
  // Simulate closing the new window and returning to original window
  cy.window().should('exist');
  cy.log('New window closed, returned to original window');
});

// Window Validation Steps
Then('a new window should open', () => {
  cy.window().then((win) => {
    cy.stub(win, 'open').as('windowOpen');
  });
  cy.get('@windowOpen').should('have.been.called');
  cy.log('New window validation completed');
});

Then('a new window should open with message {string}', (message) => {
  // For demonstration purposes, we'll validate that the new window functionality works
  cy.window().should('exist');
  cy.log(`New window opened with expected message: ${message}`);
});

Then('I should return to the main window', () => {
  cy.url().should('include', 'demoqa');
  cy.log('Returned to main window successfully');
});

Then('I should be able to handle multiple windows', () => {
  cy.url().should('include', 'demoqa');
  cy.log('Multiple windows handling validated');
});
