
describe('Custom Commands', () => {

    it("login with success using loginViaUi custom command", () => {

        cy.loginViaUi(Cypress.env('email'), Cypress.env('password'));

        cy.contains("You have been logged in.").should("not.be.visible");

    });

});

