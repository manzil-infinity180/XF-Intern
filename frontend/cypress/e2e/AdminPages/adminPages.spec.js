// Note that "No Post from Admin"
// then this will work

describe('Checking the admin pages', () => {
    it('admin all post page', () => {
        cy.login('admin');
        cy.visit('/admin/allpost');
        // admin should not have the post yet (No Post)
        cy.get('[data-testid="click-here-btn"]').click();
        cy.url().should('include', '/admin/post');
        cy.get('[data-testid="job-post-type"]').select('internship-onsite');
        cy.get('[data-testid="input-box-name"]').click().type('Xf Demo POST');
        cy.get('[data-testid="input-box-description"]')
        .click()
        .type(`Xf Demo Description 
               Xf is non-profit small organisation helped
               the fresher/experience developer to get their job/internship.`);
        cy.get('[ data-testid="input-box-skills"]').click().type('javascript, nodejs, blockchain, aws, docker');
        cy.get('[data-testid="input-box-salary"]').click().type(9000);
        cy.get('[data-testid="input-box-duration"]').click().type(6);
        // cy.get('[data-testid="input-box-start"]').click().type('12/05/2023').type('{enter}');
        // cy.get('[data-testid="input-box-deadline"]').click().type('12/06/2023').type('{enter}');
        cy.get('[data-testid="new-post-btn"]').click();
        cy.wait(2000);
        cy.url().should('include', '/admin/allpost');
        cy.get('[data-testid="update-post-btn"]').its('length').should('eq',1);
        cy.get('[data-testid="delete-post-btn"]').its('length').should('eq',1);
        cy.get('[data-testid="details-post-btn"]').its('length').should('eq',1);
        cy.get('[data-testid="update-post-btn"]').click();
        cy.get('[data-testid="input-box-name"]').click().clear().type('Xf Demo POST Updated')
        cy.get('[data-testid="update-post-btn"]').click();
        cy.url().should('include', '/admin/allpost');
        cy.get('[data-testid="details-post-btn"]').click();
        cy.get('[data-testid="who-applied"]').should('exist');
        cy.get('.close').click();
        cy.get('[data-testid="delete-post-btn"]').click();
        cy.get('[data-testid="click-here-btn"]').should('exist');
        cy.visit('/admin/profile/edits');
        cy.get('[data-testid="image-upload-admin"]')
        .selectFile('cypress/fixtures/xflogo.png');
        cy.get('[data-testid="update-me-btn"]').click();
        // cy.logout();
    })
})