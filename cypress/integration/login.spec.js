describe("login", () => {
  beforeEach(() => {
    cy.viewport("samsung-s10");
    cy.visit("/");
  });

  it("should display the login form", () => {
    cy.get("[data-cy=loginForm]").should("be.visible");
    cy.get("[data-cy=password]").should("be.visible");
    cy.get("[data-cy=email]").should("be.visible");
    cy.get("[data-cy=loginBtn]").should("be.visible");
    cy.get("[data-cy=rememberBox]").should("be.visible");
    cy.get("[data-cy=lostPassword]").should("be.visible");
  });

  it("can login with correct credentials", () => {
    cy.get("[data-cy=email]").type();
    cy.get("[data-cy=password]").type();
    cy.get("[data-cy=loginBtn]").click();
    cy.contains("This page is under construction sorry !!");
  });

  it("cannot login with wrong credentials", () => {
    cy.get("[data-cy=email]").type("john.doe@domain.com");
    cy.get("[data-cy=password]").type("mypassword");
    cy.get("[data-cy=loginBtn]").click();
    cy.contains("wrong credential(s)");
  });
});
