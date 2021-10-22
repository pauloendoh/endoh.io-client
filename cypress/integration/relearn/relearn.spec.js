/// <reference types="cypress" />

import {
  clickAddResourceButton,
  createDeleteAllTags,
  createResource,
  login,
} from "../../_utils/utils.spec";

context("Relearn", () => {
  beforeEach(() => {
    login();
  });

  it("should create and delete all tags", () => {
    createDeleteAllTags();
  });

  it("create and delete resource", () => {
    const resourceName = new Date().toISOString();

    createResource(resourceName);

    const resource = cy.get(".resource-item").last();
    resource.contains(resourceName);
    resource.trigger("mouseover");
    cy.get("#resource-more-icon").click();
    cy.get("#delete-resource-button").click({ force: true });
    cy.contains("Resource deleted!");
  });

  it("rate and remove a resource's rating", () => {
    const resourceName = new Date().toISOString();
    createResource(resourceName);

    const resource = cy.get(".resource-item").last();
    resource.contains(resourceName);
    resource.get(".rate-button").last().click();

    cy.get("#rating-input-5").click({ force: true });

    cy.wait(1000);
    cy.get("#completed-resources-tab-button").click();

    // TODO: appear at the end of the list

    const completedResource = cy.get(".resource-item").first();
    completedResource.contains(resourceName);
    completedResource.get(".rate-button").first().click();
    cy.get("#rating-input-5").click({ force: true });

    cy.contains("Rating removed!", { matchCase: false, timeout: 10000 });
  });

  it("reposition resources via drag and drop", () => {
    // create two resources
    createResource("resource X");
    createResource("resource Y");

    const resourceItems = cy.get(".resource-item");
    const resourceX = resourceItems.eq(Cypress.$(resourceItems).length - 2);
    const resourceY = resourceItems.eq(Cypress.$(resourceItems).length - 1);

    resourceY
      .trigger("mouseDown", { which: 1, pageX: 600, pageY: 100 })
      .trigger("mousemove", { which: 1, pageX: 600, pageY: 600 })
      .trigger("mouseup");
  });

  it("Should autocomplete 'Duration' if the resource is a Youtube video", () => {
    clickAddResourceButton();
    cy.get('[name="url"]').type(`https://www.youtube.com/watch?v=mW61VTLhNjQ`);

    cy.wait(2500);
    cy.get("#estimatedTime").should("have.value", "00:04h");
  });
});
