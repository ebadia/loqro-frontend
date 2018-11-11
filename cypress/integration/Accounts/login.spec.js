describe('login to app', () => {
  it('displays login form', () => {
    cy.visit('http://localhost:6075');

    cy.get('[data-test="email"] > input').type('john@a.com');
    cy.get('[data-test="password"] > input').type('12345');
    cy.get('[data-test="loginButton"]').click();

    cy.contains('Lista de usuarios');
  });
});
