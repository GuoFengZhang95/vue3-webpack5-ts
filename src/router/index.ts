import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('../layout/index.vue'),
  },
  // 403
  {
    path: '/403',
    name: 'Page403',
    component: () => import('../views/errorpage/403.vue'),
    meta: {
      title: '403',
      isTagView: true,
      cache: false,
      affix: false,
      breadcrumb: false
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Page404',
    component: () => import('@/views/errorpage/404.vue'),
    meta: {
      title: '404',
      isTagView: true,
      cache: false,
      affix: false,
      breadcrumb: false
    },
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router