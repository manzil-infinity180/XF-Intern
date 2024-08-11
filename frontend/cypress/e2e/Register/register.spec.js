
describe('register user/admin', () => {
    it('user register', ()  => {
        cy.visit('/register');
        cy.get('[data-testid="checkbox-user"]').click();
        cy.get('[data-testid="checkbox-user"]').check();
        cy.get('[data-testid="input-box-name"]').click().type('Xf User Demo');
        cy.get('[data-testid="input-box-email"]').click().type('demo@xf.intern');
        cy.get('[data-testid="input-box-mobile"]').click().type(2809100428);
        cy.get('[data-testid="input-box-college_name"]').click().type('IIT New York');
        cy.get('[data-testid="input-box-degree"]').click().type('B.Tech in Computer Science');
        cy.get('[data-testid="input-box-year"]').click().type(2032);
        cy.get('[data-testid="input-box-linkedin"]').click().type('https://www.linkedin.com/in/rahul-vishwakarma-553874256/');
        cy.get('[data-testid="input-box-github"]').click().type('https://github.com/manzil-infinity180');
        cy.get('[data-testid="input-box-resume"]').click().type('https://shorturl.at/quKVW');
        cy.get('[data-testid="get-register"]').click();
        cy.wait(2000);
        cy.get('[data-testid="otp-verify"]').click().type('12345'); 
        cy.get('[data-testid="otp-submit-btn"]').click();
        
        // profile edits test
        cy.visit('/user/profile/edits');
        cy.wait(4000);
        cy.get('[data-testid="upload-image-box"]').should('exist').and('have.attr', 'src');
        cy.get('[data-testid="pepe-image"]').should('exist').and('have.attr', 'src');
        cy.get('[data-testid="see-your-application"]').click();
        cy.get('[data-testid="pepe-image"]').should('exist').and('have.attr', 'src');
        cy.wait(1000);
        cy.visit('/');
        cy.wait(1000);
        cy.get('[data-testid="applied-btn-apply"]').first().click();
        cy.get('[data-testid="applied-btn-details"]').eq(2).click();
        cy.get('[data-testid="popup-window-apply"]').click();
        cy.get('.close').click();
    });
    it('admin register',() => {
        cy.visit('/register');
        cy.get('[data-testid="checkbox-admin"]').click();
        cy.get('[data-testid="checkbox-admin"]').check();
        cy.get('[data-testid="input-box-name"]').click().type('Xf Admin Demo');
        cy.get('[data-testid="input-box-email"]').click().type('admin@xf.intern');
        cy.get('[data-testid="input-box-summary"]').click().type(`
               Xf Demo Description,Xf is non-profit small organisation helped
               the fresher/experience developer to get their job/internship.`);
        cy.get('[data-testid="input-box-year"]').click().type(2023);
        cy.get('[data-testid="input-box-field"]').click().type('Technology');
        cy.get('[data-testid="input-box-employee"]').click().type(5);
        cy.get('[data-testid="input-box-website"]').click().type('https://xfintern.onrender.com/');
        cy.get('[data-testid="input-box-linkedin"]').click().type('https://linkedin.com/company/xfintern');
        cy.get('[data-testid="get-register-admin"]').click();
        cy.get('[data-testid="otp-verify"]').click().type('12345'); 
        cy.get('[data-testid="otp-submit-btn"]').click();

    })
})