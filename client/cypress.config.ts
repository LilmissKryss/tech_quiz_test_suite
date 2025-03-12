import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://127.0.0.1:3005/",
    supportFile: "cypress/support/e2e.ts",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    supportFile: "cypress/support/component.ts",
  },
});
