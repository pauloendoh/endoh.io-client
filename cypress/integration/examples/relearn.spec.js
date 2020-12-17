/// <reference types="cypress" />

context('Relearn', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')

    // Auth form submit
    cy.get('#email').type('test@test.com')
    cy.get('#password').type('123456')
    cy.get('#auth-submit-button').click()
    cy.get('[data-testid="application-menu-button"]').click()

    cy.get('#application-menu-option-Relearn').click()
  })

  it('should render "Untagged" at the sidebar', () => {
    cy.contains('Untagged')
  })

  it('should create and delete tag', () => {
    cy.get('#add-tag-button').click()

    cy.get('[data-testid="tag-name-input"]').type('tag test')
    cy.get("#save-tag-button").click()

    cy.wait(1000)
    const savedTagItem = cy.get('.tag-item').eq(0)
    savedTagItem.contains('tag test')
    savedTagItem.trigger('mouseover')

    cy.get('#tag-more').click()
    cy.get('#delete-tag-button').click()
    cy.contains('Tag deleted!')
  })


  it('should create and delete resource', () => {
    cy.get('#add-resource-button').click()
    cy.get('[aria-label="resource-title-input"]').type('resource 1')
    cy.get('#save-resource-button').click()
    cy.contains('saved!')

    cy.wait(1000)
    cy.contains('resource 1')


    const resource = cy.get('.resource-item').last()
    resource.contains('resource 1')
    resource.trigger('mouseover')
    cy.get('#resource-more-icon').click()
    cy.get('#delete-resource-button').click({ force: true })
    cy.contains('Resource deleted!')
    // TODO: appear at the end of the list

  })
})
