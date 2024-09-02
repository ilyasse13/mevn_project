// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/layouts/Welcome.vue';
import Guest from '@/layouts/Guest.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue'; // Ensure this path is correct
import Register from '@/views/Register.vue'; // Ensure this path is correct
import Dashboard from '@/views/Dashboard.vue';
import Profile from '@/views/Profile.vue';
import Members from '@/views/Members.vue';
import CreateRecipe from '@/views/createRecipe.vue';
import Recipe from '@/views/Recipe.vue';
import store from '@/store';

const routes = [
  {
    path: '/',
    component: Welcome, // This is the layout that contains the navbar
    children: [
      {
        path: '', // Default child route for "/"
        name: 'Home',
        component: Home,
        beforeEnter: (to, from, next) => {
          // Check if the user is already authenticated
          const isAuthenticated = store.state.token !== null;
          
          if (isAuthenticated) {
            // Redirect to dashboard if already logged in
            next('/dashboard');
          } else {
            // Otherwise, proceed to the login page
            next();
          }
        }
      },
      {
        path: 'about', // Render when the user goes to "/about"
        name: 'About',
        component: About,
      },
    ],
  },
  {
    path: '/', // Base path for guest layout
    component: Guest,
    children: [
      {
        path: 'login', // Will render when the user goes to "/guest/login"
        name: 'Login',
        component: Login,
      },
      {
        path: 'register', // Will render when the user goes to "/guest/register"
        name: 'Register',
        component: Register,
      },
    ],
  },
  {
    path: '/', // New layout route
    component: DefaultLayout,
    children: [
      {
        path: 'dashboard', // Default child route for "/dashboard"
        name: 'Dashboard',
        meta: { requiresAuth: true }, // Requires authentication
        component: Dashboard,
      },
      {
        path: 'profile', // Render when the user goes to "/dashboard/profile"
        name: 'Profile',
        meta: { requiresAuth: true }, // Requires authentication
        component: Profile,
      },
      {
        path:'/Members',
        name: 'Members',
        mete:{ requiresAuth: true},
        component: Members,
      },
      {
        path: 'add-recipe',
        name: 'add-Recipe',
        meta: { requiresAuth: true }, 
        component: CreateRecipe,
      },
      {
        path: 'recipes/:id',
        name: 'Recipe',
        meta: { requiresAuth: true },
        component: Recipe,
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.token !== null;
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Redirect to login page if not authenticated
    next('/login');
  } else {
    next();
  }
});

export default router;
