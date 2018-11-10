// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { ListPage, DetailPage } from './';

export default {
  path: 'productos',
  name: '',
  childRoutes: [
    // { path: 'default-page', name: 'Default page', component: DefaultPage },
    { path: 'list', name: ' list page', component: ListPage, isIndex: true },
    { path: 'details/:id', name: ' update page', component: DetailPage },
    { path: 'details', name: ' new page', component: DetailPage },
  ],
};
