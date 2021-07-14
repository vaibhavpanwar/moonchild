import ContactUs from '../../views/pages/contact-us';
import i18 from '../../i18n/i18n';
let routes = [
  {
    path: '/admin/contact-us',
    name: i18.t('contactUs'),
    icon: 'contact-us-icon',
    component: ContactUs,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
];

export default routes;
