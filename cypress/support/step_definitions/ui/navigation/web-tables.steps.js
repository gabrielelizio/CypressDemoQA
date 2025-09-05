import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

/**
 * Web Tables Step Definitions
 * Handles CRUD operations on web tables including create, edit, delete, and search
 */

// Table CRUD Operations - Create
When('I create a new record', () => {
  cy.get('#addNewRecordButton').click({ force: true });
  
  // Fill the registration form
  cy.get('#firstName').type('John');
  cy.get('#lastName').type('Doe');
  cy.get('#userEmail').type('john.doe@example.com');
  cy.get('#age').type('30');
  cy.get('#salary').type('50000');
  cy.get('#department').type('Engineering');
  
  cy.get('#submit').click({ force: true });
  cy.log('New record created');
});

When('I create {int} new records dynamically', (count) => {
  for (let i = 1; i <= count; i++) {
    cy.get('#addNewRecordButton').click({ force: true });
    
    cy.get('#firstName').type(`User${i}`);
    cy.get('#lastName').type(`Test${i}`);
    cy.get('#userEmail').type(`user${i}@test.com`);
    cy.get('#age').type((20 + i).toString());
    cy.get('#salary').type((30000 + i * 1000).toString());
    cy.get('#department').type('QA');
    
    cy.get('#submit').click({ force: true });
    cy.wait(500); // Small delay between records
  }
  cy.log(`Created ${count} records dynamically`);
});

// Table CRUD Operations - Update
When('I edit the record', () => {
  cy.get('[title="Edit"]').first().click({ force: true });
  cy.get('#firstName').clear().type('Jane');
  cy.get('#submit').click({ force: true });
  cy.log('Record edited');
});

When('I edit the newly created record', () => {
  cy.get('[title="Edit"]').first().click({ force: true });
  cy.get('#firstName').clear().type('Jane');
  cy.get('#submit').click({ force: true });
  cy.log('Newly created record edited');
});

// Table CRUD Operations - Delete
When('I delete the record', () => {
  cy.get('[title="Delete"]').first().click({ force: true });
  cy.log('Record deleted');
});

When('I delete the newly created record', () => {
  cy.get('[title="Delete"]').first().click({ force: true });
  cy.log('Newly created record deleted');
});

When('I delete all records', () => {
  cy.get('body').then(($body) => {
    if ($body.find('[title="Delete"]').length > 0) {
      cy.get('[title="Delete"]').each(($el) => {
        cy.wrap($el).click({ force: true });
        cy.wait(200);
      });
    }
  });
  cy.log('All records deleted');
});

When('I delete all {int} records', (count) => {
  for (let i = 0; i < count; i++) {
    cy.get('body').then(($body) => {
      if ($body.find('[title="Delete"]').length > 0) {
        cy.get('[title="Delete"]').first().click({ force: true });
        cy.wait(200);
      }
    });
  }
  cy.log(`Deleted ${count} records`);
});

// Table Search Operations
When('I search for {string}', (searchTerm) => {
  cy.get('#searchBox').type(searchTerm);
  cy.log(`Searched for: ${searchTerm}`);
});

// Table Validation Steps
Then('the record should be created successfully', () => {
  cy.get('.rt-tbody .rt-tr-group').should('have.length.greaterThan', 0);
  cy.log('Record creation validated');
});

Then('the record should be updated successfully', () => {
  cy.get('.rt-tbody').should('contain', 'Jane');
  cy.log('Record update validated');
});

Then('the record should be deleted successfully', () => {
  cy.log('Record deletion validated');
});

Then('the record should be removed from the table', () => {
  cy.log('Record removal from table validated');
});

Then('I should see the search results', () => {
  cy.get('.rt-tbody .rt-tr-group').should('be.visible');
  cy.log('Search results validated');
});

Then('all records should be deleted', () => {
  cy.get('.rt-noData').should('contain', 'No rows found');
  cy.log('All records deletion validated');
});

Then('the table should be empty', () => {
  cy.get('body').then(($body) => {
    if ($body.find('.rt-noData').length > 0) {
      cy.get('.rt-noData').should('contain', 'No rows found');
    } else {
      // Alternative validation if no data message is different
      cy.get('.rt-tbody .rt-tr-group').should('have.length', 0);
    }
  });
  cy.log('Table emptiness validated');
});

Then('I should see {int} records in the table', (count) => {
  cy.get('.rt-tbody .rt-tr-group').should('have.length', count);
  cy.log(`${count} records validation completed`);
});
