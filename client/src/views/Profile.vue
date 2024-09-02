<!-- src/views/Profile.vue -->
<template>
    <div class="p-6 bg-gray-100 min-h-screen">
      <h1 class="text-3xl font-bold mb-4">User Profile</h1>
      
      <!-- User profile information -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center space-x-4">
          <img class="h-16 w-16 rounded-full" :src="user.profilePicture" alt="Profile Picture" />
          <div>
            <h2 class="text-xl font-semibold">{{ user.name }}</h2>
            <p class="text-gray-600">{{ user.email }}</p>
            <p class="text-gray-500">{{ user.country }}</p>
          </div>
        </div>
        
        <!-- Edit profile button -->
        <div class="mt-4">
          <button @click="editProfile" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex'; // Assuming you use Vuex for state management

  const store = useStore();
  const user = ref(store.state.user); // Access user data from Vuex store
  
  const editProfile = () => {
    // Implement profile editing logic here
    console.log('Edit profile clicked');
  };
  </script>
  
  <style scoped>
  /* Scoped styles for profile page */
  </style>
  