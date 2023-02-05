
/* 
 * tsc : compile and create all *.js files
 * tsc --noEmit : compile typescript without creating the corresponding *js files
 * 
 * npm install pre-commit --save-dev
 * 
 * Then in package.json:
 * scripts:  {
 *  "lint" : "tsc --noEmit" => adds the typescript compilation without creating the *.js files
 * }
 * "pre-commit": [ "lint" ] => adds all the scripts you want to run in each local commit
 * 
 * if we want to allow specific typescript compiler errors to not be visible by lint/compiler, we can skip then by adding the line
 * // @ts-ignore
 * before the actual line that we want to skip the compiler to check
 * but this should be used with causion
 * 
 * npm run lint
 * 
*/
import UserUpdateProfile from "cypress/support/typings/userUpdateProfile";

 

describe('Lint: Using the CLI to check types', () => {

    it("ts compiler error overcome", () => {
        const myObject: UserUpdateProfile = 
        {   
            // @ts-ignore
            'name' : true,
            'username' : "some user",
            'bio' : "",
            "profilePicture": null 
        }

        /** 
         * 'name' : true, above should lead to the following compilation error, 
         * since 'name' is defined as string inside UserUpdateProfile type, BUT
         * // @ts-ignore tag will make it pass the compilation stage without an error
         * 
         * tsc --noEmit
         * 
         * {
         *  error TS2322: Type 'boolean' is not assignable to type 'string'.
         *  
         *  29             'name' : true,
         *          ~~~~~~
         *  
         *  cypress/support/typings/userUpdateProfile.d.ts:2:5
         *  2     name: string;
          *           ~~~~
         *  The expected type comes from property 'name' which is declared here on type 'UserUpdateProfile'
         *  
         *  
         *  Found 1 error in cypress/e2e/learning/10-LintAndUsingTheCLIToCheckTypes.cy.ts:29
         *  }
         * 
        */



    });


});

