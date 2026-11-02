const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [{ path: '', name: 'home', component: () => import('@/pages/IndexPage.vue') }]
  },
  { path: '/:catchAll(.*)*', redirect: '/' }
]

export default routes