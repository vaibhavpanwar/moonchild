import Country from '../../views/pages/countries';
import CountryAdd from '../../views/pages/countries/addCountry';
import CountryEdit from '../../views/pages/countries/editCountry';
import CountryView from '../../views/pages/countries/viewCountry';
import i18 from '../../i18n/i18n';

let routes = [
  {
    path: '/admin/countries',
    name: i18.t('countries'),
    icon: 'banner-icon',
    component: Country,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/countries/add',
    name: i18.t('countries'),
    icon: 'banner-icon',
    component: CountryAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/countries/edit/:id',
    name: i18.t('countries'),
    icon: 'banner-icon',
    component: CountryEdit,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/countries/view/:id',
    name: i18.t('countries'),
    icon: 'banner-icon',
    component: CountryView,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
];

export default routes;
