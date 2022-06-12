/*
describe("products page", () => {
  beforeEach(() => {
    cy.viewport("samsung-s10");
  });

  describe("products list", () => {
    it("should display the products list from the API", () => {
      cy.intercept("/products", { fixture: "products.json" });
      cy.login({ email: "test@gmail.com" });
      cy.visit("/deliveries");
      cy.get("[data-cy=hamburger]").click();
      cy.get("[data-cy=expand-products").click();
      cy.get("[data-cy=products-catalogue").click();
    });
  });
});

*/
