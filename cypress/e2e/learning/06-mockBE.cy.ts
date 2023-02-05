
describe('Mocking BE', () => {

    it("Posts without MOCK -> should have 10 results", () => {

        cy.loginViaUi(Cypress.env('email'), Cypress.env('password'));

        cy.get(".PostList_wrap__M0eE5").children("div").should("have.length", 10);

    });


    it("Posts using MOCKing -> should have only 2 results", () => {

        cy.intercept('GET', '/api/posts?limit=10', {
            fixture: 'posts2.json'
        })

        cy.loginViaUi(Cypress.env('email'), Cypress.env('password'));

        cy.get(".PostList_wrap__M0eE5").children("div").should("have.length", 2);

    });


    it("Posts using MOCKing -> should have 0 results", () => {

        cy.intercept('GET', '/api/posts?limit=10', {
            statusCode: 304,
            body: {
                posts: []
            }
        });

        cy.loginViaUi(Cypress.env('email'), Cypress.env('password'));

        cy.get(".PostList_wrap__M0eE5").should("not.exist");

    });

});

