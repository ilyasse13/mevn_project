<!-- src/views/Recipe.vue -->
<template>
    <div class="p-6 min-h-screen flex justify-center items-center">
        <div v-if="recipe" class="max-w-4xl mx-auto bg-white/10 shadow-lg rounded-lg overflow-hidden">
            <img v-if="recipe.image" :src="`http://localhost:5000${recipe.image}`" alt="Recipe Image"
                class="w-full h-96 object-cover rounded-t-lg">
            
            <div class="p-6">
                <h1 class="text-3xl font-semibold text-white mb-4">{{ recipe.title }}</h1>
                <p class="text-white/75 mb-6">{{ recipe.description }}</p>

                <h2 class="text-2xl font-semibold mb-2 text-white">Ingredients</h2>
                <ul class="list-disc list-inside mb-6 text-white">
                    <li v-for="(ingredient, index) in recipe.ingredients" :key="index">{{ ingredient }}</li>
                </ul>

                <h2 class="text-2xl font-semibold mb-2 text-white">Instructions</h2>
                <ul>
                    <li v-for="(instruction, index) in recipe.instructions" :key="index" class="mb-2 text-white">
                        {{ index + 1 }}. {{ instruction }}
                    </li>
                </ul>

            </div>
        </div>

        <div v-else class="text-center mt-28 text-gray-100">
            <p>Loading recipe...</p>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/api/axios';

const route = useRoute();
const recipe = ref(null);

const fetchRecipe = async () => {
    try {
        const response = await axiosInstance.get(`/recipes/${route.params.id}`);
        recipe.value = response.data;
    } catch (error) {
        console.error('Error fetching recipe:', error);
    }
};

onMounted(fetchRecipe);
</script>

<style scoped>
/* Add some custom styles if necessary */
</style>