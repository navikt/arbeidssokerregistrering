describe('Timeout-modal vises ved utgått sesjon', () => {
  beforeEach(() => {
    cy.configure('sesjon-utgaatt')
  })
  it('Timeout-modal skal vises', () => {
    cy.visit('/')
    cy.wait(2000)
    cy.get('[class="typo-systemtittel timeoutbox-modal__tittel"]').should('contain', 'Sesjonen din har utløpt')
  })
})
