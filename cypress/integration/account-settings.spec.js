/// <reference types="cypress" />

context("Account stuff", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/");
    cy.get("#temp-user-btn").click();
  });

  it("should change username at config page", () => {
    cy.get("#user-menu-btn").click();
    cy.get("#settings-user-menu").click();

    cy.get("#edit-username-btn").click();

    const newUsername = new Date().getTime();
    cy.get("#newUsername").type(newUsername);

    cy.get("#save-username-button").click();

    cy.get("#success-message");
  });

  it("should check invalid characters at username change", () => {
    cy.get("#user-menu-btn").click();
    cy.get("#settings-user-menu").click();

    cy.get("#edit-username-btn").click();

    const newUsername = new Date().toISOString();
    cy.get("#newUsername").type(newUsername);

    cy.get("#save-username-button").click();

    cy.get("#error-message");
  });

  it("should recommend users for new user", () => {
    cy.get("#feed-tab").click();

    cy.get(".suggested-user-item").should("have.length.at.least", 1);
  });
});
