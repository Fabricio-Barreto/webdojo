describe("Formulário de Consultoria", () => {
  it("Deve solicitar consultoria individual para pessoa física", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulário", "Consultoria");

    cy.get("#name").type("Fernando Papito");
    cy.get("#email").type("papito@teste.com.br");
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type("11 99999-1000")
      .should("have.value", "(11) 99999-1000");

    cy.contains("label", "Tipo de Consultoria")
      .parent()
      .find("select")
      .select("Individual");

    cy.contains("label", "Pessoa Física")
      .find("input")
      .click()
      .should("be.checked");

    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .should("be.not.checked");

    cy.contains("label", "CPF")
      .parent()
      .find("input")
      .type("65602530070")
      .should("have.value", "656.025.300-70");

    const discoveryChannels = [
      "Instagram",
      "LinkedIn",
      "Udemy",
      "YouTube",
      "Indicação de Amigo",
    ];

    discoveryChannels.forEach((discoveryChannel) => {
      cy.contains("label", discoveryChannel)
        .find("input")
        .check()
        .should("be.checked");
    });

    cy.get('input[type="file"]').selectFile("./cypress/fixtures/document.pdf", {
      force: true,
    });

    cy.get(
      'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]',
    ).type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    );

    const techs = [
      "Cypress",
      "Selenium",
      "WebDriverIO",
      "Playwright",
      "Robot Framework",
    ];

    techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type("{enter}");

      cy.contains("label", "Tecnologias")
        .parent()
        .contains("span", tech)
        .should("be.visible");
    });

    cy.contains("label", "termos de uso").find("input").check();

    cy.contains("button", "Enviar formulário").click();

    cy.contains(
      "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
    ).should("be.visible");
  });

  it("Deve solicitar consultoria de empresa para pessoa jurídica", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulário", "Consultoria");

    cy.get("#name").type("Fernando Papito");
    cy.get("#email").type("papito@teste.com.br");
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type("11 99999-1000")
      .should("have.value", "(11) 99999-1000");

    cy.contains("label", "Tipo de Consultoria")
      .parent()
      .find("select")
      .select("In Company");

    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .click()
      .should("be.checked");

    cy.contains("label", "Pessoa Física")
      .find("input")
      .should("be.not.checked");

    cy.contains("label", "CNPJ")
      .parent()
      .find("input")
      .type("42404318000188")
      .should("have.value", "42.404.318/0001-88");

    const discoveryChannels = [
      "Instagram",
      "LinkedIn",
      "Udemy",
      "YouTube",
      "Indicação de Amigo",
    ];

    discoveryChannels.forEach((discoveryChannel) => {
      cy.contains("label", discoveryChannel)
        .find("input")
        .check()
        .should("be.checked");
    });

    cy.get('input[type="file"]').selectFile("./cypress/fixtures/document.pdf", {
      force: true,
    });

    cy.get(
      'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]',
    ).type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    );

    const techs = [
      "Cypress",
      "Selenium",
      "WebDriverIO",
      "Playwright",
      "Robot Framework",
    ];

    techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type("{enter}");

      cy.contains("label", "Tecnologias")
        .parent()
        .contains("span", tech)
        .should("be.visible");
    });

    cy.contains("label", "termos de uso").find("input").check();

    cy.contains("button", "Enviar formulário").click();

    cy.contains(
      "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
    ).should("be.visible");
  });

  it("Formulário não deve ser submetido quando nenhum campo obrigatório é preenchido ou marcado", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulário", "Consultoria");

    cy.contains("button", "Enviar formulário").click();

    cy.get("#name")
        .parent()
        .contains("p", "Digite nome e sobrenome")
        .should("be.visible")

    cy.get("#email")
        .parent()
        .contains("p", "Informe um email válido")
        .should("be.visible")

    cy.contains("label", "termos de uso")
        .parent()
        .contains("p","Você precisa aceitar os termos de uso")
        .should("be.visible")

  });

  it("Formulário não deve ser submetido quando o campo nome não é preenchido", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulário", "Consultoria");

    cy.get("#email").type("papito@teste.com.br");
    cy.contains("label", "termos de uso").find("input").check();

    cy.contains("button", "Enviar formulário").click();

    cy.get("#name")
        .parent()
        .contains("p", "Digite nome e sobrenome")
        .should("be.visible")
  });

  it("Formulário não deve ser submetido quando o campo email não é preenchido", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulário", "Consultoria");

    cy.get("#name").type("Fernando Papito");
    cy.contains("label", "termos de uso").find("input").check();

    cy.contains("button", "Enviar formulário").click();

    cy.get("#email")
        .parent()
        .contains("p", "Informe um email válido")
        .should("be.visible")
  });

  it("Formulário não deve ser submetido quando checkbox dos termos de uso não é marcado", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulário", "Consultoria");

    cy.get("#name").type("Fernando Papito");
    cy.get("#email").type("papito@teste.com.br");

    cy.contains("button", "Enviar formulário").click();

    cy.contains("label", "termos de uso")
        .parent()
        .contains("p","Você precisa aceitar os termos de uso")
        .should("be.visible")
  });
});
