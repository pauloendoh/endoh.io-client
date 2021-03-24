/// <reference types="cypress" />

context('Relearn', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')

    // Auth form submit
    cy.get('#email').type('test@test.com')
    cy.get('#password').type('123456')
    cy.get('#auth-submit-button').click()
  })

  it('should render "Untagged" at the sidebar', () => {
    cy.contains('Untagged')
  })

  const createDeleteTag = () => {
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
  }
  it('should create and delete tag', () => {
    createDeleteTag()
  })


  function createResource(resourceName) {
    cy.get('#add-resource-button').click()
    cy.get('[aria-label="resource-title-input"]').type(resourceName)
    cy.get('#save-resource-button').click()
    cy.contains('saved!')

    cy.wait(1000)
    cy.contains(resourceName)
  }
  it('create and delete resource', () => {
    const resourceName = new Date().toISOString()

    createResource(resourceName)

    const resource = cy.get('.resource-item').last()
    resource.contains(resourceName)
    resource.trigger('mouseover')
    cy.get('#resource-more-icon').click()
    cy.get('#delete-resource-button').click({ force: true })
    cy.contains('Resource deleted!')

  })

  it("rate and remove a resource's rating", () => {
    const resourceName = new Date().toISOString()
    createResource(resourceName)

    const resource = cy.get('.resource-item').last()
    resource.contains(resourceName)
    resource.get(".rate-button").last().click()

    cy.get('#rating-input-5').click({ force: true })

    cy.wait(1000)
    cy.get('#completed-resources-tab-button').click()


    // TODO: appear at the end of the list

    const completedResource = cy.get('.resource-item').first()
    completedResource.contains(resourceName)
    completedResource.get(".rate-button").first().click()
    cy.get('#rating-input-5').click({ force: true })

    cy.contains('Rating removed!')
  })

  it("reposition resources via drag and drop", () => {
    // create two resources
    createResource("resource X")
    createResource("resource Y")

    const resourceItems = cy.get('.resource-item')
    const resourceX = resourceItems.eq(Cypress.$(resourceItems).length - 2)
    const resourceY = resourceItems.eq(Cypress.$(resourceItems).length - 1)



    resourceY
      .trigger("mouseDown", { which: 1, pageX: 600, pageY: 100 })
      .trigger('mousemove', { which: 1, pageX: 600, pageY: 600 })
      .trigger('mouseup')
  })
})
