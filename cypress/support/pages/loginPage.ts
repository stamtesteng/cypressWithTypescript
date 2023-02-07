
export const loginPage = {

    email       : "input[type='email']",
    password    : "input[type='password']",
    button      : "form",
    forgotLink  : "Forget password",

    load() {
        cy.visit(Cypress.env('baseUrl')+"/login")
        return this
    },

    getEmailLocator() {
        return cy.get(this.email)
    },

    getPasswordLocator() {
        return cy.get(this.password)
    },

    getSubmitLocator() {
        return cy.get(this.button)
    },

    getForgotPasswordLocator() {
        return cy.get(this.forgotLink)
    },

    login(email: string, password: string) {

        // intercept the request to BE in order to wait until it sends the response and avoid flakiness
        cy.intercept("POST", "/api/auth").as('auth');

        this.getEmailLocator().type(email)
        this.getPasswordLocator().type(password)
        this.getSubmitLocator().submit()

        // wait for the BE response
        cy.wait('@auth');
        // wait for the page change
        this.getPasswordLocator().should("not.exist");

        return this
    }

}
