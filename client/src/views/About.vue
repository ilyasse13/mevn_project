<!-- src/views/About.vue -->
<template>
    <div class=" py-12">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <h1 class="text-4xl font-bold text-center mb-8">About Our Recipe Sharing Platform</h1>
        
        <!-- Introduction -->
        <section class="mb-12">
          <p class="text-lg text-center mb-4">
            Welcome to our Recipe Sharing Platform! We are dedicated to providing a space where you can share, discover, and enjoy a wide variety of recipes from around the world.
          </p>
          <p class="text-lg text-center mb-4">
            Whether you're a seasoned chef or a home cook, you'll find a plethora of recipes and cooking tips to inspire your next meal. Our platform is designed to foster a community of food enthusiasts who love to explore new flavors and share their culinary creations.
          </p>
        </section>
        
        <!-- Features -->
        <section class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-3xl font-semibold text-center mb-6">Key Features</h2>
          <ul class="list-disc list-inside space-y-4">
            <li class="text-lg">
              <strong>Share Recipes:</strong> Easily upload and share your favorite recipes with the community.
            </li>
            <li class="text-lg">
              <strong>Discover New Recipes:</strong> Browse through a vast collection of recipes from around the world.
            </li>
            <li class="text-lg">
              <strong>Community Interaction:</strong> Comment, rate, and engage with other users’ recipes.
            </li>
            <li class="text-lg">
              <strong>Personalized Recommendations:</strong> Get recipe suggestions based on your preferences and cooking history.
            </li>
          </ul>
        </section>
        
        <!-- Call to Action -->
        <section class="mt-12 text-center">
          <p class="text-lg mb-4">
            Ready to start exploring and sharing recipes? Join our community today and become a part of the Recipe Sharing Platform!
          </p>
          <router-link
            to="/register"
            class="inline-block rounded-full bg-indigo-600 px-8 py-3 text-lg font-medium text-white transition hover:bg-indigo-700"
          >
            Sign Up Now
          </router-link>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'About',
  };
  </script>
  
  <style scoped>
  /* Scoped styles for About.vue */
  </style>
  