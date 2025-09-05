import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

/**
 * Shared UI Step Definitions
 * Common navigation and general UI interactions used across multiple features
 */

// Common Navigation Steps
Given('I access the demoqa website', () => {
  cy.visit('/');
  cy.wait(2000);
});

When('I navigate to {string} -> {string}', (menu, submenu) => {
  // Handle sidebar navigation
  cy.get('body').then(($body) => {
    if ($body.find('.left-pannel').length > 0) {
      // Standard sidebar navigation
      cy.get('.left-pannel').within(() => {
        cy.contains('span', menu).click();
        cy.wait(1000);
        cy.contains('span', submenu).click();
      });
    } else {
      // Alternative navigation for different layouts
      cy.get('body').within(() => {
        cy.contains(menu).click();
        cy.wait(1000);
        cy.contains(submenu).click();
      });
    }
  });
  cy.wait(2000);
});

// Common UI Helper Steps
When('I scroll to element {string}', (selector) => {
  cy.get(selector).scrollIntoView();
  cy.wait(500);
});

When('I wait for {int} seconds', (seconds) => {
  cy.wait(seconds * 1000);
});

Then('the page should load successfully', () => {
  cy.get('body').should('be.visible');
  cy.url().should('include', 'demoqa.com');
});

// Common Popup/Modal Handling
When('I close any open modal or popup', () => {
  cy.get('body').then(($body) => {
    if ($body.find('.modal-content').length > 0) {
      cy.get('.modal-content').within(() => {
        cy.get('button').contains('Close').click();
      });
    }
    if ($body.find('[role="dialog"]').length > 0) {
      cy.get('[role="dialog"]').within(() => {
        cy.get('button').first().click();
      });
    }
  });
});

// Common Validation Steps
Then('I should see element {string}', (selector) => {
  cy.get(selector).should('be.visible');
});

Then('I should see text {string}', (text) => {
  cy.contains(text).should('be.visible');
});

Then('element {string} should contain text {string}', (selector, text) => {
  cy.get(selector).should('contain.text', text);
});

Then('element {string} should have attribute {string} with value {string}', (selector, attribute, value) => {
  cy.get(selector).should('have.attr', attribute, value);
});
