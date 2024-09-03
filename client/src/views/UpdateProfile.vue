<template>
    <div class="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-4">Update Profile</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="country" class="block text-gray-700">Country</label>
          <select
            id="country"
            v-model="form.country"
            class="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          >
            <option v-for="country in countries" :key="country" :value="country">
              {{ country }}
            </option>
          </select>
        </div>
  
        <div class="mb-4">
          <label for="profilePicture" class="block text-gray-700">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            @change="handleFileChange"
            class="w-full mt-1"
          />
          <p class="text-sm text-gray-500 mt-1">
            Optional: Adding a profile picture can help personalize your profile.
          </p>
        </div>
  
        <button
          type="submit"
          class="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  </template>
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import axiosInstance from '@/api/axios';
import {  useRouter } from 'vue-router';

const store = useStore();
const user = store.state.user;
const router = useRouter()

const form = ref({
  name: user.name,
  email: user.email,
  country: user.country,
  profilePicture: null,
});

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'France',
  'Germany',
  'Morocco',
  // Add more countries as needed
];

const handleFileChange = (event) => {
  form.value.profilePicture = event.target.files[0];
};

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append('name', form.value.name);
  formData.append('email', form.value.email);
  formData.append('country', form.value.country);
  if (form.value.profilePicture) {
    formData.append('profilePicture', form.value.profilePicture);
  }

  try {
    const response = await axiosInstance.put(`/updateUser/${user._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      store.commit('setUser', {
        user: response.data.user
      });
      router.push('/profile'); 
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    // Handle error (e.g., show notification)
  }
};

</script>
  