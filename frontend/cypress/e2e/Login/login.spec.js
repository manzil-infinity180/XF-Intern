describe('login page test and other component', () => {
    it('/login', () => {
        cy.visit('/login');
        cy.get('[data-testid="radio-btn-user"]').click();
        cy.get('[data-testid="radio-btn-user"]').check();
        cy.get('[data-testid="input-box-login"]').click().type('demo@xf.intern');
        cy.get('[data-testid="submit-login-user"]').click();
        cy.get('[data-testid="otp-verify"]').click().type('24689');
        cy.get('[data-testid="otp-verify"]').click().clear();
        cy.get('[data-testid="otp-verify"]').click().type('12345');
        cy.get('[data-testid="otp-submit-btn"]').click();
        cy.wait(2000);
        cy.visit('/user/profile/edits');
        cy.wait(2000);
        // cy.get('[data-testid="pepe-image"]').should('not.exist');
        cy.get('[data-testid="upload-image-here"]')
        .selectFile('cypress/fixtures/xflogo.png');
        cy.get('[data-testid="update-me-image"]').click();
        // cy.logout();
        // cy.get('[data-testid="logout-register-btn"]').click();
        // admin login
        // cy.visit('/login');
        // cy.get('[data-testid="login-btn]').click();
        // cy.get('[data-testid="radio-btn-admin"]').click();
        // cy.get('[data-testid="radio-btn-admin"]').check();
        // cy.get('[data-testid="input-box-login"]').click().type('admin@xf.intern');
        // cy.get('[data-testid="submit-login-admin"]').click();
        // cy.get('[data-testid="otp-verify"]').click().type('24689');
        // cy.get('[data-testid="otp-verify"]').click().clear();
        // cy.get('[data-testid="otp-verify"]').click().type('12345');   
    });
});