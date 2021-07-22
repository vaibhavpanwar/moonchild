import SubCategories from '../../views/pages/sub-categories';
import SubCategoriesAdd from '../../views/pages/sub-categories/addSubCategory';
import SubCategoriesEdit from '../../views/pages/sub-categories/editSubCategory';
import SubCategoriesView from '../../views/pages/sub-categories/viewSubCategory';

let routes = [
  {
    path: '/admin/sub-categories',
    name: 'subCategories',
    icon: 'sub-category-icon',
    component: SubCategories,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/sub-categories/addSubCategory',
    name: 'subCategories',
    icon: 'sub-category-icon',
    component: SubCategoriesAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/sub-categories/editSubCategory/:id',
    name: 'subCategories',
    icon: 'sub-category-icon',
    component: SubCategoriesEdit,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/sub-categories/viewSubCategory/:id',
    name: 'subCategories',
    icon: 'sub-category-icon',
    component: SubCategoriesView,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
];

export default routes;
