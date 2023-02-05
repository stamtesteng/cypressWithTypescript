
describe('Verify BE response and use type for json response', () => {

    it("get response from BE and verify - using response type", () => {

        cy.loginReturnUserResponse(Cypress.env('email'), Cypress.env('password'))
        .then((body) => {
            // expect(body.user.emailVerified).to.be.false;
            // expect(body.user.email).to.equal(Cypress.env('email'));
            // expect(body.user.name).to.equal("Yiannis");
            // expect(body.user.username).to.equal("yiannis");
        })
        cy.contains("You have been logged in.").should("not.be.visible");

    });

});

