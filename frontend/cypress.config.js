import { defineConfig } from "cypress";

export default defineConfig({
  video: true,
  pageLoadTimeout: 120000,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.spec.js',
  },
  
});
