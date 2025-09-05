class PracticeFormPage {
  elements = {
    // Navigation elements
    formsMenu: () => cy.get('.header-wrapper').contains('Forms'),
    practiceFormSubmenu: () => cy.get('.menu-list').contains('Practice Form'),
    
    // Form elements
    firstName: () => cy.get('#firstName'),
    lastName: () => cy.get('#lastName'),
    userEmail: () => cy.get('#userEmail'),
    genderMale: () => cy.get('input[value="Male"]'),
    genderFemale: () => cy.get('input[value="Female"]'),
    genderOther: () => cy.get('input[value="Other"]'),
    userNumber: () => cy.get('#userNumber'),
    dateOfBirthInput: () => cy.get('#dateOfBirthInput'),
    subjectsInput: () => cy.get('#subjectsInput'),
    hobbiesSports: () => cy.get('#hobbies-checkbox-1'),
    hobbiesReading: () => cy.get('#hobbies-checkbox-2'),
    hobbiesMusic: () => cy.get('#hobbies-checkbox-3'),
    uploadPicture: () => cy.get('#uploadPicture'),
    currentAddress: () => cy.get('#currentAddress'),
    stateDropdown: () => cy.get('#state'),
    cityDropdown: () => cy.get('#city'),
    submitButton: () => cy.get('#submit'),
    
    // Modal elements
    confirmationModal: () => cy.get('.modal-content'),
    modalTitle: () => cy.get('#example-modal-sizes-title-lg'),
    modalBody: () => cy.get('.modal-body'),
    closeModalButton: () => cy.get('#closeLargeModal'),
    
    // Utility selectors
    genderRadio: (gender) => cy.get(`input[value="${gender}"]`),
    hobbiesCheckbox: (hobby) => cy.get('.custom-checkbox').contains(hobby),
    stateOption: (state) => cy.get('#state').contains(state),
    cityOption: (city) => cy.get('#city').contains(city)
  }

  // Validation methods
  validateModalVisible() {
    this.elements.confirmationModal().should('be.visible');
    this.elements.modalTitle().should('contain.text', 'Thanks for submitting the form');
    return this;
  }

  validateFormSubmitted() {
    cy.url().should('include', 'automation-practice-form');
    return this;
  }
}

export default PracticeFormPage;
