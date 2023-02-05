import User from '../typings/user'
import UserProfile from '../typings/userProfile'
import UserUpdateProfile from '../typings/userUpdateProfile'

declare global {
    namespace Cypress {
        interface Chainable {
            
            /**
             * Changes profile settings via API - use no specific TYPE for request body 
             * @param body changes you want to make to the profile
             * @example
             * cy.editProfileNoSpecificType(1)
             */
            editProfileNoSpecificType(body): Chainable<any>,
            
            /**
             * Changes profile settings via API - use strict UserUpdateProfile TYPE for request body 
             * @param body  changes you want to make to the profile
             */
            editProfileStrictType(body: UserUpdateProfile): Chainable<User>,
            
            /**
             * Changes profile settings via API - use Pick<> for having only those properties of UserUpdateProfile TYPE for request body (but all these would be mandatory)
             * @param reqBody  changes you want to make to the profile
             */
            editProfileUsingPickType(reqBody: Pick<UserUpdateProfile, 'name' | 'username' | 'bio'>): Chainable<User>,

            /**
             * Changes profile settings via API - use Omit<> for excluding those properties of UserUpdateProfile TYPE for request body (but all other properties in UserUpdateProfile would be mandatory)
             * @param reqBody  changes you want to make to the profile
             */
            editProfileUsingOmmitType(reqBody: Omit<UserUpdateProfile, 'profilePicture'>): Chainable<User>,

            /* ? in the property profilePicture will make it optional, so we can send a request with or without it
                but all other properties will be considered as mandatory */
                /**
                 * Changes profile settings via API - use ? in the properties of type to make these properties OPTIONAL for the request body
                 * @param reqBody  changes you want to make to the profile
                 */
            editProfileUsingOptionalType(reqBody: {
                name: UserUpdateProfile['name'],
                username: UserUpdateProfile['username'],
                bio: UserUpdateProfile['bio'],
                profilePicture?: UserUpdateProfile['profilePicture']
            }): Chainable<User>,

            /**
             * Changes profile settings via API - use Partial<> and Required< > (and Pick<>) in the properties of type to define Mandatory/Optional properties for the request body
             * @param reqBody  changes you want to make to the profile
             */
            editProfileUsingPartialAndRequiredType(reqBody: Partial<UserUpdateProfile> & Required< Pick<UserUpdateProfile, 'name' | 'username' | 'bio' > >): Chainable<User>,

            /**
             * Changes profile settings via API 
             * BEST PRACTICE for not having type defined twice:
             * once in the type definition and another one in the Command implementation
             * ==> HERE we use type definition only once in the Cypress command as function
             */
            editProfileDefineTypeOnlyOnce : typeof editProfileFunction
            
        }
    }
}


Cypress.Commands.add('editProfileNoSpecificType', (reqBody) => {

    Cypress.log({
        displayName: 'editProfileNoSpecificType',
        message: reqBody.email,
        consoleProps() {
            return {
                email: reqBody.email
            }
        },
    });

    return cy.request({
        url: "/api/user",
        method: 'PATCH',
        body: {
            reqBody
        },
        // qs: reqBody,
        failOnStatusCode: false,
        form: true
    }).its('status');

});



Cypress.Commands.add('editProfileStrictType', (reqBody: UserUpdateProfile) => {

    Cypress.log({
        displayName: 'editProfileStrictType',
        message: reqBody.username,
        consoleProps() {
            return {
                email: reqBody.username
            }
        },
    });

    const formData = new FormData();
    formData.append('name', reqBody.name);
    formData.append('username', reqBody.username);
    formData.append('bio', reqBody.bio);
    formData.append('profilePicture', reqBody.profilePicture);

    cy.request({
        url: "/api/user",
        method: 'PATCH',
        headers: {
            'content-type': 'multipart/form-data'
        },
        body: formData,
        // form: true,
        // qs: formData
    })
        // .its('body');
        // .then((response) => {
        //     return response.body;
        // });
        // .then(function(response){
        //     return response.body;
        // });
        .then(console.log)
        .then((resp) => {
            // expect(resp.status).to.equal(200);
            // // expect(resp.body).to.have.property('email');
            // expect(resp.body.user.email).to.equal(Cypress.env('email'));
            // expect(resp.body.user.name).to.equal(reqBody.name);
            // expect(resp.body.user.username).to.equal(reqBody.username);
            // expect(resp.body.user.bio).to.equal(reqBody.bio);
            // expect(resp.body.user.profilePicture).to.equal(reqBody.profilePicture);
            return resp.body;
        });

});


