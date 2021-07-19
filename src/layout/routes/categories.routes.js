import Categories from '../../views/pages/categories';
import CategoriesAdd from '../../views/pages/categories/addCategory';
import CategoriesEdit from '../../views/pages/categories/editCategory';
import CategoriesView from '../../views/pages/categories/viewCategory';
import i18 from '../../i18n/i18n';
let routes = [
  {
    path: '/admin/categories',
    name: i18.t('categories'),
    icon: 'category-icon',
    component: Categories,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/categories/addCategory',
    name: i18.t('categories'),
    icon: 'category-icon',
    component: CategoriesAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/categories/editCategory/:id',
    name: i18.t('categories'),
    icon: 'category-icon',
    component: CategoriesEdit,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/categories/viewCategory/:id',
    name: i18.t('categories'),
    icon: 'category-icon',
    component: CategoriesView,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
];

export default routes;
