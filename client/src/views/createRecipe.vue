<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Create a New Recipe</h1>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="title" class="block text-gray-300">Title</label>
        <input
          type="text"
          id="title"
          v-model="form.title"
          class="w-full mt-1 border border-gray-700 rounded-md p-2 bg-gray-800 text-gray-300"
          required
        />
      </div>

      <div>
        <label for="description" class="block text-gray-300">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="4"
          class="w-full mt-1 border border-gray-700 rounded-md p-2 bg-gray-800 text-gray-300"
          required
        ></textarea>
      </div>

      <div>
        <label for="ingredients" class="block text-gray-300">Ingredients (one per line)</label>
        <textarea
          id="ingredients"
          v-model="form.ingredients"
          rows="4"
          class="w-full mt-1 border border-gray-700 rounded-md p-2 bg-gray-800 text-gray-300"
          required
        ></textarea>
        <p class="text-sm text-gray-400 mt-1">List each ingredient on a new line.</p>
      </div>

      <div>
        <label for="instructions" class="block text-gray-300">Instructions (one per line)</label>
        <textarea
          id="instructions"
          v-model="form.instructions"
          rows="4"
          class="w-full mt-1 border border-gray-700 rounded-md p-2 bg-gray-800 text-gray-300"
          required
        ></textarea>
        <p class="text-sm text-gray-400 mt-1">List each step on a new line.</p>
      </div>

      <div>
        <label for="image" class="block text-gray-300">Image</label>
        <p class="text-sm text-gray-400 mt-1">Adding an image can help attract more people to view your recipe.</p>
        <input
          type="file"
          id="image"
          @change="handleFileChange"
          class="w-full mt-2 text-gray-300 bg-gray-900 border border-gray-700 rounded-md"
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
import axiosInstance from '@/api/axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore();
const user = ref(store.state.user); // Adjust the path if needed
const router = useRouter();
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
  
  // Convert ingredients and instructions to arrays
  const ingredientsArray = form.value.ingredients.split('\n').map(ingredient => ingredient.trim()).filter(ingredient => ingredient);
  const instructionsArray = form.value.instructions.split('\n').map(instruction => instruction.trim()).filter(instruction => instruction);

  formData.append('ingredients', JSON.stringify(ingredientsArray));
  formData.append('instructions', JSON.stringify(instructionsArray));

  if (form.value.image) {
    formData.append('image', form.value.image);
  }

  try {
    
    const response = await axiosInstance.post(`/recipes/addRecipe/${user.value._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 201) {
      // Redirect to dashboard on success
      router.push('/dashboard');
    }
    
  } catch (error) {
    console.error('Error creating recipe:', error);
    // Handle error (e.g., show notification)
  }
};
</script>
