import React from 'react';
import DashboardPage from '../views/pages/dashboard';
import Users from '../views/pages/user';
import Categories from '../views/pages/categories';
import SubCategories from '../views/pages/sub-categories';
import Ads from '../views/pages/ads';
import Banner from '../views/pages/banners';
import Payments from '../views/pages/payments';
import Notifications from '../views/pages/notifications';
import ContactUs from '../views/pages/contact-us';
import {ReactComponent as StatisticIcon} from '../assets/images/statistic.svg';
let routes = [
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    icon: 'dashboard-icon',
    component: DashboardPage,
    svg: true,
    layout: '/admin',
  },
  {
    path: '/admin/users',
    name: 'Users',
    icon: 'user-icon',
    component: Users,
    svg: true,
    layout: '/admin',
  },
  {
    path: '/admin/categories',
    name: 'Categories',
    icon: 'category-icon',
    component: Categories,
    svg: true,
    layout: '/admin',
  },
  {
    path: '/admin/sub-categories',
    name: 'Sub-Categories',
    icon: 'sub-category-icon',
    component: SubCategories,
    svg: true,
    layout: '/admin',
  },
  {
    path: '/admin/ads',
    name: 'Ads',
    icon: 'ad-icon',
    component: Ads,
    svg: true,
    layout: '/admin',
  },
  {
    path: '/admin/banners',
    name: 'Banners',
    icon: 'banner-icon',
    component: Banner,
    svg: true,
    layout: '/admin',
  },
  {
    path: '/admin/payments',
    name: 'Payments',
    icon: 'payment-icon',
    component: Payments,
    svg: true,
    layout: '/admin',
  },
  {
    path: '/admin/notifications',
    name: 'Notifications',
    icon: 'notification-icon',
    component: Notifications,
    svg: true,
    layout: '/admin',
  },
  {
    path: '/admin/contact-us',
    name: 'Contact-us',
    icon: 'contact-us-icon',
    component: ContactUs,
    svg: true,
    layout: '/admin',
  },
];

export default routes;
