import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo',
      component: () => import('../views/TodoView.vue')
    },
    {
      path: '/statistic',
      name: 'statistic',
      component: () => import('../views/StatisticView.vue')
    }
  ]
})

export default router
