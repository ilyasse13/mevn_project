<!-- src/components/Stat.vue -->
<template>
    <div class="flex justify-around py-10  rounded-lg shadow-lg">
      <div class="text-center">
        <h2 class="text-4xl font-bold text-indigo-200">{{ recipesCount }}</h2>
        <p class="text-lg text-gray-100 mt-2">Recipes</p>
      </div>
      <div class="text-center">
        <h2 class="text-4xl font-bold text-indigo-200">{{ usersCount }}</h2>
        <p class="text-lg text-gray-100 mt-2">Users</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Stat',
    data() {
      return {
        recipesCount: 0, // Initial count for recipes
        usersCount: 0, // Initial count for users
      };
    },
    props: {
      targetRecipesCount: {
        type: Number,
        required: true,
      },
      targetUsersCount: {
        type: Number,
        required: true,
      },
    },
    mounted() {
      this.incrementCounter('recipesCount', this.targetRecipesCount);
      this.incrementCounter('usersCount', this.targetUsersCount);
    },
    methods: {
      incrementCounter(counter, target) {
        const incrementSpeed = 50; // Lower values will make the counter faster
        const increment = Math.ceil(target / (2000 / incrementSpeed)); // 2000ms is the total duration for the count animation
        const updateCounter = () => {
          if (this[counter] < target) {
            this[counter] += increment;
            if (this[counter] > target) {
              this[counter] = target;
            }
            setTimeout(updateCounter, incrementSpeed);
          }
        };
        updateCounter();
      },
    },
  };
  </script>
  
  <style scoped>
  /* No additional styles needed, Tailwind handles it */
  </style>
  