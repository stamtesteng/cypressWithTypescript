
describe('Delay BE response and control Throttle', () => {

    it("Delay a response to be received from BE - and control Throttle to be less than 3G", () => {

        /* Delay the BE response to be sent to FE */
        cy.intercept("POST", "/api/auth", (req) => {
            req.continue((res) => {
                // apply a delay of x second //and a throttle of 56kbps
                res
                .setDelay(30000)
                .setThrottle(56);
            });
        });

        Cypress.config('responseTimeout', 300000);

        // intercept the request to BE to get all the posts, after a successful login, in order to wait until BE sends the response and avoid flakiness
        cy.intercept("GET", "/api/posts?limit=10").as('getPostsMutation');
        cy.intercept("POST", "/api/auth").as('auth');


        let email = Cypress.env('email');
        let password = Cypress.env('password');

        cy.visit(Cypress.env('baseUrl') + "/feed");

        // wait for the BE response
        cy.wait('@getPostsMutation');

        cy.contains("sign in").click();

        cy.get("input[type='email']")
            .should('be.visible')
            .type(email);
        cy.get("input[type='password']")
            .should('be.visible')
            .type(password);

        cy.get("form").submit();

        // wait for the BE response
        cy.wait('@auth');
        // wait for the page change
        cy.get("input[type='password']").should("not.exist");

        cy.contains("You have been logged in.").should("not.be.visible");

    });

});

