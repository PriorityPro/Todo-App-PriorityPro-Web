describe('Creating a todo', () => {
  it('clicks the link "type"', () => {
    cy.visit('http://localhost:5173')

    cy.contains('Todo')
    cy.contains('What needs to be done?')

    // Get an input, type into it
    cy.get('input').type('Walking the dog')
    cy.get('svg').click()

    //Creating a new todo and editing a todo
    cy.get('[id^=edit]').click({ multiple: true })
    cy.get('li').click().type('drinking some coffee')
    cy.get('li').click()

    //deleting a todo 
    cy.get('[id^=trash]').click({ multiple: true })

  })
})