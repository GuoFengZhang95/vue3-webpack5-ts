// import systemRoutes from './modules'
// import member from './modules/member'
export default [
  {
    path: 'system',
    component: () => import('@/views/system.vue'),
    redirect: '/system/notice',
    // children: [...systemRoutes, ...member],
  },
]
