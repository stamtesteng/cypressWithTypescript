# Scope

This is project created just for learning the basics for `cypress` using `typescript`.

All the implementation details are described below.



## Project Structure

├── cypress <br>
│   ├── downloads <br>
│   ├── e2e <br>
│   │   └── learning <br>
│   │       ├── 01-locator.cy.ts <br>
│   │       ├── 02-interacion.cy.ts <br>
│   │       ├── 03-interceptUsedAsWait.cy.ts <br>
│   │       ├── 04-customCommand.cy.ts <br>
│   │       ├── 05-loginUsingAPI.cy.ts <br>
│   │       ├── 06-mockBE.cy.ts <br>
│   │       ├── 07-delayBEresponseAndControlThrottle.cy.ts <br>
│   │       ├── 08-verifyBEresponseAndUseTypeForJsonResponse.cy.ts <br>
│   │       ├── 09-usingUtilityTypesInCustomCommands.cy.ts <br>
│   │       ├── 10-LintAndUsingTheCLIToCheckTypes.cy.ts <br>
│   │       └── 11-VisualTesting.cy.ts <br>
│   ├── fixtures <br>
│   │   ├── posts1.json &emsp;&emsp; ====> *keeps a real life BE response for a get posts request* <br>
│   │   ├── posts2.json &emsp;&emsp; ====> *keeps a mocked BE response for a get posts request* <br>
│   │   └── user1.json &emsp;&emsp; ====> *keeps a BE response for an auth request* <br>
│   ├── screenshots &emsp;&emsp; ====> *keeps the screenshots from the last test run* <br>
│       ├── ... <br>
│       ├── ... <br>
│       └── ... <br>
│   ├── support <br>
│   │   ├── commands &emsp;&emsp; ====> *keeps all our custom cypress commands* <br>
│   │   │   ├── editProfile.ts <br>
│   │   │   └── loginCommands.ts <br>
│   │   ├── e2e.ts <br>
│   │   ├── index.d.ts <br>
│   │   └── typings &emsp;&emsp; ====> *keeps all our custom types definitions* <br>
│   │       ├── placeholders.d.ts <br>
│   │       ├── user.d.ts <br>
│   │       ├── userProfile.d.ts <br>
│   │       └── userUpdateProfile.d.ts <br>
│   └── videos &emsp;&emsp; ====> *keeps the videos from the last test run* <br>
│       ├── 01-locator.cy.js.mp4 <br>
│       ├── 02-interacion.cy.js.mp4 <br>
│       └── 03-intercept.cy.js.mp4 <br>
├── cypress.config.ts &emsp;&emsp; ====> *keeps general data used by the project* <br>
├── cypress.env.json.template &emsp;&emsp; ====> *provides a template for all needed extra sensitive data that you have to include in your local cypress.env.json* <br>
├── cypress.env.json &emsp;&emsp; ====> *your actual sensitive data that will be used by tests and are found under cypress.env.json.template* <br>
├── applitools.config.ts &emsp;&emsp; ====> *provides all configuration for applitools used for visual testing* <br>
├── tsconfig.json &emsp;&emsp; ====> *keeps all configuration that typescript compiler needs, as well as types* <br>
├── package.json  &emsp;&emsp; ====> *keeps all dependencies configuration* <br>
├── package-lock.json &emsp;&emsp; ====> *will be created from package.json after a npm install command <br>
└── README.md <br>


## Test Cases

Test cases are found under `cypress/e3e` and they include the following:

### `01-locator.cy.ts` : 
Basic test to see the locators at cypress.

### `02-interacion.cy.ts` : 
Basic test to see the interactions at cypress.

### `03-interceptUsedAsWait.cy.ts`: 
Intercept : as wait strategy.

### `04-customCommand.cy.ts`: 
Use custom commands.

### `05-loginUsingAPI.cy.ts`: 
Use mutation for login through API.

### `06-mockBE.cy.ts`: 
Mock BE response.

### `07-delayBEresponseAndControlThrottle.cy.ts`: 
Delay BE response and change Throttle.

### `08-verifyBEresponseAndUseTypeForJsonResponse.cy.ts`: 
Verify BE response and use interface to define the response json contents

### `09-usingUtilityTypesInCustomCommands.cy.ts`: 
Checking typescript utilities through custom commands, using following types for request body:
- no type 
- strict type (specific interface)
- Pick<>
- Ommit<>
- OPTIONAL properties with ?
- Partial<> & Required<> 
- Use type definition only once in the Cypress command as function, for not having type defined twice : once in the type definition and another one in the Command implementation

### `10-LintAndUsingTheCLIToCheckTypes.cy.ts`: 
See how lint for typescript compiler can work without creation of *.js files and also how to ignore a specific compilation error

### `11-VisualTesting.cy.ts`: 
Implementation of a visual test using applitools eyes.

___


# Prerequisites

