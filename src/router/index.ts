import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import firebase from 'firebase';
import 'firebase/auth';

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
    component: () => import('../views/authentication/Login.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/authentication/Register.vue'),
    meta: {
      requiresGuest: true
    }
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  
  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (requiresGuest && isAuthenticated) {
    // next('/');
  } else {
    next();
  }
});

export default router;