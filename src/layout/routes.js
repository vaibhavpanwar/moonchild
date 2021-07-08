import DashboardPage from '../views/pages/dashboard';
import Users from '../views/pages/users';
import UsersAdd from '../views/pages/users/addUser';
import Categories from '../views/pages/categories';
import CategoriesAdd from '../views/pages/categories/addCategory';
import SubCategories from '../views/pages/sub-categories';
import SubCategoriesAdd from '../views/pages/sub-categories/addSubCategory';
import Ads from '../views/pages/ads';
import AdsAdd from '../views/pages/ads/addAd';
import Banner from '../views/pages/banners';
import BannerAdd from '../views/pages/banners/addBanner';
import Payments from '../views/pages/payments';
import Notifications from '../views/pages/notifications';
import NotificationsAdd from '../views/pages/notifications/addNotifications';
import ContactUs from '../views/pages/contact-us';

let routes = [
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    icon: 'dashboard-icon',
    component: DashboardPage,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
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
  {
    path: '/admin/categories',
    name: 'Categories',
    icon: 'category-icon',
    component: Categories,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/categories/add',
    name: 'Categories',
    icon: 'category-icon',
    component: CategoriesAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/sub-categories',
    name: 'Sub-Categories',
    icon: 'sub-category-icon',
    component: SubCategories,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/sub-categories/add',
    name: 'Sub-Categories',
    icon: 'sub-category-icon',
    component: SubCategoriesAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/ads',
    name: 'Ads',
    icon: 'ad-icon',
    component: Ads,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/ads/add',
    name: 'Ads',
    icon: 'ad-icon',
    component: AdsAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/banners',
    name: 'Banners',
    icon: 'banner-icon',
    component: Banner,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/banners',
    name: 'Banners',
    icon: 'banner-icon',
    component: BannerAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/payments',
    name: 'Payments',
    icon: 'payment-icon',
    component: Payments,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/notifications',
    name: 'Notifications',
    icon: 'notification-icon',
    component: Notifications,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/notifications/add',
    name: 'Notifications',
    icon: 'notification-icon',
    component: NotificationsAdd,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/contact-us',
    name: 'Contact-us',
    icon: 'contact-us-icon',
    component: ContactUs,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
];

export default routes;
