import Categories from '../../views/pages/categories';
import CategoriesAdd from '../../views/pages/categories/addCategory';
import CategoriesEdit from '../../views/pages/categories/editCategory';
// import CategoriesView from '../../views/pages/categories/viewCategory';

let routes = [
  {
    path: '/admin/categories',
    name: 'categories',
    icon: 'category-icon',
    component: Categories,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/categories/addCategory',
    name: 'categories',
    icon: 'category-icon',
    component: CategoriesAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/categories/editCategory/:id',
    name: 'categories',
    icon: 'category-icon',
    component: CategoriesEdit,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  // {
  //   path: '/admin/categories/viewCategory/:id',
  //   name: 'categories',
  //   icon: 'category-icon',
  //   component: CategoriesView,
  //   svg: true,
  //   layout: '/admin',
  //   sideBar: false,
  // },
];

export default routes;
