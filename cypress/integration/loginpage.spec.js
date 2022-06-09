describe("login", () => {
  beforeEach(() => {
    cy.viewport("samsung-s10");
  });

  describe("when not logged in", () => {
    it("should display the login form when ", () => {
      cy.visit("/");
      cy.get("[data-cy=loginForm]").should("be.visible");
      cy.get("[data-cy=password]").should("be.visible");
      cy.get("[data-cy=email]").should("be.visible");
      cy.get("[data-cy=loginBtn]").should("be.visible");
      cy.get("[data-cy=rememberBox]").should("be.visible");
      cy.get("[data-cy=lostPassword]").should("be.visible");
    });
  });

  describe("when logged in", () => {
    it("should display the current user email and a disconnect button", () => {
      cy.login({ email: "test@gmail.com" });
      cy.visit("/");
      cy.contains("Connecté en tant que test@gmail.com");
      cy.get("[data-cy=disconnectBtn]").should("be.visible");
    });
  });
});
