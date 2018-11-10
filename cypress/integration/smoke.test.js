describe('Smoke test', () => {
  it('makes sure the welcome message comes up', () => {
    cy.visit('http://localhost:6075/').contains('Entrar');
  });
});
