
describe('Login via API', () => {

    it("login with success using mutation/loginViaApi custom command", () => {

        cy.visit(Cypress.env('baseUrl') + "/feed");

        cy.loginViaApi(Cypress.env('email'), Cypress.env('password'));

        cy.reload();

        cy.contains("You have been logged in.").should("not.exist");
        cy.contains("sign in").should("not.exist");

    });
    
});

