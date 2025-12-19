Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    text: 'Test.'
}) => {
    cy.get('#firstName')
        .as('textName')
        .should('be.visible')
        .type(data.firstName)
    cy.get('@textName')
        .should('have.value', data.firstName)

    cy.get('#lastName')
        .as('textSobreName')
        .should('be.visible')
        .type(data.lastName)
    cy.get('@textSobreName')
        .should('have.value', data.lastName)

    cy.get('#email')
        .as('textEmail')
        .should('be.visible')
        .type(data.email)
    cy.get('@textEmail')
        .should('have.value', data.email)

    cy.get('#open-text-area')
        .as('textFeedBack')
        .should('be.visible')
        .type(data.text)
    cy.get('@textFeedBack')
        .should('have.value', data.text)

    cy.contains('button', 'Enviar')
        .should('be.visible')
        .click()
})