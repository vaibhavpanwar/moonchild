import Users from '../../views/pages/users';
import UsersAdd from '../../views/pages/users/addUser';
import i18 from '../../i18n/i18n';
let routes = [
  {
    path: '/admin/users',
    name: i18.t('users'),
    icon: 'user-icon',
    component: Users,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/users/add',
    name: i18.t('users'),
    icon: 'user-icon',
    component: UsersAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
];

export default routes;
