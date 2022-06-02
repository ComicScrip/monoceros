const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    PASSWORD: process.env.PASSWORD,
    EMAIL: process.env.EMAIL,
  },
});
