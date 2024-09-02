<!-- src/views/Login.vue -->
<template>
   
      <h2 class="text-2xl text-white font-bold text-center mb-8">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-white">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-1 block w-full bg-white/25 text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-300 focus:ring-2 sm:text-sm"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-white">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
             class="mt-1 block w-full bg-white/25 text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-300 focus:ring-2 sm:text-sm"
          />
        </div>
        
        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-100">Don't have an account? <router-link to="/register" class="text-indigo-400 hover:underline">Register</router-link></p>
        </div>
      </form>
   
  </template>
  
  <script>
  import Guest from '@/layouts/Guest.vue';
  import { mapActions } from 'vuex';
import { useRouter } from 'vue-router';
  
  export default {
    name: 'Login',
    components: {
      Guest,
    },
    data() {
      return {
        email: '',
        password: '',
        rememberMe: false,
      };
    },
    methods: {
      ...mapActions(['login']), // Map Vuex actions to component methods
    async handleLogin() {
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
        // Optionally show an error message to the user
      }
    },
    },
  };
  </script>
  