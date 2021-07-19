import SubCategories from '../../views/pages/sub-categories';
import SubCategoriesAdd from '../../views/pages/sub-categories/addSubCategory';
import SubCategoriesEdit from '../../views/pages/sub-categories/editSubCategory';
import SubCategoriesView from '../../views/pages/sub-categories/viewSubCategory';
import i18 from '../../i18n/i18n';

let routes = [
  {
    path: '/admin/sub-categories',
    name: i18.t('subCategories'),
    icon: 'sub-category-icon',
    component: SubCategories,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/sub-categories/addSubCategory',
    name: i18.t('subCategories'),
    icon: 'sub-category-icon',
    component: SubCategoriesAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/sub-categories/editSubCategory/:id',
    name: i18.t('subCategories'),
    icon: 'sub-category-icon',
    component: SubCategoriesEdit,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/sub-categories/viewSubCategory/:id',
    name: i18.t('subCategories'),
    icon: 'sub-category-icon',
    component: SubCategoriesView,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
];

export default routes;
