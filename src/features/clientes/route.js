// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { ClientesListPage, ClienteDetailsPage } from './';

export default {
  path: 'clientes',
  name: 'Clientes',
  childRoutes: [
    // { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    {
      path: 'list',
      name: 'Clientes list page',
      component: ClientesListPage,
      isIndex: true,
    },
    { path: 'details', name: 'Cliente details page', component: ClienteDetailsPage },
    { path: 'details/:id', name: 'Cliente details page', component: ClienteDetailsPage },
  ],
};
