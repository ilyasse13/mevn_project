<!-- src/views/Home.vue -->
<template>
    <div>
      <HeroSection />
      <Stat :targetRecipesCount="150" :targetUsersCount="500" />
    </div>
  </template>
  
  <script>
  import HeroSection from '../components/HeroSection.vue';
  import Stat from '../components/Stat.vue';
  
  export default {
    name: 'Home',
    components: {
      HeroSection,
      Stat
    },
    data() {
      return {
        form: {
          name: '',
          email: '',
          message: '',
        },
      };
    },
    methods: {
      submitForm() {
        // Handle form submission logic here, e.g., send data to an API
        console.log('Form submitted:', this.form);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles for Home.vue */
  </style>
  