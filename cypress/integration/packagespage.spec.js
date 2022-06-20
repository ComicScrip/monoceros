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
      cy.contains("PACKAGES CATALOGUE");
      //cy.get("[data-cy=products-table]").should("be.visible");
      // cy.contains("epinard");
      // cy.contains("testTrad");
    });

    it("should not display products when API is down", () => {
      cy.intercept("**/api/base/products/**", { statusCode: 500 });
      cy.login();
      cy.visit("/products");
      cy.contains("No products");
    });
  });
});
