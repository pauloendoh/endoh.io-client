/// <reference types="cypress" />

context('Relearn', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
    cy.get('#email').type('test@test.com')
    cy.get('#password').type('123456')
    cy.get('#auth-submit-button').click()
    cy.get('[data-testid="application-menu-button"]').click()
    cy.get('#application-menu-option-Relearn').click()
  })

  it('should render "Untagged" at the sidebar', () => {
    cy.contains('Untagged')
  })

  it('should successfully add tag', () => {
    cy.get('#add-tag-button').click()
    
    cy.get('[data-testid="tag-name-input"]').type('tag test')
    cy.get("#save-tag-button").click()
    
    cy.contains('# tag test')
  })

  it('should create two untagged resources, and they should appear at the end of the list', ()=>{
    cy.get('#add-resource-button').click()
    cy.get('[aria-label="resource-title-input"]').type('resource 1')
    cy.get('#save-resource-button').click()
    cy.contains('saved!')

    cy.get('#add-resource-button').click()
    cy.get('[aria-label="resource-title-input"]').type('resource 2')
    cy.get('#save-resource-button').click()
    cy.contains('saved!')

    cy.wait(1000)
    cy.contains('resource 1')
    cy.contains('resource 2')

    // TODO: appear at the end of the list

  })
})
