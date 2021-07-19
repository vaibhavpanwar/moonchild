import Ads from '../../views/pages/ads';
import AdsAdd from '../../views/pages/ads/addAd';
import i18 from '../../i18n/i18n';

let adRoutes = [
  {
    path: '/admin/ads',
    name: i18.t('ads'),
    icon: 'ad-icon',
    component: Ads,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/ads/addAd',
    name: i18.t('ads'),
    icon: 'ad-icon',
    component: AdsAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
];

export default adRoutes;
