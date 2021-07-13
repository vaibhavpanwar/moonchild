import Users from '../../views/pages/users';
import UsersAdd from '../../views/pages/users/addUser';

let routes = [
  {
    path: '/admin/users',
    name: 'Users',
    icon: 'user-icon',
    component: Users,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/users/add',
    name: 'Users',
    icon: 'user-icon',
    component: UsersAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
];

export default routes;
