/// <reference types="cypress" />

context('Relearn', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/monerate')

    // Auth form submit
    cy.get('#email').type('test@test.com')
    cy.get('#password').type('123456')
    cy.get('#auth-submit-button').click()

  })

  it('should render "New Expense" button', () => {
    cy.contains('New Expense')
  })

  it('should create and delete expense', () => {
    cy.get('[data-testid="new-expense-button"]').click()
    cy.get('#name').type('test expense')
    cy.get('#save-expense-button').click()

    // TODO rest 
  })

})
