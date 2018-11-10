// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { AccountDetails } from './';

export default {
  path: 'accounts',
  name: 'Accounts',
  childRoutes: [
    { path: 'details/:id', name: 'Account details', component: AccountDetails, isIndex: true },
  ],
};
