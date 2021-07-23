import Payments from '../../views/pages/payments';

let routes = [
  {
    path: '/admin/payments',
    name: 'payments',
    icon: 'payment-icon',
    component: Payments,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
];

export default routes;
