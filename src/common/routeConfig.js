import { App } from '../features/home';
import { PageNotFound } from '../features/common';
import commonRoute from '../features/common/route';
import examplesRoute from '../features/examples/route';
import _ from 'lodash';
import usersRoute from '../features/users/route';
import clientesRoute from '../features/clientes/route';
import productosRoute from '../features/productos/route';
import accountsRoute from '../features/accounts/route';

import { DefaultPage, Layout } from '../features/home';

// retocado para pode poner el layout en primer plano de la APP

// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes config for new features, and remove config when remove features, etc.
const childRoutes = [
  // homeRoute,
  commonRoute,
  examplesRoute,
  usersRoute,
  clientesRoute,
  productosRoute,
  accountsRoute,
];

const routes = [
  {
    path: '/',
    component: App,
    childRoutes: [
      {
        path: 'default-page',
        name: 'Login Page',
        component: DefaultPage,
        isIndex: true,
      },
      {
        path: 'main',
        name: 'Main Layout',
        component: Layout,
        childRoutes: [
          ...childRoutes,
          { path: '*', name: 'Page not found', component: PageNotFound },
        ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
      },
      { path: '*', name: 'Page not found', component: PageNotFound },
    ],
  },
];

// Handle isIndex property of route config:
//  Dupicate it and put it as the first route rule.
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return;
  }

  const indexRoute = _.find(route.childRoutes, child => child.isIndex);
  if (indexRoute) {
    const first = { ...indexRoute };
    first.path = '';
    first.exact = true;
    first.autoIndexRoute = true; // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first);
  }
  route.childRoutes.forEach(handleIndexRoute);
}
console.log('routes :', routes);
routes.forEach(handleIndexRoute);
export default routes;
