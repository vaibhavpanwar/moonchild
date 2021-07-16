import Users from '../../views/pages/users';
import UsersAdd from '../../views/pages/users/addUser';
import UsersEdit from '../../views/pages/users/editUser';
import UsersView from '../../views/pages/users/viewUser';
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
  {
    path: '/admin/users/edit/:id',
    name: i18.t('users'),
    icon: 'user-icon',
    component: UsersEdit,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/users/view/:id',
    name: i18.t('users'),
    icon: 'user-icon',
    component: UsersView,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
];

export default routes;
