describe("Login", () => {
  it("Deve logar com sucesso", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.get('[data-cy="user-name"]')
      .should("be.visible")
      .and("have.text", "Fernando Papito");

    cy.get('[data-cy="welcome-message"]')
      .should("be.visible")
      .and(
        "have.text",
        "Olá QA, esse é o seu Dojo para aprender Automação de Testes.",
      );
  });

  it("Não deve logar com senha inválida", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana132");

    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });

  it("Não deve logar com e-mail não cadastrado", () => {
    cy.start();
    cy.submitLoginForm("papito32@webdojo.com", "katana123");

    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });

  it("Não deve logar com senha não informada", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com");

    cy.contains("Você precisa de uma senha para entrar! 🔒").should(
      "be.visible",
    );
  });

  it("Não deve logar com email não informado", () => {
    cy.start();
    cy.submitLoginForm(undefined, "katana132");

    cy.contains("Ei, não esqueça de digitar seu email!").should("be.visible");
  });

  it("Não deve logar com senha e email não informado", () => {
    cy.start();
    cy.submitLoginForm();

    cy.contains("Ei, não esqueça de digitar seu email!")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("Você precisa de uma senha para entrar! 🔒")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");
  });
});
