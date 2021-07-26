import Questions from '../../views/pages/questions';
import QuestionsAdd from '../../views/pages/questions/addQuestion';
// import QuestionsView from '../../views/pages/questions/viewQuestion';
import QuestionsEdit from '../../views/pages/questions/editQuestion';

let routes = [
  {
    path: '/admin/questions',
    name: 'question',
    icon: 'user-icon',
    component: Questions,
    svg: true,
    layout: '/admin',
    sideBar: true,
  },
  {
    path: '/admin/questions/addQuestion',
    name: 'question',
    icon: 'user-icon',
    component: QuestionsAdd,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  // {
  //   path: '/admin/questions/viewQuestion/:id',
  //   name: 'question',
  //   icon: 'user-icon',
  //   component: QuestionsView,
  //   svg: true,
  //   layout: '/admin',
  //   sideBar: false,
  // },
  {
    path: '/admin/questions/editQuestion/:id',
    name: 'question',
    icon: 'user-icon',
    component: QuestionsEdit,
    svg: true,
    layout: '/admin',
    sideBar: false,
  },
  //   {
  //     path: '/admin/Questions/edit/:id',
  //     name: 'Questions),
  //     icon: 'user-icon',
  //     component: QuestionsEdit,
  //     svg: true,
  //     layout: '/admin',
  //     sideBar: false,
  //   },
  //   {
  //     path: '/admin/Questions/view/:id',
  //     name: 'Questions),
  //     icon: 'user-icon',
  //     component: QuestionsView,
  //     svg: true,
  //     layout: '/admin',
  //     sideBar: false,
  //   },
];

export default routes;
