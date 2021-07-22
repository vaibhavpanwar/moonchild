import Users from '../../views/pages/users';
import UsersAdd from '../../views/pages/users/addUser';
import UsersEdit from '../../views/pages/users/editUser';
import UsersView from '../../views/pages/users/viewUser';

let routes = [
  {
    path: '/admin/users',
    name: 'users',
    icon: 'user-icon',
    component: Users,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/users/addUser',
    name: 'users',
    icon: 'user-icon',
    component: UsersAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/users/editUser/:id',
    name: 'users',
    icon: 'user-icon',
    component: UsersEdit,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/users/viewUser/:id',
    name: 'users',
    icon: 'user-icon',
    component: UsersView,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
];

export default routes;
