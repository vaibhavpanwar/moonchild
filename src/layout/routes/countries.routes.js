import Country from '../../views/pages/countries';
import CountryAdd from '../../views/pages/countries/addCountry';
import CountryEdit from '../../views/pages/countries/editCountry';
// import CountryView from '../../views/pages/countries/viewCountry';

let routes = [
  {
    path: '/admin/countries',
    name: 'countries',
    icon: 'banner-icon',
    component: Country,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/countries/addCountry',
    name: 'countries',
    icon: 'banner-icon',
    component: CountryAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  {
    path: '/admin/countries/editCountry/:id',
    name: 'countries',
    icon: 'banner-icon',
    component: CountryEdit,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  // {
  //   path: '/admin/countries/viewCountry/:id',
  //   name: 'countries',
  //   icon: 'banner-icon',
  //   component: CountryView,
  //   svg: true,
  //   layout: '/admin',
  //   sideBar: false,
  // },
];

export default routes;
