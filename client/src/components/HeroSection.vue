<!-- src/components/HeroSection.vue -->
<template>
    <!--
      Heads up! 👋
    
      This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
    -->
    
    <section class="overflow-hidden bg-[url(/hero.jpg)] bg-cover bg-center bg-no-repeat">
  <div class="bg-black/50 p-8 md:p-12 lg:px-16 lg:py-24">
    <div class="text-center ltr:sm:text-left rtl:sm:text-right">
      <h2 class="text-2xl font-bold text-white sm:text-3xl md:text-5xl">Discover Your Perfect Recipe</h2>

      <p class="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
        Dive into our extensive collection of recipes crafted for every taste and occasion. From quick weeknight dinners to elaborate feasts, we have something for everyone. Explore, share, and enjoy delicious meals with ease.
      </p>

      <div class="mt-4 sm:mt-8">
        <a
          href="#"
          class="inline-block rounded-full bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          Get Yours Today
        </a>
      </div>
    </div>
  </div>
</section>

  </template>
  
  <script>
  export default {
    name: 'HeroSection',
  };
  </script>
  
  <style scoped>
  /* Scoped styles for HeroSection.vue */
  </style>
  