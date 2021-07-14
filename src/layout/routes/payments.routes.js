import Payments from '../../views/pages/payments';
import i18 from '../../i18n/i18n';
let routes = [
  {
    path: '/admin/payments',
    name: i18.t('payments'),
    icon: 'payment-icon',
    component: Payments,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
];

export default routes;
