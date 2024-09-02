
<template>
    
     
      <Header />
      <main>
      <router-view></router-view> <!-- This will render the Home or About components -->
    </main>
    
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  
  export default {
    name: 'Welcome',
    components: {
      Header,
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles for Welcome.vue */
  </style>
  