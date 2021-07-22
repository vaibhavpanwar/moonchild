import Ads from '../../views/pages/ads';
import AdsAdd from '../../views/pages/ads/addAd';

import AdsView from '../../views/pages/ads/viewAd';

let adRoutes = [
  {
    path: '/admin/ads',
    name: 'ads',
    icon: 'ad-icon',
    component: Ads,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/ads/addAd',
    name: 'ads',
    icon: 'ad-icon',
    component: AdsAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/ads/viewAd/:id',
    name: 'ads',
    icon: 'ad-icon',
    component: AdsView,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
];

export default adRoutes;
