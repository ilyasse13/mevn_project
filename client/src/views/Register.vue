<template>
    <div>
        <h2 class="text-2xl text-white font-bold text-center mb-8">Register</h2>
        <form @submit.prevent="handleRegister">
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-white">Name</label>
                <input type="text" id="name" v-model="name" required
                    class="mt-1 block w-full bg-white/25 text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-300 focus:ring-2 sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-white">Email</label>
                <input type="email" id="email" v-model="email" required
                    class="mt-1 block w-full bg-white/25 text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-300 focus:ring-2 sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="country" class="block text-sm font-medium text-white">Country</label>
                <select id="country" v-model="country" required
                    class="mt-1 block w-full bg-gray-900 text-white px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-300 focus:ring-2 sm:text-sm">
                    <option value="" disabled>Select your country</option>
                    <option value="USA">USA</option>
                    <option value="Morocco">Morocco</option>
                    <option value="France">France</option>
                    <option value="UK">Uk</option>
                </select>

            </div>
            <div class="mb-6">
                <label for="password" class="block text-sm font-medium text-white">Password</label>
                <input type="password" id="password" v-model="password" required
                    class="mt-1 block w-full bg-white/25 text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-300 focus:ring-2 sm:text-sm" />
            </div>
            <button type="submit"
                class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Register
            </button>
            <div class="mt-6 text-center">
                <p class="text-sm text-gray-100">Already have an account? <router-link to="/login"
                        class="text-indigo-400 hover:underline">Login</router-link></p>
            </div>
        </form>
    </div>
</template>

<script>
import axiosInstance from '@/api/axios'
import { mapActions } from 'vuex';
export default {
    name: 'Register',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            country: '',
        };
    },
    methods: {
       
        ...mapActions(['register']),
    async handleRegister() {
      try {
        await this.register({
          name: this.name,
          email: this.email,
          password: this.password,
          country: this.country
        });
        this.$router.push('/dashboard');
        // Handle successful registration (e.g., redirect to another page)
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle error
      }
    }
    },
};
</script>
