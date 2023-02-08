
describe("interacting with input field", () => {

    it("click on input field", () => {

        cy.visit("https://www.google.gr?hl=en");


        cy.get("body").then($body => {
            if ($body.find("#W0wltc > .QS5gu").length > 0) {   
                cy.get("#W0wltc > .QS5gu").click();
            }
        });
        
        cy.get("[name='q']")
        .type("Yiannis R");

        cy.get('.aajZCb').should("be.visible");
        cy.get('.aajZCb li').should("have.length", "11").contains("Yiannis");
        
        cy.get('.aajZCb').find('li').eq(0).contains("Ritsos");
        cy.get('.aajZCb').find('li').eq(0).should('include.text', "Ritsos");
        cy.get('.aajZCb').find('li').eq(0).should('not.include.text', "Latsis");

        cy.get('.aajZCb li').eq(0).contains("Ritsos");
        cy.get('.aajZCb li').eq(0).should('include.text', "Ritsos");
        cy.get('.aajZCb li').eq(0).should('not.include.text', "Latsis");

        // cy.get('.intro > video').should("not.exist");
        cy.get("body").then($body => {
            if ($body.find("No thanks").length > 0) {   
                cy.contains("No thanks").click();
            }
        });
        
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
