import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

/**
 * Practice Form Step Definitions
 * Handles form filling, file upload, and form submission workflows
 */

// Form Filling Steps
When('I fill all form fields with random values', () => {
  const testData = {
    firstName: 'Test' + Math.floor(Math.random() * 1000),
    lastName: 'User' + Math.floor(Math.random() * 1000),
    email: `test${Math.floor(Math.random() * 1000)}@example.com`,
    mobile: '9' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')
  };

  cy.get('#firstName').clear().type(testData.firstName);
  cy.get('#lastName').clear().type(testData.lastName);
  cy.get('#userEmail').clear().type(testData.email);
  cy.get('input[value="Male"]').click({ force: true });
  cy.get('#userNumber').clear().type(testData.mobile);
  cy.get('#currentAddress').clear().type('123 Test Street, Test City');
  
  cy.log('Form filled with random values');
});

// File Upload Steps
When('I upload a test file', () => {
  cy.get('#uploadPicture').attachFile('test-file.txt');
  cy.log('Test file uploaded');
});

// Form Submission Steps
When('I submit the form', () => {
  cy.get('#submit').scrollIntoView().should('be.visible');
  cy.get('#submit').click({ force: true });
  cy.log('Form submitted');
});

// Form Validation Steps
Then('a confirmation popup should appear', () => {
  cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
  cy.get('#example-modal-sizes-title-lg').should('contain.text', 'Thanks for submitting the form');
  cy.log('Confirmation popup appeared and validated');
});

When('I close the popup', () => {
  // Wait for the modal to be fully loaded
  cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
  
  // Try different methods to close the modal
  cy.get('body').then(($body) => {
    if ($body.find('#closeLargeModal').length > 0) {
      // Try clicking with force
      cy.get('#closeLargeModal').click({ force: true });
    } else if ($body.find('.modal-header .close').length > 0) {
      // Alternative close button
      cy.get('.modal-header .close').click({ force: true });
    } else {
      // Press Escape key
      cy.get('body').type('{esc}');
    }
  });
  
  // Verify modal is closed
  cy.get('.modal-content').should('not.exist');
  cy.log('Popup closed');
});

Then('the form should be successfully submitted', () => {
  cy.url().should('include', 'automation-practice-form');
  cy.log('Form submission validation completed');
});
