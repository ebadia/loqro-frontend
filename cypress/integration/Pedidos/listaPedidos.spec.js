describe('lista los pedidos', () => {
  it('muestra la pantalla de lista de pedidios realizados', () => {
    cy.server();
    cy.fixture('pedidos/pedidos.json').as('pedidosARR');
    cy.route('GET', '/api/pedidos', '@pedidosARR').as('pedidosRoute');
    //
    cy.visit('/main/pedidos/lista').contains('Lista de pedidos');
    //
    cy.get('[data-test="pedidos-table"]');
    cy.get('table');
    cy.get('tbody > tr').should('have.length', 5);
    //
    cy.get('[data-test="add-pedido-button"]');
    cy.get('[data-test="edit-pedido-button"]');
    cy.get('[data-test="delete-pedido-button"]');
    //
  });
});
