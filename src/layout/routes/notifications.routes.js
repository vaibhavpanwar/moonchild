import Notifications from '../../views/pages/notifications';
import NotificationsAdd from '../../views/pages/notifications/addNotifications';

let routes = [
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
    sideBar: false,
  },
];

export default routes;
