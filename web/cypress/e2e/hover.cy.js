describe("Simulando Mouseover", () => {
  beforeEach(() => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");
  });

  it("Deve mostra um texto ao passar o mouse o mouse em cima do link do instagram", () => {
    cy.contains("Isso é Mouseover!").should("not.exist");
    cy.get('[data-cy="instagram-link"]').realHover();
    cy.contains("Isso é Mouseover!").should("exist");
  });
});