Cypress.Commands.add('editProfileUsingPickType', (reqBody: Pick<UserUpdateProfile, 'name' | 'username' | 'bio'>) => {

    /** Here we can not use the profilePicture, since it is not defined */

    Cypress.log({
        displayName: 'editProfileUsingPickType',
        message: reqBody.username,
        consoleProps() {
            return {
                email: reqBody.username
            }
        },
    });

    const formData = new FormData();
    formData.append('name', reqBody.name);
    formData.append('username', reqBody.username);
    formData.append('bio', reqBody.bio);
    // formData.append('profilePicture', reqBody.profilePicture);

    cy.request({
        url: "/api/user",
        method: 'PATCH',
        headers: {
            'content-type': 'multipart/form-data'
        },
        body: formData,
        // form: true,
        // qs: formData
    })
        .then(console.log)
        .then((resp) => {
            // expect(resp.status).to.equal(200);
            // // expect(resp.body).to.have.property('email');
            // expect(resp.body.user.email).to.equal(Cypress.env('email'));
            // expect(resp.body.user.name).to.equal(reqBody.name);
            // expect(resp.body.user.username).to.equal(reqBody.username);
            // expect(resp.body.user.bio).to.equal(reqBody.bio);
            // expect(resp.body.user.profilePicture).to.equal(reqBody.profilePicture);
            return resp.body;
        });

});

Cypress.Commands.add('editProfileUsingOmmitType', (reqBody: Omit<UserUpdateProfile, 'profilePicture'>) => {

    /** Here we can not use the profilePicture, since it is not defined */

    Cypress.log({
        displayName: 'editProfileUsingOmmitType',
        message: reqBody.username,
        consoleProps() {
            return {
                email: reqBody.username
            }
        },
    });

    const formData = new FormData();
    formData.append('name', reqBody.name);
    formData.append('username', reqBody.username);
    formData.append('bio', reqBody.bio);
    // formData.append('profilePicture', reqBody.profilePicture);

    cy.request({
        url: "/api/user",
        method: 'PATCH',
        headers: {
            'content-type': 'multipart/form-data'
        },
        body: formData,
        // form: true,
        // qs: formData
    })
        .then(console.log)
        .then((resp) => {
            // expect(resp.status).to.equal(200);
            // // expect(resp.body).to.have.property('email');
            // expect(resp.body.user.email).to.equal(Cypress.env('email'));
            // expect(resp.body.user.name).to.equal(reqBody.name);
            // expect(resp.body.user.username).to.equal(reqBody.username);
            // expect(resp.body.user.bio).to.equal(reqBody.bio);
            // expect(resp.body.user.profilePicture).to.equal(reqBody.profilePicture);
            return resp.body;
        });


});


