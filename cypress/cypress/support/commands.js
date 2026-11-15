// ***********************************************
// This file is the place for custom commands of this project.
// Cypress loads it through support/e2e.js before every spec.
//
// -- Example of a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
// ***********************************************

// Log in on the QuickPizza admin page with a user name and password.
Cypress.Commands.add('adminLogin', (user, password) => {
  cy.visit('https://quickpizza.grafana.com/admin')
  // the form works only after the script of the page has started
  cy.get('#svelte-announcer').should('exist')
  // the page fills both boxes with admin, so clear them first
  cy.get('#username').clear().type(user)
  cy.get('#password').clear().type(password)
  cy.get('button[type="submit"]').click()
})
