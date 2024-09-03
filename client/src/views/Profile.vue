<template>
  <div class="p-6  min-h-screen">
    <h1 class="text-3xl font-bold mb-4">User Profile</h1>
    
    <!-- User profile information -->
    <div class="bg-white/10 shadow rounded p-6 relative">
  <!-- Update button -->
  <a 
    href="/update-profile" 
    class="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
  >
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-1a1 1 0 00-1-1H9V7h4v8h1a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1H8V6a1 1 0 011-1h1a1 1 0 011 1v1h1V6a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1z"></path>
    </svg>
    Update
  </a>

  <div class="flex items-center space-x-4">
    <img 
      v-if="user.image"
      class="h-16 w-16 rounded-full" 
      :src="`http://localhost:5000${user.image}`" 
      alt="Profile Picture" 
    />
    <UserIcon 
      v-else 
      class="h-16 w-16 text-gray-500 rounded-full" 
    />
    <h2 class="text-xl text-white font-semibold">{{ user.name }}</h2>
  </div>

  <div class="space-y-2 text-white">
    <div class="flex items-center">
      <p class="font-semibold w-32">Email:</p>
      <p class="text-gray-100">{{ user.email }}</p>
    </div>
    <div class="flex items-center">
      <p class="font-semibold w-32">Country:</p>
      <p class="text-gray-100">{{ user.country }}</p>
    </div>
  </div>
</div>

    
    <!-- User recipes -->
    <div class="mt-8">
      <h2 class="text-2xl text-white font-semibold mb-4">Your Recipes</h2>
      <div v-if="loading" class="text-center text-gray-500">Loading recipes...</div>
      <div v-else-if="recipes.length === 0" class="text-center text-gray-500">No recipes found.</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="recipe in recipes" 
          :key="recipe._id" 
          class="bg-white/10 shadow rounded-lg overflow-hidden"
        >
          <img 
            v-if="recipe.image" 
            :src="`http://localhost:5000${recipe.image}`" 
            alt="Recipe Image" 
            class="h-40 w-full object-cover"
          />
          <div class="p-4">
            <h3 class="text-xl text-white font-semibold">{{ recipe.title }}</h3>
            <p class="text-white/70 mt-2 line-clamp-3">{{ recipe.description }}</p>
            <router-link 
              :to="`/recipes/${recipe._id}`" 
              class="mt-4 block w-1/3 bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-200"
            >
              View Recipe
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex'; 
import axiosInstance from '@/api/axios'; 
import { UserIcon } from '@heroicons/vue/24/solid'; 
import { RouterLink } from 'vue-router';

const store = useStore();
const user = ref(store.state.user); // Access user data from Vuex store

const recipes = ref([]);
const loading = ref(true);

const fetchUserRecipes = async () => {
  try {
    const response = await axiosInstance.get(`/recipes/userRecipes/${user.value._id}`);
    recipes.value = response.data;
  } catch (error) {
    console.error('Error fetching user recipes:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUserRecipes();
});

const editProfile = () => {
  console.log('Edit profile clicked');
};
</script>

<style scoped>
/* Scoped styles for profile page */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
