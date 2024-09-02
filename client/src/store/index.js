// src/store/index.js

import { createStore } from 'vuex';
import axiosInstance from '@/api/axios'; // Import your Axios instance

const store = createStore({
  state() {
    return {
      user: JSON.parse(sessionStorage.getItem('user')) || null,
      token: sessionStorage.getItem('token') || null,
    };
  },
  mutations: {
    setUser(state, { user, token }) {
      state.user = user;
      state.token = token;
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', token);

      // Set a timer to clear session storage after 5 hours
      setTimeout(() => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        state.user = null;
        state.token = null;
      }, 5 * 60 * 60 * 1000); // 5 hours in milliseconds
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    }
  },
  actions: {
    async register({ commit }, userData) {
      try {
        const response = await axiosInstance.post('/auth/register', userData);
        
        // Commit the user data and token to the Vuex store
        commit('setUser', {
          user: response.data.user,
          token: response.data.token
        });
    
        // Redirect to the dashboard after successful registration
  
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle error, possibly by dispatching an error notification or updating a state variable
      }
    },
    async login({ commit }, userData) {
      try {
        const response = await axiosInstance.post('/auth/login', userData);
        commit('setUser', {
          user: response.data.user,
          token: response.data.token
        });
   
      } catch (error) {
        console.error('Login failed:', error);
        // Handle error appropriately, e.g., show a notification
      }
    },
    logout({ commit }) {
      commit('clearUser');
    }
  }
});

export default store;
