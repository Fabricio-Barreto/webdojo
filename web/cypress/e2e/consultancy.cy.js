import {personal, company} from '../fixtures/consultancy.json'

describe("Formulário de Consultoria", () => {
  beforeEach(() => {
    cy.login();
    cy.goTo("Formulário", "Consultoria");
  });

  it.only("Deve solicitar consultoria individual para pessoa física", () => {
    cy.get("#name").type(personal.name);
    cy.get("#email").type(personal.email);
    cy.get('input[placeholder="(00) 00000-0000"]').type(personal.phone);
    //.should("have.value", "(11) 99999-1000");

    cy.contains("label", "Tipo de Consultoria")
      .parent()
      .find("select")
      .select(personal.consultoryType);

    if (personal.personType == "CPF") {
      cy.contains("label", "Pessoa Física")
        .find("input")
        .click()
        .should("be.checked");

      cy.contains("label", "Pessoa Jurídica")
        .find("input")
        .should("be.not.checked");
    } else if (personal.personType == "CNPJ") {
      cy.contains("label", "Pessoa Jurídica")
        .find("input")
        .click()
        .should("be.checked");

      cy.contains("label", "Pessoa Física")
        .find("input")
        .should("be.not.checked");
    }

    cy.contains("label", "CPF")
      .parent()
      .find("input")
      .type(personal.document)
      .should("have.value", "656.025.300-70");

    personal.discoveryChannels.forEach((discoveryChannel) => {
      cy.contains("label", discoveryChannel)
        .find("input")
        .check()
        .should("be.checked");
    });

    cy.get('input[type="file"]').selectFile(personal.file, {
      force: true,
    });

    cy.get(
      'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]',
    ).type(personal.description);

    personal.techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type("{enter}");

      cy.contains("label", "Tecnologias")
        .parent()
        .contains("span", tech)
        .should("be.visible");
    });

    if (personal.terms) {
      cy.contains("label", "termos de uso").find("input").check();
    }

    cy.contains("button", "Enviar formulário").click();

    cy.get(".modal", { timeout: 7000 })
      .should("be.visible")
      .find(".modal-content")
      .should("be.visible")
      .and(
        "have.text",
        "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
      );
  });

  it.only("Deve solicitar consultoria de empresa para pessoa jurídica", () => {
    cy.get("#name").type(company.name);
    cy.get("#email").type(company.email);
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type(company.phone)
      //.should("have.value", "(11) 99999-1000");

    cy.contains("label", "Tipo de Consultoria")
      .parent()
      .find("select")
      .select(company.consultoryType);

    if (company.personType == "CPF") {
      cy.contains("label", "Pessoa Física")
        .find("input")
        .click()
        .should("be.checked");

      cy.contains("label", "Pessoa Jurídica")
        .find("input")
        .should("be.not.checked");
    } else if (company.personType == "CNPJ") {
      cy.contains("label", "Pessoa Jurídica")
        .find("input")
        .click()
        .should("be.checked");

      cy.contains("label", "Pessoa Física")
        .find("input")
        .should("be.not.checked");
    }

    cy.contains("label", "CNPJ")
      .parent()
      .find("input")
      .type(company.document)
      .should("have.value", "42.404.318/0001-88");

    company.discoveryChannels.forEach((discoveryChannel) => {
      cy.contains("label", discoveryChannel)
        .find("input")
        .check()
        .should("be.checked");
    });

    cy.get('input[type="file"]').selectFile(company.file, {
      force: true,
    });

    cy.get(
      'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]',
    ).type(
      company.description
    );

    company.techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type("{enter}");

      cy.contains("label", "Tecnologias")
        .parent()
        .contains("span", tech)
        .should("be.visible");
    });

    if (company.terms) {
      cy.contains("label", "termos de uso").find("input").check();
    }

    cy.contains("button", "Enviar formulário").click();

    cy.get(".modal", { timeout: 7000 })
      .should("be.visible")
      .find(".modal-content")
      .should("be.visible")
      .and(
        "have.text",
        "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
      );
  });

  it("Formulário não deve ser submetido quando nenhum campo obrigatório é preenchido ou marcado", () => {
    cy.contains("button", "Enviar formulário").click();

    cy.contains("label", "Nome Completo *")
      .parent()
      .find("p")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("label", "Email *")
      .parent()
      .find("p")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("label", "termos de uso")
      .parent()
      .find("p")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");
  });

  it("Formulário não deve ser submetido quando o campo nome não é preenchido", () => {
    cy.get("#email").type("papito@teste.com.br");
    cy.contains("label", "termos de uso").find("input").check();

    cy.contains("button", "Enviar formulário").click();

    cy.contains("label", "Nome Completo *")
      .parent()
      .find("p")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");
  });

  it("Formulário não deve ser submetido quando o campo email não é preenchido", () => {
    cy.get("#name").type("Fernando Papito");
    cy.contains("label", "termos de uso").find("input").check();

    cy.contains("button", "Enviar formulário").click();

    cy.contains("label", "Email *")
      .parent()
      .find("p")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");
  });

  it("Formulário não deve ser submetido quando checkbox dos termos de uso não é marcado", () => {
    cy.get("#name").type("Fernando Papito");
    cy.get("#email").type("papito@teste.com.br");

    cy.contains("button", "Enviar formulário").click();

    cy.contains("label", "termos de uso")
      .parent()
      .find("p")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");
  });
});
