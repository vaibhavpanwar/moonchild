import DashboardPage from '../../views/pages/dashboard';

let routes = [
  {
    path: '/admin/dashboard',
    name: 'dashboard',
    icon: 'dashboard-icon',
    component: DashboardPage,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
];

export default routes;
