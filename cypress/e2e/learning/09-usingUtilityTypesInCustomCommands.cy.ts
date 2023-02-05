
describe('Using Utility Types in Custom Commands', () => {

    it("Send Request without defining specific type", () => {

        cy.visit(Cypress.env('baseUrl') + "/feed");

        cy.loginViaApi(Cypress.env('email'), Cypress.env('password'));

        // cy.get('.button.Nav_trigger__1D3cn').get('Settngs').click();
        // cy.get("//*[text()='About You']").should("be.visible");

        cy.visit(Cypress.env('baseUrl') + "/settings");

        // 400 bad request : unkown properties
        cy.editProfileNoSpecificType({
            _id: "",
            email: "",
            username: "",
            name: "",
            bio: "",
            emailVerified: false,
            profilePicture: null
        }).should('equal', 400);


        // 400 bad request : empty mandatory values
        cy.editProfileNoSpecificType({
            username: "",
            name: "",
            bio: ""
        }).should('equal', 400);

        // 400 bad request : empty mandatory values
        cy.editProfileNoSpecificType({
            username: "yiannis",
            name: "",
            bio: ""
        }).should('equal', 400);

        // 400 bad request : empty mandatory values
        cy.editProfileNoSpecificType({
            username: "",
            name: "Yiannis",
            bio: ""
        }).should('equal', 400);

        cy.reload();

    });



    it("Send Request defining STRICT request/response types", () => {

        /**
         * Request type should be Strict to UserUpdateProfile type
         * Request type should be Strict to User type
         */

        const bioUpdated: string = "ela re";

        cy.visit(Cypress.env('baseUrl') + "/feed");

        cy.loginViaUi(Cypress.env('email'), Cypress.env('password'));

        // cy.get('.button.Nav_trigger__1D3cn').get('Settngs').click();
        // cy.get("//*[text()='About You']").should("be.visible");

        cy.visit(Cypress.env('baseUrl') + "/settings");

        // PRECONDITION: set the profile to the initial state
        cy.editProfileStrictType({
            username: Cypress.env('username'),
            name: Cypress.env('name'),
            bio: Cypress.env('bio'),
            profilePicture: Cypress.env('profilePicture')
        })

        // ACTION: 
        // 200 OK response : send the request to update profile with new bio
        cy.editProfileStrictType({
            username: Cypress.env('username'),
            name: Cypress.env('name'),
            bio: bioUpdated,
            profilePicture: Cypress.env('profilePicture')
        })
            .then((answer) => {
                // console.log('RESPONSE : ' + answer)
                // expect(answer.user.email).to.equal(Cypress.env('_id'));
                // expect(answer.user.email).to.equal(Cypress.env('email'));
                // expect(answer.user.name).to.equal(Cypress.env('name'));
                // expect(answer.user.username).to.equal(Cypress.env('username'));
                // expect(answer.user.emailVerified).to.be.false;
                // expect(answer.user.bio).to.equal( bioUpdated );
            });

        cy.reload();

        cy.contains("Your Bio").find('textarea').invoke('val')
            .then(text => {
                expect(text).to.equal(bioUpdated);
            });

    });


    it("Pick<> : Send Request defining a subset of properties for request type", () => {

        /**
         * Request type should iunclude only a subset of the UserUpdateProfile type, which is configured in Commands declaration using Pick<....>
         * ====> This means that : Here we can not use/send the profilePicture, since it is not defined in Pick<....>
        */

        const bioUpdated: string = "ela re";

        cy.visit(Cypress.env('baseUrl') + "/feed");

        cy.loginViaUi(Cypress.env('email'), Cypress.env('password'));

        // cy.get('.button.Nav_trigger__1D3cn').get('Settngs').click();
        // cy.get("//*[text()='About You']").should("be.visible");

        cy.visit(Cypress.env('baseUrl') + "/settings");

        // PRECONDITION: set the profile to the initial state
        cy.editProfileUsingPickType({
            username: Cypress.env('username'),
            name: Cypress.env('name'),
            bio: Cypress.env('bio'),
            /** Here we can not use the profilePicture, since it is not defined */
            // profilePicture: Cypress.env('profilePicture')
        })

        // ACTION: 
        // 200 OK response : send the request to update profile with new bio
        cy.editProfileUsingPickType({
            username: Cypress.env('username'),
            name: Cypress.env('name'),
            bio: bioUpdated,
            /** Here we can not use the profilePicture, since it is not defined */
            // profilePicture: Cypress.env('profilePicture')
        })
            .then((answer) => {
                // console.log('RESPONSE : ' + answer)
                // expect(answer.user.email).to.equal(Cypress.env('_id'));
                // expect(answer.user.email).to.equal(Cypress.env('email'));
                // expect(answer.user.name).to.equal(Cypress.env('name'));
                // expect(answer.user.username).to.equal(Cypress.env('username'));
                // expect(answer.user.emailVerified).to.be.false;
                // expect(answer.user.bio).to.equal( bioUpdated );
            });

        cy.reload();

        cy.contains("Your Bio").find('textarea').invoke('val')
            .then(text => {
                expect(text).to.equal(bioUpdated);
            });

    });


    it("Omit<> : Send Request defining ommiting subset of properties for request type - so allow all others", () => {

        /**
         * Request type should iunclude only a subset of the UserUpdateProfile type, which is configured in Commands declaration using Ommit<....>
         * It is the opposite of Pick<...>, since with Ommit<...> we define those propertied that we want to stop from sending
         * ====> This means that : Here we can not use/send the profilePicture, since it is defined in Ommit<....>
        */

        const bioUpdated: string = "ela re";

        cy.visit(Cypress.env('baseUrl') + "/feed");

        cy.loginViaUi(Cypress.env('email'), Cypress.env('password'));

        // cy.get('.button.Nav_trigger__1D3cn').get('Settngs').click();
        // cy.get("//*[text()='About You']").should("be.visible");

        cy.visit(Cypress.env('baseUrl') + "/settings");

        // PRECONDITION: set the profile to the initial state
        cy.editProfileUsingOmmitType({
            username: Cypress.env('username'),
            name: Cypress.env('name'),
            bio: Cypress.env('bio'),
            /** Here we can not use the profilePicture, since it is not defined */
            // profilePicture: Cypress.env('profilePicture')
        })

        // ACTION: 
        // 200 OK response : send the request to update profile with new bio
        cy.editProfileUsingOmmitType({
            username: Cypress.env('username'),
            name: Cypress.env('name'),
            bio: bioUpdated,
            /** Here we can not use the profilePicture, since it is not defined */
            // profilePicture: Cypress.env('profilePicture')
        })
            .then((answer) => {
                // console.log('RESPONSE : ' + answer)
                // expect(answer.user.email).to.equal(Cypress.env('_id'));
                // expect(answer.user.email).to.equal(Cypress.env('email'));
                // expect(answer.user.name).to.equal(Cypress.env('name'));
                // expect(answer.user.username).to.equal(Cypress.env('username'));
                // expect(answer.user.emailVerified).to.be.false;
                // expect(answer.user.bio).to.equal( bioUpdated );
            });

        cy.reload();

        cy.contains("Your Bio").find('textarea').invoke('val')
            .then(text => {
                expect(text).to.equal(bioUpdated);
            });

    });

    it("OPTIONAL properties with ? : Send Request defining Optional & Mandatory properties for request type object", () => {

        /**
         * Request type should include BOTH Optonal and Mandatory properties of UserUpdateProfile type, which is configured in Commands declaration using ?
         * ====> This means that : Here we can use the profilePicture or not, since it is OPTIONAL
        */

        const bioUpdated: string = "ela re";

        cy.visit(Cypress.env('baseUrl') + "/feed");

        cy.loginViaUi(Cypress.env('email'), Cypress.env('password'));

        // cy.get('.button.Nav_trigger__1D3cn').get('Settngs').click();
        // cy.get("//*[text()='About You']").should("be.visible");

        cy.visit(Cypress.env('baseUrl') + "/settings");

        // PRECONDITION: set the profile to the initial state
        cy.editProfileUsingOptionalType({
            username: Cypress.env('username'),
            name: Cypress.env('name'),
            bio: Cypress.env('bio'),
            /** Here we can use the profilePicture or not, since it is OPTIONAL */
            profilePicture: Cypress.env('profilePicture')
        })

        // ACTION: 
        // 200 OK response : send the request to update profile with new bio
        cy.editProfileUsingOptionalType({
            username: Cypress.env('username'),
            name: Cypress.env('name'),
            bio: bioUpdated,
            /** Here we can use the profilePicture or not, since it is OPTIONAL */
            profilePicture: Cypress.env('profilePicture')
        })
            .then((answer) => {
                // console.log('RESPONSE : ' + answer)
                // expect(answer.user.email).to.equal(Cypress.env('_id'));
                // expect(answer.user.email).to.equal(Cypress.env('email'));
                // expect(answer.user.name).to.equal(Cypress.env('name'));
                // expect(answer.user.username).to.equal(Cypress.env('username'));
                // expect(answer.user.emailVerified).to.be.false;
                // expect(answer.user.bio).to.equal( bioUpdated );
            });

        cy.reload();

        cy.contains("Your Bio").find('textarea').invoke('val')
            .then(text => {
                expect(text).to.equal(bioUpdated);
            });

    });

    
    it("Partial<> & Required<> : Send Request defining Optional & Mandatory properties for request type object", () => {

        /**
         * Request type should include BOTH Optonal and Mandatory properties of UserUpdateProfile type, which is configured in Commands declaration using Partial<> and Required<>
         * ====> This means that : Here we can use the profilePicture or not, since it is OPTIONAL
        */

        const bioUpdated: string = "ela re";

        cy.visit(Cypress.env('baseUrl') + "/feed");

        cy.loginViaUi(Cypress.env('email'), Cypress.env('password'));

        // cy.get('.button.Nav_trigger__1D3cn').get('Settngs').click();
        // cy.get("//*[text()='About You']").should("be.visible");

        cy.visit(Cypress.env('baseUrl') + "/settings");

        // PRECONDITION: set the profile to the initial state
        cy.editProfileUsingPartialAndRequiredType({
            username: Cypress.env('username'),
            name: Cypress.env('name'),
            bio: Cypress.env('bio'),
            /** Here we can use the profilePicture or not, since it is OPTIONAL */
            profilePicture: Cypress.env('profilePicture')
        })

        // ACTION: 
        // 200 OK response : send the request to update profile with new bio
        cy.editProfileUsingPartialAndRequiredType({
            username: Cypress.env('username'),
            name: Cypress.env('name'),
            bio: bioUpdated,
            /** Here we can use the profilePicture or not, since it is OPTIONAL */
            profilePicture: Cypress.env('profilePicture')
        })
            .then((answer) => {
                // console.log('RESPONSE : ' + answer)
                // expect(answer.user.email).to.equal(Cypress.env('_id'));
                // expect(answer.user.email).to.equal(Cypress.env('email'));
                // expect(answer.user.name).to.equal(Cypress.env('name'));
                // expect(answer.user.username).to.equal(Cypress.env('username'));
                // expect(answer.user.emailVerified).to.be.false;
                // expect(answer.user.bio).to.equal( bioUpdated );
            });

        cy.reload();

        cy.contains("Your Bio").find('textarea').invoke('val')
            .then(text => {
                expect(text).to.equal(bioUpdated);
            });

    });

    it("BEST Practice : Use type definition only once in the Cypress comand as function", () => {

        /**
         * Request type should include BOTH Optonal and Mandatory properties of UserUpdateProfile type, which is configured in Commands declaration using Partial<> and Required<>
         * ====> This means that : Here we can use the profilePicture or not, since it is OPTIONAL
        */

        const bioUpdated: string = "ela re";

        cy.visit(Cypress.env('baseUrl') + "/feed");

        cy.loginViaUi(Cypress.env('email'), Cypress.env('password'));

        // cy.get('.button.Nav_trigger__1D3cn').get('Settngs').click();
        // cy.get("//*[text()='About You']").should("be.visible");

        cy.visit(Cypress.env('baseUrl') + "/settings");

        // PRECONDITION: set the profile to the initial state
        cy.editProfileDefineTypeOnlyOnce({
            username: Cypress.env('username'),
            name: Cypress.env('name'),
            bio: Cypress.env('bio'),
            /** Here we can use the profilePicture or not, since it is OPTIONAL */
            profilePicture: Cypress.env('profilePicture')
        })

        // ACTION: 
        // 200 OK response : send the request to update profile with new bio
        cy.editProfileDefineTypeOnlyOnce({
            username: Cypress.env('username'),
            name: Cypress.env('name'),
            bio: bioUpdated,
            /** Here we can use the profilePicture or not, since it is OPTIONAL */
            // profilePicture: Cypress.env('profilePicture')
        })
            // .then((answer) => {
            //     // console.log('RESPONSE : ' + answer)
            //     // expect(answer.user.email).to.equal(Cypress.env('_id'));
            //     // expect(answer.user.email).to.equal(Cypress.env('email'));
            //     // expect(answer.user.name).to.equal(Cypress.env('name'));
            //     // expect(answer.user.username).to.equal(Cypress.env('username'));
            //     // expect(answer.user.emailVerified).to.be.false;
            //     // expect(answer.user.bio).to.equal( bioUpdated );
            // });

        cy.reload();

        cy.contains("Your Bio").find('textarea').invoke('val')
            .then(text => {
                expect(text).to.equal(bioUpdated);
            });

    });


});

