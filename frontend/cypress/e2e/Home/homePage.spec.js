// Home and AdminOpening Page 
// '/' and '/admin/:adminId'

describe('Home Page Visit',() => {
    it('Test all component', () => {
        cy.visit('/');
        cy.location().should((loc) => {
            expect(loc.host).to.eq('localhost:5173')
            expect(loc.hostname).to.eq('localhost')
            expect(loc.origin).to.eq('http://localhost:5173')
          })
        cy.get('#search_field_class').should('exist');
        cy.get('.submit_btn_input').first().should('have.text','Search');
        cy.get('.intern-data ').its('length').should('eq',10);
        cy.get('[data-testid="applied-btn-apply"]').its('length').should('eq',10);
        cy.get('[data-testid="applied-btn-details"]').its('length').should('eq',10);
        cy.get('.submit_btn_input').first().click();
        cy.get('[data-testid="applied-btn-details"]').first().click();
        cy.get('[data-testid="popup-window"]').should('exist');
        cy.get('[data-testid="popup-window-apply"]').should('exist');
        cy.get('[data-testid="popup-window-bookmark"]').should('exist');
        cy.get('[data-testid="popup-window-openings"]').click();
        // cy.wait(15000);
        cy.get('[data-testid="admin-detail-box"]').should('exist');
        cy.get('[data-testid="admin-post-opening"]').should('exist');
    })
})