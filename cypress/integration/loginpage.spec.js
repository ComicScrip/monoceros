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
    it("should display the deliveries overview page", () => {
      cy.login({ email: "test@gmail.com" });
      cy.visit("/");
      cy.contains("Deliveries Overview");
    });
  });

  describe("When try to loggin with incorrect credentials", () => {
    it("should not work", () => {
      cy.visit("/");
      cy.get("[data-cy=email]").type("john.doe@domain.com");
      cy.get("[data-cy=password]").type("mypassword");
      cy.get("[data-cy=loginBtn]").click();
      cy.visit("/deliveries");
      cy.contains("you are not authenticated");
    });
  });
});
