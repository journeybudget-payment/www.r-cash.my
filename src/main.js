import { createApp } from 'vue'
import { Quasar, Notify, Loading } from 'quasar'
import { createRouter, createWebHistory } from 'vue-router'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import './css/app.scss'

import App from './App.vue'
import routes from './router'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to) => (to.hash ? { el: to.hash, behavior: 'smooth' } : { top: 0 })
})

createApp(App)
  .use(Quasar, { plugins: { Notify, Loading }, config: { brand: { primary: '#8b5cf6' } } })
  .use(router)
  .mount('#q-app')
