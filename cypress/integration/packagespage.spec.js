Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("products page", () => {
  beforeEach(() => {
    cy.viewport("samsung-s10");
    cy.login();
  });

  describe("products list", () => {
    it.only("should display the products list from the API", () => {
      cy.fixture("packages").then((data) => {
        cy.intercept("**/api/base/packages/**", data);
        console.log(data);
      });

      cy.visit("/packages");
      cy.contains("Packages catalogue");
    });

    it("should not display products when API is down", () => {
      cy.intercept("**/api/base/products/**", { statusCode: 500 });
      cy.login();
      cy.visit("/products");
      cy.contains("No products");
    });
  });
});