System requirements can be found under [Cypress Documentation#System-requirements](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements)

## cypress version
At the time this project was created cypress version `12.5.0` was available.

## node.js install
Node should be installed in the local machine.
Node versions that are supported for cypress version `12.5.0` are:
- `14.x`
- `16.x`
- `18.x` and above

Install nodejs - for more details you can check [Node.js Documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  

`npm install -g npm`

Verify your node and npm version through:
<br>`node -v`
<br>`npm -v`

## Add your environmnet variables
In order to make some tests run correctly, you have to add your own data as environment variables. 
```
These are sensitive data like usernames, passwords, etc. that should not be published in any case.
```
All the nessecary variables can be found under `cypress.env.json.template` at the root of the project. There you can see all information needed. 

You can choose one the following alternatives - which are also considered as ***best practises*** for sensitive data - to add specific values to these variables: 

### Alternative-1: cypress.env.json

In the root of the repo in local machine you have to create a file named
`cypress.env.json`
where we should add all these sensitive data.
In our case we just have to add a json containing a real username and password, in order to let successful login cases run correctly.
We also include another email that we are sure that it does not have registration to `https://nextjs-mongodb.vercel.app/feed` - "nonExistingUser".
So you should create this file under the root of the repo and add the following content replacing the values with yours:
```json
{
    "email": "<give an email that is registered to the web app, e.g. something@xxxxx.yyy>",
    "password": "<give your real password>",
    "nonExistingUser": "<give an email that is not registered>",
    "wrongPassword": "<give a wrong password for your registered user>"
}
```
or just copy the file `cypress.env.json.template`, rename the copy to `cypress.env.json` and add the correct(your own) values.

**Note:** *This file will not be commited or pushed anywhere since it is already included in the .gitignore file of the repository*



#### Alternative-2: export CYPRESS_*

Alternativelly, we can add 
- email (that will be used for successful login scenarios)
- password (that will be used for successful login scenarios)
- nonExistingUser (that it is real and we are sure it does not have registration to the web app and will be used for unsuccessful login scenario)

using the following commands (do not forget to replace the values with yours):

`export CYPRESS_email=<yourEmail>`

`export CYPRESS_password=<yourPassword>`

`export CYPRESS_nonExistingUser=<anEmailThatWAreSureHasNoAccount>`


***=>*** *More general information reagrding to env variables available at [Cypress Environment Variables Documentation](https://docs.cypress.io/guides/guides/environment-variables#Setting)*


## Other Environment variables
In the repo root there is also the following file
`cypress.config.js`
This file contains 
- the "baseUrl" in order to not have to write the sketch url in many places in the code and be accessible by all tests

It is a ***best practise*** to put in this file configurations/information that should be easily accessible by any test, but not include sensitive data like passwords, because they will be exposed to others. For sensitive data we have to use one of the alternatives given above (`cypress.env.json` or `export CYPRESS_*`).


___

# Tests

All tests should be placed under path

`cypress/e2e/`


## Running the tests

Before running the tests, the dependencies should be downloaded, so in the project root we should run:
<br> `npm i`

There are 2 ways to run the tests:
- Through Cypress Runner UI
- Through command line


### Run through cypress UI
You can use `npm` or `yarn` to run the cypress tests. 

Open the cypress UI runner with one of the following commands:
<br>`npx cypress open`
<br>`npm run cy:open` (configured in scripts of `package.json` file)

Then the UI runner will be opened and we can run any file in the path

`cypress/e2e/`

by simply clicking on the file we want to run.

### Run through console

We can also run the tests using the command line. In this case we can use the [cypress-run documentation](https://docs.cypress.io/guides/guides/command-line#cypress-run) in order to take advantage of all parameters we could use, like defining browser(--browser) or environment viriables (--env), etc.

- `npx cypress run` : to run all tests available under e2e folder
- `npx cypress run --spec 'cypress/e2e/learning/*'` : to run all tests under directory `cypress/e2e/learning/*`
- `npx cypress run --spec 'cypress/e2e/learning/03-intercept.cy.js'` : to run all tests under the specific spec file 
- `npx cypress run --headed` : run all tests with the browser visible
- headless by `npx cypress run --headless` : run tests in headless mode


CYPRESS_BASEURL=https://staging.app.com npx cypress run --spec 'cypress/e2e/learning/03-intercept.cy.js'

### Test Results

#### Report

Build-in report is placed in the console as well as in the cypress Runner UI. 

#### Screenshots

For each test that fails a screenshot is taken and stored under the corresponding test in path
`cypress/screenshots`

#### Video Records

For each test file (test suite) that runs a video recording is placed under:
`cypress/videos`

___


## Visual Testing

At the e2e test `11-VisualTesting.cy.ts` applitools eyes is used in order to perform Visual Testing.
All configuration is described at 
- https://applitools.com/tutorials/quickstart/web/cypress

In our case you just have to [register to the applitools](https://auth.applitools.com/users/register) and use the free service it is provided (with limited screenshots per month to currently be 100).

Get your applitools API_KEY (found under profile->My API key) and use it while you are trying to run or open cypress runner, e,g, 

- `APPLITOOLS_API_KEY="<your applittols api key>" npx cypress open`

All screenshots, baseline and actual, as well as their differences can be found under your dashboard to applitools.

The test case `11-VisualTesting.cy.ts` create screenshots, compare them with a baseline image and provide the result of the comparison in cypress dashboard. In this test case we also use the ignore element functionality in order to exclude specific element from the image comparison.

___
