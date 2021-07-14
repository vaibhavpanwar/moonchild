import DashboardPage from '../../views/pages/dashboard';
import i18 from '../../i18n/i18n';
let routes = [
  {
    path: '/admin/dashboard',
    name: i18.t('dashboard'),
    icon: 'dashboard-icon',
    component: DashboardPage,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
];

export default routes;
