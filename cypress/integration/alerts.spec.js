describe("alert", () => {
  beforeEach(() => {
    cy.viewport("samsung-s10");
    cy.login();
    cy.intercept("**/api/deliveries/deliveries/**", {
      fixture: "deliveries.json",
    });
  });
  describe("When visiting the delivery page", () => {
    it("should show the delivery list", () => {
      cy.visit("/deliveries");
      cy.get("[data-cy=tableHeader]").should("be.visible");
      cy.get("[data-cy=deliveryId0]").should("be.visible");
      cy.get("[data-cy=deliveryStatus]").should("be.visible");
      cy.get("[data-cy=deliveryContact]").should("be.visible");
      cy.get("[data-cy=deliveryDestination]").should("be.visible");
      cy.get("[data-cy=deliveryEndDate]").should("be.visible");
    });
  });

  describe("Color of the deliveries in the table", () => {
    it("should be red when a delivery have an alert", () => {
      cy.visit("/deliveries");
      cy.get("[data-cy=alert]").should(
        "have.css",
        "background-color",
        "rgb(255, 69, 90)"
      );
      cy.get("[data-cy=alert]").should(
        "have.css",
        "color",
        "rgb(255, 255, 255)"
      );
    });
    it("should be white when a delivery have an alert", () => {
      cy.visit("/deliveries");
      cy.get("[data-cy=noAlert]").should(
        "have.css",
        "background-color",
        "rgb(255, 255, 255)"
      );
      cy.get("[data-cy=noAlert]").should("have.css", "color", "rgb(0, 0, 0)");
    });
  });
});
