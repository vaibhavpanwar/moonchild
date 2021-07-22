import Notifications from '../../views/pages/notifications/index';
import NotificationsAdd from '../../views/pages/notifications/addNotifications';

let routes = [
  {
    path: '/admin/notifications',
    name: 'notifications',
    icon: 'notification-icon',
    component: Notifications,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },

  {
    path: '/admin/notifications/addNotification',
    name: 'notifications',
    icon: 'notification-icon',
    component: NotificationsAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },

  {
    path: '/admin/notifications/addNotification/:id',
    name: 'notifications',
    icon: 'notification-icon',
    component: NotificationsAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
];

export default routes;
