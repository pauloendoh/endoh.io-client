/// <reference types="cypress" />



export const login = () => {
  cy.visit('http://localhost:8000/')

  // Auth form submit
  cy.get('#email').type('test@test.com')
  cy.get('#password').type('123456')
  cy.get('#auth-submit-button').click()

  cy.wait(500)
}

export const createTag = (tagName) => {
  cy.get('#add-public-tag').click()

  cy.get('[data-testid="tag-name-input"]').type(tagName)
  cy.get("#save-tag-button").click()
}


export const createDeleteAllTags = () => {
  createTag('tag test')

  cy.wait(1000)

  deleteAllTags()
}

export const deleteAllTags = () => {
  cy.get('.tag-item').each(($el, index) => {
    cy.wrap($el).trigger('mouseover')
    cy.get('#tag-more').click()
    cy.get('#delete-tag-button').click()
    cy.contains('Tag deleted!')
  })
}

export const clickAddResourceButton = () => {
  cy.get('#add-resource-button').click()
}

export const createResource = (resourceName) => {
  clickAddResourceButton()
  cy.get('[aria-label="resource-title-input"]').type(resourceName)
  cy.get('#save-resource-button').click()
  cy.contains('saved!')

  cy.wait(1000)
  cy.contains(resourceName)
}