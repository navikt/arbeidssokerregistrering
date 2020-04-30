import * as skjemaVerdier from '../../../fixtures/registrering-sykefravaer-valg.json';


describe('/skjema-sykefravae/3/1 - Er utdanningen din godkjent i Norge?', () => {
  beforeEach(() => {
    cy.configure('registrering-sykefravaer');
  });
  it('Navigerer til korrekt skjema', () => {
    cy.visit('/');
    cy.get('[data-testid="start-registrering"]')
      .click();
    cy.clickOptionThenNext(2); // Velg "Jeg trenger ny jobb"
    cy.clickOptionThenNext(1); // Velg "Grunnskole"
  });
  it('Tester alle valg', () => {
    cy.stegTest(skjemaVerdier[4]);
  });
  it('Går videre til /skjema-sykefravaer/3/2 ved klikk på NESTE', () => {
    cy.get('[class="alternativ-wrapper"]')
      .eq(0)
      .click();
    cy.get('[data-testid="neste"]')
      .should('have.attr', 'href', '/skjema-sykefravaer/3/2')
      .click();
    cy.get('[class="typo-innholdstittel spm-tittel"]')
      .should('contain', 'Er utdanningen din bestått?');
  });
});