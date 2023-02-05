
describe("interacting with input field", () => {

    it("click on input field", () => {

        cy.visit("https://www.google.gr?hl=en");
        cy.get("#W0wltc > .QS5gu").click();
        cy.get("#W0wltc > .QS5gu").should("not.be.visible");
        
        cy.get("[name='q']")
        .type("Yiannis");

        cy.get('.aajZCb').should("be.visible");
        cy.get('.aajZCb li').should("have.length", "11").contains("Yiannis");
        
        cy.get('.aajZCb').find('li').eq(1).contains("Ritsos");
        cy.get('.aajZCb').find('li').eq(1).should('include.text', "Ritsos");
        cy.get('.aajZCb').find('li').eq(1).should('not.include.text', "Latsis");

        cy.get('.aajZCb li').eq(1).contains("Ritsos");
        cy.get('.aajZCb li').eq(1).should('include.text', "Ritsos");
        cy.get('.aajZCb li').eq(1).should('not.include.text', "Latsis");

        // cy.get('.intro > video').should("not.exist");
        cy.get("[aria-label='Clear']").click();
        cy.get('.aajZCb').should("not.be.visible");
        // cy.get('.intro > video').should("be.visible");

        cy.get("[name='q']")
        .type("Yiannis");

        cy.get('.aajZCb li').eq(1)
        .contains("Ritsos")
        .click();

        cy.contains("https://en.wikipedia.org › wiki › Yiannis_Ritsos");

        

    });

});
