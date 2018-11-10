// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { UsersListPage, UsersDetailPage } from './';

export default {
  path: 'users',
  name: 'Users',
  childRoutes: [
    // { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'list', name: 'Users list page', component: UsersListPage, isIndex: true },
    { path: 'details/:id', name: 'Users update page', component: UsersDetailPage },
    { path: 'details', name: 'Users new page', component: UsersDetailPage },
  ],
};
