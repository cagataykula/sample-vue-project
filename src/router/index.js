import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import i18n from '@/i18n'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'projectName'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      title: 'profile'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/contact-us',
    name: 'ContactUs',
    meta: {
      title: 'contactUs'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/ContactUs.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const DEFAULT_TITLE = 'Sample Project';
router.afterEach((to) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    Vue.nextTick(() => {
      changeDocumentTitle(to.meta.title)
    });
});

export const changeDocumentTitle = (title) => {
  document.title = i18n.t(title) || DEFAULT_TITLE;
}

export default router
