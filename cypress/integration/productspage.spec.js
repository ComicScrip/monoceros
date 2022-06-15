Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("products page", () => {
  beforeEach(() => {
    cy.viewport("samsung-s10");
    //cy.login();
  });

  describe("products list", () => {
    it.only("should display the products list from the API", () => {
      cy.intercept("**/api/base/products/**", { fixture: "products.json" });
      cy.login();
      cy.fixture("products").then((data) => {
        console.log(data);
      });
      cy.visit("/products");
    });
    it("should display an error when the api is down", () => {
      cy.intercept("**/api/base/products**", { statusCode: 500 });
      cy.login();
      cy.visit("/products");
    });
  });
});
