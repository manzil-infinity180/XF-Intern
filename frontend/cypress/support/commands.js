// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username = 'user') => {

    cy.visit('/login');

    if(username==='admin'){
        // cy.get('[data-testid="login-btn]').click();
        cy.get('[data-testid="radio-btn-admin"]').click();
        cy.get('[data-testid="input-box-login"]').click().type('admin@xf.intern');
        cy.get('[data-testid="submit-login-admin"]').click();
        cy.get('[data-testid="otp-verify"]').click().type('12345');   
        cy.get('[data-testid="otp-submit-btn"]').click();
        cy.wait(2000);
    }else{
        cy.get('[data-testid="input-box-login"]').click().type('demo@xf.intern');
        cy.get('[data-testid="submit-login-user"]').click();
        cy.get('[data-testid="otp-verify"]').click().type('12345');
        cy.get('[data-testid="otp-submit-btn"]').click();
        cy.wait(2000);
    }
    }
);

// consider the user/admin is logined
Cypress.Commands.add('logout', () => {
    cy.visit('/');
    cy.get('[data-testid="logout-register-btn"]').click();
    cy.wait(2000);
});
