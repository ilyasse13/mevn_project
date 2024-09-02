<!-- src/App.vue -->
<template>
    <div class="app-container">
      <div class="background-overlay">
        <!-- Background and other static elements -->
      </div>
      <router-view></router-view> <!-- This is where the routed components will be injected -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  };
  </script>
  
  <style scoped>
  .app-container {
    overflow-x: hidden;
    text-neutral-300: antialiased;
    selection-bg: cyan-300;
    selection-text: cyan-900;
    position: relative;
    min-height: 100vh;
  }
  
  .background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%);
  }
  </style>
  