import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import noteinfo from '@/views/noteInfo'

const router = new VueRouter({
   mode:'history',
   routes:[
     {
       path:'/home/:userId?',
       component:noteinfo
     },
     // 重定向路由信息
     {
       path:'*',
       redirect:'/home'
     }
   ]
});

export default router;
