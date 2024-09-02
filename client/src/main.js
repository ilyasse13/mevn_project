// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import './assets/main.css'; // Global styles if needed
import store from './store';

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
