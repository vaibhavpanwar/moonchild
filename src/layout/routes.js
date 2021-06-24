import React from 'react';
import DashboardPage from '../views/pages/dashboard';
import {ReactComponent as StatisticIcon} from '../assets/images/statistic.svg';
let routes = [
  {
    path: '/dashboard',
    name: 'statistics',
    icon: <StatisticIcon />,
    component: DashboardPage,
    svg: true,
    layout: '/admin',
  },
];

export default routes;
