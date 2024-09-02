<!-- src/layouts/GuestLayout.vue -->
<template>
    <div class="min-h-screen flex items-center justify-center ">
      <div class="w-full max-w-md px-6 py-8 bg-white/5 shadow-md rounded-lg">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Guest',
  };
  </script>
  
  <style scoped>
  /* Additional styling if necessary */
  </style>
  