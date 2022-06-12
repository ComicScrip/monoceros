describe("login", () => {
  beforeEach(() => {
    cy.viewport("samsung-s10");
  });

  describe("when not logged in", () => {
    it("should display the login form", () => {
      cy.visit("/");
      cy.get("[data-cy=loginForm]").should("be.visible");
      cy.get("[data-cy=password]").should("be.visible");
      cy.get("[data-cy=email]").should("be.visible");
      cy.get("[data-cy=loginBtn]").should("be.visible");
      cy.get("[data-cy=rememberBox]").should("be.visible");
      cy.get("[data-cy=lostPassword]").should("be.visible");
    });
  });

  describe("When try to log in with incorrect credentials", () => {
    it("sould dislplay the not authentificated page", () => {
      cy.visit("/");
      cy.get("[data-cy=email]").type("john.doe@exemple.com");
      cy.get("[data-cy=password]").type("superpassword");
      cy.get("[data-cy=loginBtn]").click();
      cy.visit("/deliveries");
      cy.contains("you are not authenticated");
    });
  });

  describe("when logged in", () => {
    it("should display the deliveries page", () => {
      cy.login({ email: "test@gmail.com" });
      cy.visit("/deliveries");
      cy.get("[data-cy=hamburger]").click();
      cy.contains("Deliveries");
    });
  });
});
