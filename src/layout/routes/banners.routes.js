import Banner from '../../views/pages/banners';
import BannerAdd from '../../views/pages/banners/addBanner';
import BannerEdit from '../../views/pages/banners/editBanner';

let routes = [
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
    path: '/admin/banners/add',
    name: 'Banners',
    icon: 'banner-icon',
    component: BannerAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/banners/edit/:id',
    name: 'Banners',
    icon: 'banner-icon',
    component: BannerEdit,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
];

export default routes;
