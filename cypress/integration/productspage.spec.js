Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("products page", () => {
  beforeEach(() => {
    cy.viewport("samsung-s10");
  });

  describe("products list", () => {
    it("should display the products list from the API", () => {
      cy.intercept("/products", { fixture: "products.json" });
      cy.visit("/");
      cy.login({ email: "test@gmail.com" });
      cy.visit("/deliveries");
      cy.request("/products");
      // cy.get("[data-cy=hamburger]").click();
      // cy.get("[data-cy=expand-products]").click();
    });
  });
});
