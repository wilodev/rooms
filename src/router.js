import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import HomePage from './views/HomePage.vue';
import SearchPage from './views/SearchPage.vue';
import NotFoundPage from './views/NotFoundPage.vue';

// User Pages
import ProfilePage from './views/user/ProfilePage.vue';
import HousesPages from './views/user/HousesPage.vue';
import CreateHousePage from './views/CreateHousePage.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/search',
      name: 'SearchPage',
      component: SearchPage,
    },
    {
      path: '/user',
      redirect: { name: 'ProfilePage' },
    },
    {
      path: '/user/profile',
      name: 'ProfilePage',
      component: ProfilePage,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/user/houses',
      name: 'HousesPages',
      component: HousesPages,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/house',
      name: 'House',
      component: ProfilePage,
    },
    {
      path: '/house/new',
      name: 'CreateHousePage',
      component: CreateHousePage,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '*',
      name: 'NotFoundPage',
      component: NotFoundPage,
    },
  ],
});

// Guardianes
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requireAuth)) {
    if (store.state.authId) {
      next();
    } else {
      next({ name: 'HomePage' });
    }
  } else {
    next();
  }
});

export default router;
