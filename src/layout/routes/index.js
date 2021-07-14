import adRoutes from './ads.routes';
import categoriesRoutes from './categories.routes';
import subCategoriesRoutes from './subCategories.routes';
import bannersRoutes from './banners.routes';
import notificationsRoutes from './notifications.routes';
import paymentRoutes from './payments.routes';
import usersRoutes from './users.routes';
import dashboardRoutes from './dashboard.routes';
import contactUsRoutes from './contactUs.routes';

const routes = [
  ...dashboardRoutes,
  ...usersRoutes,
  ...categoriesRoutes,
  ...subCategoriesRoutes,
  ...adRoutes,
  ...bannersRoutes,
  ...paymentRoutes,
  ...notificationsRoutes,
  ...contactUsRoutes,
];

export default routes;
