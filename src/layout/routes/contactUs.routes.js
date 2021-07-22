import ContactUs from '../../views/pages/contact-us';

let routes = [
  {
    path: '/admin/contact-us',
    name: 'contactUs',
    icon: 'contact-us-icon',
    component: ContactUs,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
];

export default routes;
