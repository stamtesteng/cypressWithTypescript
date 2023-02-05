import { defineConfig } from 'cypress'

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      baseUrl: "https://nextjs-mongodb.vercel.app"
    },
    // excludeSpecPattern: "**/2-*/*",
  },
  projectId: "5ok4yp"
});


require('@applitools/eyes-cypress')(module)


// import eyesPlugin from '@applitools/eyes-cypress'
// export default eyesPlugin(defineConfig({
//   // the e2e or component configuration
//   e2e: {
//     setupNodeEvents(on, config) {
//     }
//   }
// }));

