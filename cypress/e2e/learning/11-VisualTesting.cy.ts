
describe('Visual Testing', () => {

    // This method performs setup before each test.
    beforeEach(() => {

        // Open Eyes to start visual testing.
        // Each test should open its own Eyes for its own snapshots.
        cy.eyesOpen({

            // The name of the application under test.
            // All tests for the same app should share the same app name.
            // Set this name wisely: Applitools features rely on a shared app name across tests.
            appName: 'learning Cypress With Typescript',

            // The name of the test case for the given application.
            // Additional unique characteristics of the test may also be specified as part of the test name,
            // such as localization information ("Home Page - EN") or different user permissions ("Login by admin"). 
            testName: Cypress.currentTest.title,
        })
    })


    it("Visual testing using Applitools", () => {

        /**
         * 
         */

        cy.visit(Cypress.env('baseUrl') + "/feed");

        cy.loginViaUi(Cypress.env('email'), Cypress.env('password'));

        cy.get('.Nav_trigger__1D3cn').click();
        cy.get('[href="/settings"]').click();

        cy.contains("About You").should("be.visible");

        cy.editProfileDefineTypeOnlyOnce({
            name: 'Yiannis',
            username: 'yiannis',
            bio: 'ela re'
        })

        cy.reload()

        cy.eyesCheckWindow({
            tag: "Original bio",
            target: 'window',
            fully: true
        });

        cy.editProfileDefineTypeOnlyOnce({
            name: 'Yiannis',
            username: 'yiannis',
            bio: 'visual testing'
        })

        cy.reload()

        cy.eyesCheckWindow({
            tag: "Updated bio",
            target: 'window',
            fully: true, 
            ignore: {
                selector: '.Input_textarea__IgABu'
            }
        });

    });

    // This method performs cleanup after each test.
    afterEach(() => {

        // Close Eyes to tell the server it should display the results.
        cy.eyesClose()

        // re-assign the original bio value to the profile
        cy.editProfileDefineTypeOnlyOnce({
            name: 'Yiannis',
            username: 'yiannis',
            bio: 'ela re'
        })
    })

});

// APPITOOLS_API_KEY="6H2vAo79KNrqoVqTlZBulc4mc107jF5roTxeqcn4tGIFo110" npx cypress open

