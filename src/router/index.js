/*
 * @Autor: zengjun1.fj
 * @Date: 2024-08-15 16:43:21
 * @LastEditors: zhenjun
 * @LastEditTime: 2024-09-10 11:01:43
 * @Description:
 */
/*
 * @Autor: zengjun1.fj
 * @Date: 2024-08-15 16:43:21
 * @LastEditors: zengjun1.fj
 * @LastEditTime: 2024-08-19 10:12:34
 * @Description:
 */
import { createRouter } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
// import { createWebHashHistory } from 'vue-router'
import { createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
