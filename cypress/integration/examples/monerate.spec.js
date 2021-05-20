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

    const testName = createNewExpense()

    const expenseItem = cy.get('.expense-item').eq(0)
    expenseItem.contains(testName)
    expenseItem.click()

    cy.contains('Delete').click()

    // TODO: show success message
  })

  // it("open /settings/monerate/places when clicking 'settings'", () => {
  //   cy.get('#user-menu-btn').click()
  //   cy.get('#settings-user-menu').click()

  //   cy.location().should((loc) => {
  //     expect(loc.pathname).to.eq('/settings/monerate/places')
  //   })
  // })

  it("should show 'Edit expense' instead of 'New expense'", () => {
    const testName = createNewExpense()

    const expenseItem = cy.get('.expense-item').eq(0)
    expenseItem.contains(testName)
    expenseItem.click()

    cy.contains(/edit expense/i)
  })
})

const createNewExpense = () => {
  cy.get('[data-testid="new-expense-button"]').click()

  const testName = 'test ' + new Date().toISOString()
  cy.get('#name').type(testName)
  cy.get('#save-expense-button').click()

  cy.wait(1000)

  return testName
}