Cypress.Commands.add('editProfileUsingOptionalType', (reqBody: {
    name: UserUpdateProfile['name'],
    username: UserUpdateProfile['username'],
    bio: UserUpdateProfile['bio'],
    profilePicture?: UserUpdateProfile['profilePicture']}) => {

    /** Here we can use the profilePicture or not, since it is OPTIONAL */

    Cypress.log({
        displayName: 'editProfileUsingOmmitType',
        message: reqBody.username,
        consoleProps() {
            return {
                email: reqBody.username
            }
        },
    });

    const formData = new FormData();
    formData.append('name', reqBody.name);
    formData.append('username', reqBody.username);
    formData.append('bio', reqBody.bio);
    formData.append('profilePicture', reqBody.profilePicture);

    cy.request({
        url: "/api/user",
        method: 'PATCH',
        headers: {
            'content-type': 'multipart/form-data'
        },
        body: formData,
        // form: true,
        // qs: formData
    })
        .then(console.log)
        .then((resp) => {
            // expect(resp.status).to.equal(200);
            // // expect(resp.body).to.have.property('email');
            // expect(resp.body.user.email).to.equal(Cypress.env('email'));
            // expect(resp.body.user.name).to.equal(reqBody.name);
            // expect(resp.body.user.username).to.equal(reqBody.username);
            // expect(resp.body.user.bio).to.equal(reqBody.bio);
            // expect(resp.body.user.profilePicture).to.equal(reqBody.profilePicture);
            return resp.body;
        });


});



Cypress.Commands.add('editProfileUsingPartialAndRequiredType', (reqBody) => {

    /** Here we can use the profilePicture or not, since it is OPTIONAL 
      * Changes profile settings via API - use Partial<> and Required< > (and Pick<>) in the properties of type to define Mandatory/Optional properties for the request body
    */
    Cypress.log({
        displayName: 'editProfileUsingPartialAndRequiredType',
        message: reqBody.username,
        consoleProps() {
            return {
                email: reqBody.username
            }
        },
    });

    const formData = new FormData();
    formData.append('name', reqBody.name);
    formData.append('username', reqBody.username);
    formData.append('bio', reqBody.bio);
    formData.append('profilePicture', reqBody.profilePicture);

    cy.request({
        url: "/api/user",
        method: 'PATCH',
        headers: {
            'content-type': 'multipart/form-data'
        },
        body: formData,
        // form: true,
        // qs: formData
    })
        .then(console.log)
        .then((resp) => {
            // expect(resp.status).to.equal(200);
            // // expect(resp.body).to.have.property('email');
            // expect(resp.body.user.email).to.equal(Cypress.env('email'));
            // expect(resp.body.user.name).to.equal(reqBody.name);
            // expect(resp.body.user.username).to.equal(reqBody.username);
            // expect(resp.body.user.bio).to.equal(reqBody.bio);
            // expect(resp.body.user.profilePicture).to.equal(reqBody.profilePicture);
            return resp.body;
        });


});




const editProfileFunction = (reqBody: Partial<UserUpdateProfile> & Required< Pick< UserUpdateProfile, 'name' | 'username' | 'bio' > > ) => {

    /**
     * Use type definition only once in the Cypress comand as function 
     * Here we can use the profilePicture or not, since it is OPTIONAL 
     * */

    Cypress.log({
        displayName: 'editProfileFunction',
        message: reqBody.username,
        consoleProps() {
            return {
                email: reqBody.username
            }
        },
    });

    const formData = new FormData();
    formData.append('name', reqBody.name);
    formData.append('username', reqBody.username);
    formData.append('bio', reqBody.bio);
    formData.append('profilePicture', reqBody.profilePicture);

    cy.request({
        url: "/api/user",
        method: 'PATCH',
        headers: {
            'content-type': 'multipart/form-data'
        },
        body: formData,
        // form: true,
        // qs: formData
    })
        .then(console.log)
        .then((resp) => {
            // expect(resp.status).to.equal(200);
            // // expect(resp.body).to.have.property('email');
            // expect(resp.body.user.email).to.equal(Cypress.env('email'));
            // expect(resp.body.user.name).to.equal(reqBody.name);
            // expect(resp.body.user.username).to.equal(reqBody.username);
            // expect(resp.body.user.bio).to.equal(reqBody.bio);
            // expect(resp.body.user.profilePicture).to.equal(reqBody.profilePicture);
            return resp.body;
        });

};


/** Use type definition only once in the Cypress command as function **/
Cypress.Commands.add('editProfileDefineTypeOnlyOnce', editProfileFunction);
