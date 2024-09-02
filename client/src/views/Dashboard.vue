<template>
  <div class="p-6 min-h-screen">
    <div class="flex justify-end mb-6">
      <a href="/add-recipe"
        class="bg-white text-purple-800 py-2 font-semibold text-md px-2 rounded shadow transition-colors duration-300 ease-in-out hover:bg-purple-800 hover:text-white">
        + Add a Recipe 
      </a>
    </div>
    <p class="text-gray-100 mb-6">
      Discover new recipes! Browse through our collection to find your next favorite dish.
    </p>

    <!-- Conditionally render recipes or a no recipes message -->
    <div v-if="recipes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="recipe in recipes" :key="recipe._id" class="bg-white/10 shadow-lg rounded-lg overflow-hidden">
        <img v-if="recipe.image" :src="`http://localhost:5000${recipe.image}`" alt="Recipe Image" class="w-full h-48 object-cover">
        <div class="p-4">
          <h2 class="text-xl text-white font-semibold mb-2">{{ recipe.title }}</h2>
          <p class="text-gray-50 mb-4">{{ recipe.description }}</p>
          <router-link :to="`/recipes/${recipe._id}`" class="text-indigo-200 hover:underline font-medium">See more</router-link>
        </div>
      </div>
    </div>
    <div v-else class="text-center mt-28 text-gray-100">
      <p>No recipes available at the moment. Check back later!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/api/axios';

const recipes = ref([]);

const fetchRecipes = async () => {
  try {
    const response = await axiosInstance.get('/recipes');
    recipes.value = response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
};

onMounted(fetchRecipes);
</script>

<style scoped>
/* Add some custom styles for the recipe cards */
img {
  height: 200px;
}
</style>
