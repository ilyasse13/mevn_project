<template>
    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Create a New Recipe</h1>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="title" class="block text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            class="w-full mt-1 border border-gray-300 rounded-md p-2"
            required
          />
        </div>
  
        <div>
          <label for="description" class="block text-gray-700">Description</label>
          <textarea
            id="description"
            v-model="form.description"
            rows="4"
            class="w-full mt-1 border border-gray-300 rounded-md p-2"
            required
          ></textarea>
        </div>
  
        <div>
          <label for="ingredients" class="block text-gray-700">Ingredients (comma separated)</label>
          <input
            type="text"
            id="ingredients"
            v-model="form.ingredients"
            class="w-full mt-1 border border-gray-300 rounded-md p-2"
            required
          />
        </div>
  
        <div>
          <label for="instructions" class="block text-gray-700">Instructions</label>
          <textarea
            id="instructions"
            v-model="form.instructions"
            rows="4"
            class="w-full mt-1 border border-gray-300 rounded-md p-2"
            required
          ></textarea>
        </div>
  
        <div>
          <label for="image" class="block text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            @change="handleFileChange"
            class="w-full mt-1"
          />
        </div>
  
        <button
          type="submit"
          class="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-300"
        >
          Create Recipe
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axiosInstance from '@/api/axios'; // Adjust the path if needed
  
  const form = ref({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    image: null,
  });
  
  const handleFileChange = (event) => {
    form.value.image = event.target.files[0];
  };
  
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('description', form.value.description);
    formData.append('ingredients', form.value.ingredients);
    formData.append('instructions', form.value.instructions);
    if (form.value.image) {
      formData.append('image', form.value.image);
    }
  
    try {
      const response = await axiosInstance.post('/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Recipe created successfully!', response.data);
      // Redirect or notify the user as needed
    } catch (error) {
      console.error('Error creating recipe:', error);
      // Handle error (e.g., show notification)
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles for your form */
  </style>
  