import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Home from '@/components/Home'
import Edit from '@/components/Edit'

let routes = [
  {
    path:'/home/:id?',
    component:Home,
  },
  {
    path:'/edit',
    component:Edit,
  },
  {
    path:'*',
    redirect:'/home'
  }
];

let router = new VueRouter({
   mode:'history',
   routes,
});

export default router;
