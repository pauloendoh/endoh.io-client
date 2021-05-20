/// <reference types="cypress" />

export const login = () => {
  cy.visit('http://localhost:8000/')

  // Auth form submit
  cy.get('#email').type('test@test.com')
  cy.get('#password').type('123456')
  cy.get('#auth-submit-button').click()
}

const addSkill = (name) => {
  cy.get('#add-skill-btn').click()
  cy.get('#name').type(name)
  cy.wait(1000)
  cy.get('#save-skill-btn').click()
}

const deleteAllSkills = () => {
  addSkill('xd')
  cy.get('[aria-label="select all desserts"]').click()
  cy.get('#delete-skills-icon').click()
  cy.contains('Skills deleted successfully!')
}

context('Skills', () => {
  beforeEach(() => {
    login()
    cy.get('#skill-tab').click()
  })

  after(() => {
    deleteAllSkills()
  })

  it('"Discard changes" from skill dialog should be working', () => {
    const skillName = new Date().toISOString()

    addSkill(skillName)
    cy.wait(1000)
    cy.contains(skillName).click()

    cy.get('#name').type('new name')
    cy.contains('Cancel').click()
    cy.on('window:confirm', () => true);
  })


})
