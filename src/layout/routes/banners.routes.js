import Banner from '../../views/pages/banners';
import BannerAdd from '../../views/pages/banners/addBanner';
import BannerEdit from '../../views/pages/banners/editBanner';
import i18 from '../../i18n/i18n';

let routes = [
  {
    path: '/admin/banners',
    name: i18.t('banners'),
    icon: 'banner-icon',
    component: Banner,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/banners/addBanner',
    name: i18.t('banners'),
    icon: 'banner-icon',
    component: BannerAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/banners/editBanner/:id',
    name: i18.t('banners'),
    icon: 'banner-icon',
    component: BannerEdit,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
];

export default routes;
