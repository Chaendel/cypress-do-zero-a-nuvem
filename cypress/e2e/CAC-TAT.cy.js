describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e enviar o formulário', () => {
    cy.clock()

    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)

    cy.get('#firstName')
      .as('textName')
      .should('be.visible')
      .type('Caio')
    cy.get('@textName')
      .should('have.value', 'Caio')

    cy.get('#lastName')
      .as('textSobreName')
      .should('be.visible')
      .type('Andrade')
    cy.get('@textSobreName')
      .should('have.value', 'Andrade')

    cy.get('#email')
      .as('textEmail')
      .should('be.visible')
      .type('caioandrade@gmail.com')
    cy.get('@textEmail')
      .should('have.value', 'caioandrade@gmail.com')

    cy.get('#open-text-area')
      .as('textFeedBack')
      .should('be.visible')
      .type(longText, { delay: 0 })
    cy.get('@textFeedBack')
      .should('have.value', longText)

    cy.contains('button', 'Enviar')
      .should('be.visible')
      .click()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()

    cy.get('#firstName')
      .as('textName')
      .should('be.visible')
      .type('Caio')
    cy.get('@textName')
      .should('have.value', 'Caio')

    cy.get('#lastName')
      .as('textSobreName')
      .should('be.visible')
      .type('Andrade')
    cy.get('@textSobreName')
      .should('have.value', 'Andrade')

    cy.get('#email')
      .as('textEmail')
      .should('be.visible')
      .type('caioandradegmail.com')
    cy.get('@textEmail')
      .should('have.value', 'caioandradegmail.com')

    cy.get('#open-text-area')
      .as('textFeedBack')
      .should('be.visible')
      .type('Teste Email')
    cy.get('@textFeedBack')
      .should('have.value', 'Teste Email')

    cy.contains('button', 'Enviar')
      .should('be.visible')
      .click()

    cy.get('.error > strong').should('be.visible')

    cy.tick(3000)

    cy.get('.error > strong').should('not.be.visible')
  })

  it('Campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()

    cy.get('#firstName')
      .as('textName')
      .should('be.visible')
      .type('Caio')
    cy.get('@textName')
      .should('have.value', 'Caio')

    cy.get('#lastName')
      .as('textSobreName')
      .should('be.visible')
      .type('Andrade')
    cy.get('@textSobreName')
      .should('have.value', 'Andrade')

    cy.get('#email')
      .as('textEmail')
      .should('be.visible')
      .type('caioandradegmail.com')
    cy.get('@textEmail')
      .should('have.value', 'caioandradegmail.com')

    cy.get('#open-text-area')
      .as('textFeedBack')
      .should('be.visible')
      .type('Teste Email', { delay: 0 })
    cy.get('@textFeedBack')
      .should('have.value', 'Teste Email')

    cy.get('input[type="checkbox"][value=phone]')
      .should('be.visible')
      .check()

    cy.contains('button', 'Enviar')
      .should('be.visible')
      .click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('#firstName')
      .as('textName')
      .should('be.visible')
      .type('Caio')
    cy.get('@textName')
      .should('have.value', 'Caio')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .as('textSobreName')
      .should('be.visible')
      .type('Andrade')
    cy.get('@textSobreName')
      .should('have.value', 'Andrade')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .as('textEmail')
      .should('be.visible')
      .type('caioandrade@gmail.com')
    cy.get('@textEmail')
      .should('have.value', 'caioandrade@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .as('textPhone')
      .should('be.visible')
      .type('85999999999')
    cy.get('@textPhone')
      .should('have.value', '85999999999')
      .clear()
      .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()

    cy.contains('button', 'Enviar')
      .should('be.visible')
      .click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  it('Envia o formuário com sucesso usando um comando customizado', () => {
    /*const data = {
      firstName: 'Caio',
      lastName: 'Andrade',
      email: 'caioandrade@gmail.com',
      text: 'Teste.'
    }*/

    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('Marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value=feedback]')
      .check()
      .should('be.checked')
  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('Marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      //.as(checkboxes)
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')

    /*cy.get('@checkboxes')
      .each(checkbox => {
        expect(checkbox[0].checked).to.equal(true)
      })
      .uncheck()

    cy.get('@checkboxes')
      .last()
      .should('not.be.checked')*/
  })

  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('myFixture')
    cy.get('input[type="file"]')
      .selectFile('@myFixture')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('Preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('[name="open-text-area"]')
      .invoke('val', 'Um texto qualquer')
      .should('have.value', 'Um texto qualquer')
  })

  it('Faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
  })

  it('Encontre o gato escondido', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
    cy.get('#subtitle')
      .invoke('text', 'Eu acho que vi um gatinho!')
  })
})

