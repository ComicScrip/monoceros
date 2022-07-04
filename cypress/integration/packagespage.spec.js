Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("package page", () => {
  beforeEach(() => {
    cy.viewport("samsung-s10");
    cy.login();
  });

  describe("package list", () => {
    it("should display the packages list from the API", () => {
      cy.intercept("**/api/base/packages/**", {
        fixture: "packages.json",
      });
      cy.visit("/packages");
      // cy.contains("Packages catalogue");
    });

    it("should not display products when API is down", () => {
      cy.intercept("**/api/base/packages/**", { statusCode: 500 });
      cy.login();
      cy.visit("/packages");
      // cy.contains("No packages");
    });
  });
});
