// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add(
  "login",
  ({ email } = { email: "dave.lopper@gmail.com" }) => {
    cy.intercept("**/api/auth/session", {
      statusCode: 200,
      body: { email },
    });
    cy.intercept("**/api/tokens", {
      statusCode: 200,
      body: {
        refresh: "refreshToken",
        access: "accessToken",
      },
    });
    cy.intercept("**/api/users/current-user", {
      statusCode: 200,
      body: { email },
    });
  }
);

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
