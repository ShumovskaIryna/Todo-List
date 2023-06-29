import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo',
      component: HomeView
    },
    {
      path: '/statistic',
      name: 'statistic',
      component: () => import('../views/StatisticView.vue')
    }
  ]
})

export default router
