
describe('Intercept used as wait', () => {

    it("login with success", () => {

        cy.intercept("GET", "/api/posts?limit=10").as('getPostsMutation');


        cy.visit(Cypress.env('baseUrl') + "/feed");

        cy.contains("sign in").click();

        cy.get("input[type='email']")
            .should('be.visible')
            .type(Cypress.env('email'));

        cy.get("input[type='password']")
            .should('be.visible')
            .type(Cypress.env('password'));

        cy.get("form").submit();

        cy.wait('@getPostsMutation');
        cy.get("input[type='password']").should("not.exist");


    });
    
});

