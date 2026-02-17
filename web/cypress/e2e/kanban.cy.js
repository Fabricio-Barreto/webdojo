describe("Kanban Board", () => {
  beforeEach(() => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");
    cy.goTo("Kanban", "Kanban Board");
  });

  it("Deve mover uma tarefa de Todo para Done e atualizar o board", () => {
    const dataTransfer = new DataTransfer();

    cy.contains("div[draggable=true]", "Documentar API").trigger("dragstart", {
      dataTransfer,
    });

    cy.get(".column-done")
      .trigger("drop", { dataTransfer })
      .find("h3")
      .should("have.text", "Done (4)");

    cy.get(".column-done").should("include.text", "Documentar API");
  });
});
