import PracticeFormPage from '../pages/practice-form.page';

class PracticeFormActions {
  constructor() {
    this.practiceFormPage = new PracticeFormPage();
  }

  navigateToPracticeForm() {
    cy.visit('/');
    
    // Wait for page to load and handle potential overlays
    cy.wait(2000);
    
    // Scroll to and click Forms menu
    this.practiceFormPage.elements.formsMenu().scrollIntoView().should('be.visible');
    this.practiceFormPage.elements.formsMenu().click({ force: true });
    
    // Click Practice Form submenu
    this.practiceFormPage.elements.practiceFormSubmenu().should('be.visible');
    this.practiceFormPage.elements.practiceFormSubmenu().click({ force: true });
    
    // Verify we're on the practice form page
    cy.url().should('include', 'automation-practice-form');
    
    return this;
  }

  fillFormWithRandomData() {
    // Generate random test data
    const testData = {
      firstName: 'Test' + Math.floor(Math.random() * 1000),
      lastName: 'User' + Math.floor(Math.random() * 1000),
      email: `test${Math.floor(Math.random() * 1000)}@example.com`,
      gender: ['Male', 'Female', 'Other'][Math.floor(Math.random() * 3)],
      mobile: '9' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0'),
      dateOfBirth: '15 May 1990',
      subjects: ['Maths', 'Physics', 'Computer Science'][Math.floor(Math.random() * 3)],
      hobbies: ['Sports', 'Reading', 'Music'][Math.floor(Math.random() * 3)],
      address: '123 Test Street, Test City, Test State - 123456',
      state: 'NCR',
      city: 'Delhi'
    };

    // Store test data for later validation
    cy.wrap(testData).as('formData');

    // Fill form fields
    this.practiceFormPage.elements.firstName().clear().type(testData.firstName);
    this.practiceFormPage.elements.lastName().clear().type(testData.lastName);
    this.practiceFormPage.elements.userEmail().clear().type(testData.email);
    
    // Select gender
    this.practiceFormPage.elements.genderRadio(testData.gender).click({ force: true });
    
    // Fill mobile number
    this.practiceFormPage.elements.userNumber().clear().type(testData.mobile);
    
    // Handle date of birth (click to open calendar and select)
    this.practiceFormPage.elements.dateOfBirthInput().click();
    // For simplicity, just click outside to close the calendar
    cy.get('body').click(0, 0);
    
    // Fill subjects (type and select from dropdown)
    this.practiceFormPage.elements.subjectsInput().type(testData.subjects);
    cy.get('.subjects-auto-complete__option').first().click();
    
    // Select hobbies
    if (testData.hobbies === 'Sports') {
      this.practiceFormPage.elements.hobbiesSports().click({ force: true });
    } else if (testData.hobbies === 'Reading') {
      this.practiceFormPage.elements.hobbiesReading().click({ force: true });
    } else if (testData.hobbies === 'Music') {
      this.practiceFormPage.elements.hobbiesMusic().click({ force: true });
    }
    
    // Fill current address
    this.practiceFormPage.elements.currentAddress().clear().type(testData.address);
    
    // Select state and city
    this.practiceFormPage.elements.stateDropdown().click();
    cy.get('.css-1uccc91-singleValue').contains(testData.state).click();
    
    this.practiceFormPage.elements.cityDropdown().click();
    cy.get('.css-1uccc91-singleValue').contains(testData.city).click();

    cy.log('Form filled with random data successfully');
    return this;
  }

  uploadTestFile() {
    const filePath = 'test-file.txt';
    this.practiceFormPage.elements.uploadPicture().attachFile(filePath);
    cy.log('Test file uploaded successfully');
    return this;
  }

  submitForm() {
    // Scroll to submit button and click
    this.practiceFormPage.elements.submitButton().scrollIntoView();
    this.practiceFormPage.elements.submitButton().should('be.visible');
    this.practiceFormPage.elements.submitButton().click({ force: true });
    
    cy.log('Form submitted successfully');
    return this;
  }

  validateConfirmationPopup() {
    // Wait for modal to appear
    cy.wait(1000);
    this.practiceFormPage.validateModalVisible();
    
    // Validate modal content
    this.practiceFormPage.elements.modalBody().should('be.visible');
    
    cy.log('Confirmation popup validated successfully');
    return this;
  }

  closePopup() {
    this.practiceFormPage.elements.closeModalButton().should('be.visible');
    this.practiceFormPage.elements.closeModalButton().click({ force: true });
    
    // Verify modal is closed
    this.practiceFormPage.elements.confirmationModal().should('not.exist');
    
    cy.log('Popup closed successfully');
    return this;
  }

  validateFormSubmission() {
    this.practiceFormPage.validateFormSubmitted();
    cy.log('Form submission validation completed');
    return this;
  }
}

export default PracticeFormActions;
