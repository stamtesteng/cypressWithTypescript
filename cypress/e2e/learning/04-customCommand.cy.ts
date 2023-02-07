import { loginPage } from "cypress/support/pages/loginPage";


describe('Custom Commands & Page Objects', () => {

    

    it("login with success using Page Object login locators methods", () => {

        // intercept the request to BE in order to wait until it sends the response and avoid flakiness
        cy.intercept("POST", "/api/auth").as('auth');

        loginPage
        .load()
        .getEmailLocator().type(Cypress.env('email'))
        
        loginPage.getPasswordLocator().type(Cypress.env('password'))
        loginPage.getSubmitLocator().submit()
        // wait for the BE response
        cy.wait('@auth')
        // wait for the page change
        loginPage.getPasswordLocator().should("not.exist");

        cy.contains("You have been logged in.").should("not.be.visible");

    });

    it("login with success using Page Object login method", () => {

        loginPage
        .load()
        .login(Cypress.env('email'), Cypress.env('password'))

        cy.contains("You have been logged in.").should("not.be.visible");

    });


    it("login with success using loginViaUi custom command", () => {

        cy.loginViaUi(Cypress.env('email'), Cypress.env('password'));

        cy.contains("You have been logged in.").should("not.be.visible");

    });


    
});

