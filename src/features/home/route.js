import { DefaultPage, Layout } from './';
import { UsersListPage } from '../users/index';

export default {
  path: '/',
  name: 'Home',
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
      childRoutes: [{ path: 'users', name: 'Users list', component: UsersListPage }],
    },
  ],
};
