import Questions from '../../views/pages/questions';
import QuestionsAdd from '../../views/pages/questions/addQuestion';

import i18 from '../../i18n/i18n';
let routes = [
  {
    path: '/admin/questions',
    name: i18.t('question'),
    icon: 'user-icon',
    component: Questions,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/questions/add',
    name: i18.t('question'),
    icon: 'user-icon',
    component: QuestionsAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  //   {
  //     path: '/admin/Questions/edit/:id',
  //     name: i18.t('Questions'),
  //     icon: 'user-icon',
  //     component: QuestionsEdit,
  //     svg: true,
  //     layout: '/admin',
  //     sideBar: false,
  //   },
  //   {
  //     path: '/admin/Questions/view/:id',
  //     name: i18.t('Questions'),
  //     icon: 'user-icon',
  //     component: QuestionsView,
  //     svg: true,
  //     layout: '/admin',
  //     sideBar: false,
  //   },
];

export default routes;
