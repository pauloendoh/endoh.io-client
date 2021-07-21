/// <reference types="cypress" />

context('Endoh.io - Landing Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
  })

  it.only('should render endoh.io at landing page', () => {
    cy.contains('endoh.io')
    cy.contains(/Google/i)

  })

  it('should login with test credentials', () => {
    cy.get('#email').type('test@test.com')
    cy.get('#password').type('123456')
    cy.get('#auth-submit-button').click()
    cy.contains('endoh.io')
    cy.contains(/resource/i)
    cy.contains(/feed/i)
    cy.contains(/skills/i)
  })
})
