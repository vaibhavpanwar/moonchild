import Notifications from '../../views/pages/notifications/index';
import NotificationsAdd from '../../views/pages/notifications/addNotifications';
import i18 from '../../i18n/i18n';

let routes = [
  {
    path: '/admin/notifications',
    name: i18.t('notifications'),
    icon: 'notification-icon',
    component: Notifications,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },

  {
    path: '/admin/notifications/add',
    name: i18.t('notifications'),
    icon: 'notification-icon',
    component: NotificationsAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },

  {
    path: '/admin/notifications/add/:id',
    name: i18.t('notifications'),
    icon: 'notification-icon',
    component: NotificationsAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
];

export default routes;
