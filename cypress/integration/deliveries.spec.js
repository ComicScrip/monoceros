describe("login", () => {
  beforeEach(() => {
    cy.viewport("samsung-s10");
  });

  describe("When visiting the delivery page", () => {
    it.only("should show the delivery list", () => {
      cy.intercept("**/api/deliveries/deliveries", {
        fixture: "deliveries.json",
      });
      cy.visit("/deliveries");
      cy.get("[data-cy=tableHeader]").should("be.visible");
      cy.get("[data-cy=deliveryId]").should("be.visible");
      cy.get("[data-cy=deliveryStatus]").should("be.visible");
      cy.get("[data-cy=deliveryContact]").should("be.visible");
      cy.get("[data-cy=deliveryDestination]").should("be.visible");
      cy.get("[data-cy=deliveryEndDate]").should("be.visible");
    });
  });

  describe("When try to click on a delivery row", () => {
    it("should display the delivery detail", () => {
      cy.visit("/deliveries");
      cy.get("[data-cy=deliveryRow]").click();
      cy.get("[data-cy=deliveryDetailTitle]").should("be.visible");
      cy.get("[data-cy=deliveryDetailBtn]").should("be.visible");
      cy.get("[data-cy=deliveryDetailHumidity]").should("be.visible");
      cy.get("[data-cy=deliveryDetailShock]").should("be.visible");
      cy.get("[data-cy=deliveryDetailLight]").should("be.visible");
      cy.get("[data-cy=deliveryDetailTemperature]").should("be.visible");
      cy.get("[data-cy=deliveryDetailMap]").should("be.visible");
    });
  });

  describe("When try to click on the detail button", () => {
    it("should change page and show packages detail", () => {
      cy.visit("/deliveries/175");
    });
  });
});

// describe("deliveries Overview", () => {
//   beforeEach(() => {
//     cy.viewport("samsung-s10");
//   });

//   describe("When visiting the delivery page", () => {
//     it("should show the delivery list", () => {
//       cy.visit("/deliveries");
//       cy.get("[data-cy=tableHeader]").should("be.visible");
//       cy.get("[data-cy=deliveryId]").should("be.visible");
//       cy.get("[data-cy=deliveryStatus]").should("be.visible");
//       cy.get("[data-cy=deliveryContact]").should("be.visible");
//       cy.get("[data-cy=deliveryDestination]").should("be.visible");
//       cy.get("[data-cy=deliveryEndDate]").should("be.visible");
//     });
//   });

//   describe("When try to click on a delivery row", () => {
//     it("should display the delivery detail", () => {
//       cy.visit("/deliveries");
//       cy.get("[data-cy=deliveryRow]").click();
//       cy.get("[data-cy=deliveryDetailTitle]").should("be.visible");
//       cy.get("[data-cy=deliveryDetailBtn]").should("be.visible");
//       cy.get("[data-cy=deliveryDetailHumidity]").should("be.visible");
//       cy.get("[data-cy=deliveryDetailShock]").should("be.visible");
//       cy.get("[data-cy=deliveryDetailLight]").should("be.visible");
//       cy.get("[data-cy=deliveryDetailTemperature]").should("be.visible");
//       cy.get("[data-cy=deliveryDetailMap]").should("be.visible");
//     });
//   });

//   describe("When try to click on the detail button", () => {
//     it("should change page and show packages detail", () => {
//       cy.visit("/deliveries/175");
//     });
//   });
// });
