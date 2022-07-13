describe("deliveries", () => {
  beforeEach(() => {
    cy.login();
    cy.viewport("samsung-s10");
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

  describe("When try to click on a delivery row", () => {
    it("should display the delivery detail", () => {
      cy.intercept("**/api/deliveries/delivery-location", {
        fixture: "location.json",
      });
      cy.intercept("**/api/deliveries/deliveries/190", {
        fixture: "deliveryId.json",
      });
      cy.visit("/deliveries");
      cy.get("[data-cy=deliveryId0]").click();
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
    it("should change page and show packages detail with no sensor data", () => {
      cy.intercept("**/api/deliveries/deliveries/190", {
        fixture: "deliveryId.json",
      });
      cy.intercept(
        "**/api/deliveries/delivery-package/sensors-data/**sensor_type=temperature",
        {
          fixture: "packageNodataTLHS.json",
        }
      );
      cy.intercept(
        "**/api/deliveries/delivery-package/sensors-data/**sensor_type=humidity",
        {
          fixture: "packageNodataTLHS.json",
        }
      );
      cy.intercept(
        "**/api/deliveries/delivery-package/sensors-data/**sensor_type=light",
        {
          fixture: "packageNodataTLHS.json",
        }
      );
      cy.intercept(
        "**/api/deliveries/delivery-package/sensors-data/**sensor_type=shock",
        {
          fixture: "packageNodataTLHS.json",
        }
      );
      cy.intercept("**/api/base/packages/?limit=100", {
        fixture: "packageInfo.json",
      });
      cy.intercept("**/api/base/products/?limit=100", {
        fixture: "productInfo.json",
      });
      cy.visit("/deliveries/190");
      cy.get("[data-cy=packageDetailTitle]").should("be.visible");
      cy.get("[data-cy=packageDetailId0]").should("be.visible");
      cy.get("[data-cy=packageDetailUpdate]").should("be.visible");
      cy.get("[data-cy=packageDetailNoData]").should("be.visible");
    });
  });
});
