
describe('learn about locators', () => {

    it("can locate a button on the page", () => {
        cy.visit("https://www.google.gr?hl=en");
        
        cy.get("#W0wltc > .QS5gu").click();
        
        // cy.get("input[title='Search']")
        cy.get("input[title='Search']", {timeout: 10000})
        .should('be.visible')
        .and('have.class', 'gLFyf')
        .and("have.attr", "maxlength", "2048");

        cy.get("input[title='Search']").type("Yiannis");
        
        cy.get("input[title='Search']")
        .should("have.value", "Yiannis");

    });


});

