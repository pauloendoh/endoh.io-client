/// <reference types="cypress" />

import { createTag, login } from '../utils/utils.spec'




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

  it("Should open correct tag if used 'q' hotkey", () => {
    cy.get('#resources-tab').click()

    const tagName = "Test tag " + new Date().toISOString()
    createTag(tagName)

    cy.wait(1000)

    cy.get('#skill-tab').click()

    cy.get('#tag-selector').click()
    cy.contains(tagName).click()
    cy.get('#add-skill-btn').type('q')

    cy.get('[value="' + tagName + '"]').should('have.value', tagName)
    cy.contains("cancel", { matchCase: false }).click()


  })
})


const addSkill = (name) => {
  cy.get('#add-skill-btn').click()
  cy.wait(500)
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