import * as userData from '@fixtures/user1.json';
import User from '../typings/user';

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Logs into the posts site using the UI, without waiting BE responses
             * @param email is the email of the user
             * @param password is the password of the user
             * @example cy.loginViaUiSimple("my@email.com", "mypassword")
             */
            loginViaUiSimple(email: string, password: string) : Chainable<any>,

            /**
             * Logs into the posts site using the UI, waiting BE responses
             * @param email is the email of the user
             * @param password is the password of the user
             * @example cy.loginViaUi("my@email.com", "mypassword")
             */
            loginViaUi(userEmail: string, userPassword: string) : Chainable<any>,

            /**
             * Logs into the posts site using the API calls and not depend on UI actions
             * @param userEmail is the email of the user
             * @param userPassword is the password of the user
             * @example cy.loginViaApi("my@email.com", "mypassword")
             */
            loginViaApi(userEmail: string, userPassword: string) : Chainable<any>,
        
        
        /**
             * Logs into the posts site using the UI, returns the BE response
             * @param email is the email of the user
             * @param password is the password of the user
             * @example cy.loginReturnUserResponse("my@email.com", "mypassword")
             */
            loginReturnUserResponse(email: string, password: string) : Chainable<string>,

        }
    }
}



Cypress.Commands.add('loginViaUiSimple', (email: string, password: string) => {

    Cypress.log({
        displayName: "loginViaUiSimple",
        message: email+ " - " + password,
        consoleProps() {
            return {
                email
            }
        },
    });

    /* will use UI in order to login using the provided credentials */

    cy.get("input[type='email']")
        .should('be.visible')
        .type(email);
    cy.get("input[type='password']")
    .should('be.visible')
    .type(password);
    
    cy.get("form").submit();
    
    // wait for the page change
    cy.get("input[type='password']").should("not.exist");
})

Cypress.Commands.add('loginViaUi', (email: string, password: string) => {

    Cypress.log({
        displayName: "loginViaUi",
        message: email+ " - " + password,
        consoleProps() {
            return {
                email
            }
        },
    });

    /* will use UI in order to login using the provided credentials */

    // intercept the request to BE to get all the posts, after a successful login, in order to wait until BE sends the response and avoid flakiness
    cy.intercept("GET", "/api/posts?limit=10").as('getPostsMutation');
    cy.intercept("POST", "/api/auth").as('auth');

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

})


Cypress.Commands.add('loginViaApi', (userEmail: string, userPassword: string) => {

    /* will NOT use UI in order to login using the provided credentials 
        but will send the corresponding http request to BackEnd in order to authenticate user and also start the session and the cookies
    */

        Cypress.log({
            displayName: "loginViaApi",
            message: userEmail+ " - " + userPassword,
            consoleProps() {
                return {
                    userEmail
                }
            },
        });
    
    // // intercept the request to BE to get all the posts, after a successful login, in order to wait until BE sends the response and avoid flakiness
    // cy.intercept("GET", "/api/posts?limit=10").as('getPostsMutation');

    // send the auth request to BE
    cy.request({ 
        // url: "https://nextjs-mongodb.vercel.app/api/auth",
        url: "/api/auth",
        method: 'POST',
        body: {
            email: userEmail,
            password: userPassword
        }
    })
    // .as('auth');
    .then(console.log)
    // validate the response from BE
    .then((resp) => {        
        expect(resp.status).to.equal(200);
        expect(resp.body).to.have.property('user');
        expect(resp.body.user.email).to.equal(userEmail);
        // expect(request.method).to.equal('POST');
        
        /* replace the default email that is stored in fixture json file with the real expected one
           before go to the comparison */ 
        userData.user.email = userEmail;
        expect(resp.body).to.deep.equal(userData);
        
    });

    // cy.get('@auth').should( (response) => {
    //     // expect(response.statusCode).to.equal('200');
    //     expect(response.body).to.have.property('user');
    //     // expect(response.body).to.have.property('user.email');

    // });

    // validate that the cookies was created 
    cy.getCookie('sid').should('exist');
    

    // // wait for the BE response
    // cy.wait('@getPostsMutation');
    // wait for the page change
    cy.get("input[type='password']").should("not.exist");

})



Cypress.Commands.add('loginReturnUserResponse', (email: string, password: string) => {

    Cypress.log({
        displayName: "loginReturnUserResponse",
        message: email+ " - " + password,
        consoleProps() {
            return {
                email
            }
        },
    });

    /* will use UI in order to login using the provided credentials */

    // intercept the request to BE to get all the posts, after a successful login, in order to wait until BE sends the response and avoid flakiness
    cy.intercept("GET", "/api/posts?limit=10").as('getPostsMutation');
    cy.intercept("POST", "/api/auth").as('auth');

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
    // return cy.wait('@auth').its({response.body});
    cy.wait('@auth').then( ({response}) => {
        return response.body;
    });

})

