import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: import('@/layout/index.vue'),
    // redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/dashboard/index.vue'),
  },
  // 登录页
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录页面',
      isTagView: true,
      cache: false,
      affix: false,
      breadcrumb: false
    },
  },
  // 修改密码页面
  {
    path: '/password',
    name: 'Password',
    component: () => import('@/views/login/password.vue'),
    meta: {
      title: '修改密码',
      isTagView: true,
      cache: false,
      affix: false,
      breadcrumb: false
    },
  },
  // 第三方授权回跳页面
  {
    path: '/bind',
    name: 'LoginBind',
    component: () => import('@/views/login/bind.vue'),
    meta: {
      itle: '第三方授权',
      isTagView: true,
      cache: false,
      affix: false,
      breadcrumb: false
    },
  },
  // 403
  {
    path: '/403',
    name: 'Page403',
    component: () => import('../views/errorpage/forbidden.vue'),
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
    component: () => import('@/views/errorpage/notFund.vue'),
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