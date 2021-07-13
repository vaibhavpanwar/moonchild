import Ads from '../../views/pages/ads';
import AdsAdd from '../../views/pages/ads/addAd';

let adRoutes = [
  {
    path: '/admin/ads',
    name: 'Ads',
    icon: 'ad-icon',
    component: Ads,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/ads/add',
    name: 'Ads',
    icon: 'ad-icon',
    component: AdsAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
];

export default adRoutes;
