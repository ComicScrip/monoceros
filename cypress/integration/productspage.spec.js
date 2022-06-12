describe("products page", () => {
  beforeEach(() => {
    cy.viewport("samsung-s10");
  });

  describe("should display the products list from the API", () => {
    cy.intercept("**/products", { fixture: "products.json" });
    cy.login({ email: "test@gmail.com" });
    cy.visit("/deliveries");
    cy.get("[data-cy=hamburger]").click();
  });
});
