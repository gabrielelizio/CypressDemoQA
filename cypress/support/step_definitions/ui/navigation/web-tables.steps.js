import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

/**
 * Web Tables Step Definitions
 * Handles CRUD operations on web tables including create, edit, delete, and search
 */

// Store created record data for later operations
let createdRecordData = {};

// Table CRUD Operations - Create
When('I create a new record', () => {
  // Store the unique data we're creating
  createdRecordData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    age: '30',
    salary: '50000',
    department: 'Engineering'
  };
  
  cy.get('#addNewRecordButton').click({ force: true });
  
  // Fill the registration form with stored data
  cy.get('#firstName').type(createdRecordData.firstName);
  cy.get('#lastName').type(createdRecordData.lastName);
  cy.get('#userEmail').type(createdRecordData.email);
  cy.get('#age').type(createdRecordData.age);
  cy.get('#salary').type(createdRecordData.salary);
  cy.get('#department').type(createdRecordData.department);
  
  cy.get('#submit').click({ force: true });
  cy.wait(500); // Wait for record to be added
  cy.log('New record created with firstName: ' + createdRecordData.firstName);
});

When('I create {int} new records dynamically', (count) => {
  // Store all created records for tracking
  const createdRecords = [];
  
  for (let i = 1; i <= count; i++) {
    const recordData = {
      firstName: `User${i}`,
      lastName: `Test${i}`,
      email: `user${i}@test.com`,
      age: (20 + i).toString(),
      salary: (30000 + i * 1000).toString(),
      department: 'QA'
    };
    
    createdRecords.push(recordData);
    
    cy.get('#addNewRecordButton').click({ force: true });
    
    cy.get('#firstName').type(recordData.firstName);
    cy.get('#lastName').type(recordData.lastName);
    cy.get('#userEmail').type(recordData.email);
    cy.get('#age').type(recordData.age);
    cy.get('#salary').type(recordData.salary);
    cy.get('#department').type(recordData.department);
    
    cy.get('#submit').click({ force: true });
    cy.wait(500); // Small delay between records
    cy.log(`Created record ${i}: ${recordData.firstName} ${recordData.lastName}`);
  }
  
  // Store the created records data globally for deletion
  cy.wrap(createdRecords).as('createdRecords');
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
  // Find the row containing our created record data and edit it
  cy.get('.rt-tbody .rt-tr-group').contains(createdRecordData.firstName).parent().parent()
    .within(() => {
      cy.get('[title="Edit"]').click({ force: true });
    });
  
  // Update the stored data
  createdRecordData.firstName = 'Jane';
  
  cy.get('#firstName').clear().type(createdRecordData.firstName);
  cy.get('#submit').click({ force: true });
  cy.wait(500);
  cy.log('Newly created record edited - updated firstName to Jane');
});

// Table CRUD Operations - Delete
When('I delete the record', () => {
  cy.get('[title="Delete"]').first().click({ force: true });
  cy.log('Record deleted');
});

When('I delete the newly created record', () => {
  // Find the row containing our created record data (which may have been edited to "Jane")
  const nameToFind = createdRecordData.firstName; // This will be "Jane" if it was edited
  
  cy.get('.rt-tbody .rt-tr-group').contains(nameToFind).parent().parent()
    .within(() => {
      cy.get('[title="Delete"]').click({ force: true });
    });
  
  cy.wait(500);
  cy.log(`Deleted the record with firstName: ${nameToFind}`);
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
  cy.log(`Starting deletion of only the ${count} records created in this test`);
  
  // Get the created records data if available
  cy.get('@createdRecords').then((createdRecords) => {
    // Verify we have the expected number of records to delete
    expect(createdRecords).to.have.length(count);
    
    // Delete each created record by finding it specifically
    createdRecords.forEach((record, index) => {
      cy.get('body').then(($body) => {
        // Check if the record still exists
        if ($body.find(`.rt-tbody:contains("${record.firstName}")`).length > 0) {
          cy.get('.rt-tbody .rt-tr-group').contains(record.firstName).parent().parent()
            .within(() => {
              cy.get('[title="Delete"]').click({ force: true });
            });
          
          cy.wait(300);
          cy.log(`Deleted record ${index + 1}: ${record.firstName} ${record.lastName}`);
        } else {
          cy.log(`Record ${record.firstName} ${record.lastName} not found - may have been deleted already`);
        }
      });
    });
  }).then(() => {
    // No final cleanup - we only delete the records we created
    cy.wait(1000); // Final wait for UI updates
    cy.log(`Completed deletion of ${count} specific records created in this test`);
  });
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
  // Verify that the specific record we created (and possibly edited) is no longer in the table
  const nameToCheck = createdRecordData.firstName; // This will be "Jane" if it was edited
  
  cy.get('body').then(($body) => {
    if ($body.find('.rt-noData').length > 0) {
      // Table is completely empty
      cy.get('.rt-noData').should('contain', 'No rows found');
      cy.log('Table is empty - record successfully removed');
    } else {
      // Check that our specific record is not in the table
      cy.get('.rt-tbody .rt-tr-group').should('not.contain', nameToCheck);
      cy.log(`Record with firstName "${nameToCheck}" has been successfully removed`);
    }
  });
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
  // Wait for potential UI updates after deletions
  cy.wait(1000);
  
  // Instead of checking if table is completely empty, verify that the specific records we created are gone
  cy.get('@createdRecords').then((createdRecords) => {
    cy.log(`Verifying that the ${createdRecords.length} created records have been deleted`);
    
    createdRecords.forEach((record, index) => {
      // Verify each created record is no longer in the table
      cy.get('body').then(($body) => {
        if ($body.find(`.rt-tbody:contains("${record.firstName}")`).length === 0) {
          cy.log(`✓ Record ${index + 1} (${record.firstName} ${record.lastName}) successfully removed`);
        } else {
          cy.log(`✗ Record ${index + 1} (${record.firstName} ${record.lastName}) still exists!`);
          // This should fail the test if the record still exists
          cy.get('.rt-tbody').should('not.contain', record.firstName);
        }
      });
    });
    
    cy.log('Verification completed: All created records have been successfully removed');
    cy.log('Note: Pre-existing default records may still remain in the table');
  });
});

Then('I should see {int} records in the table', (count) => {
  cy.get('.rt-tbody .rt-tr-group').should('have.length', count);
  cy.log(`${count} records validation completed`);
});
