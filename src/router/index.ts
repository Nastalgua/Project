import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/authentication/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/authentication/Register.vue')
  }
]

const router = new VueRouter({
  routes
});

export default router;