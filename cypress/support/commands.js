import 'cypress-file-upload';

// Comando para click forçado
Cypress.Commands.add('forceClick', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).click({ force: true });
});

// Comando para aguardar elemento estar visível
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

// Comando para gerenciar dados de teste
Cypress.Commands.add('setTestData', (key, value) => {
  cy.wrap(value).as(key);
});

Cypress.Commands.add('getTestData', (key) => {
  return cy.get(`@${key}`);
});

// Comando para autenticação via API usando cy.session()
Cypress.Commands.add('loginAPI', (username, password) => {
  cy.session([username, password], () => {
    cy.request({
      method: 'POST',
      url: '/Account/v1/GenerateToken',
      body: { userName: username, password: password }
    }).then((response) => {
      if (response.status === 200) {
        window.localStorage.setItem('authToken', response.body.token);
        window.localStorage.setItem('userName', username);
      }
    });
  });
});

// Comando para navegação com retry
Cypress.Commands.add('navigateWithRetry', (url, maxRetries = 3) => {
  let attempts = 0;
  
  function attemptNavigation() {
    attempts++;
    cy.visit(url).then(() => {
      cy.url().should('include', url);
    }).catch((error) => {
      if (attempts < maxRetries) {
        cy.wait(1000);
        attemptNavigation();
      } else {
        throw error;
      }
    });
  }
  
  attemptNavigation();
});

// Comando para aguardar loading
Cypress.Commands.add('waitForLoading', () => {
  cy.get('body').should('not.have.class', 'loading');
  cy.get('[data-testid="loading"]').should('not.exist');
});
