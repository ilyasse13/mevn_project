<template>
  <div>
    <h2 class="text-2xl font-bold text-center mb-8">Members</h2>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <div v-if="members.length === 0" class="text-center">No members found.</div>
      <table v-else class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipes</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="member in members" :key="member._id">
            <td class="px-6 py-4 whitespace-nowrap">
              <img v-if="member.image" :src="member.image" alt="Member Image" class="w-12 h-12 rounded-full object-cover"/>
              <span v-else class=" w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                <UserIcon class="w-8 h-8 text-gray-500"/>
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ member.name }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ member.country }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ member.recipeCount > 0 ? member.recipeCount + ' Recipes' : 'No recipes made' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/api/axios';
import { UserIcon } from '@heroicons/vue/24/solid';

export default {
  name: 'Members',
  components: {
    UserIcon
  },
  data() {
    return {
      members: [],
      loading: true,
    };
  },
  async created() {
    try {
      const response = await axiosInstance.get('/members');
      this.members = response.data;
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 1rem;
  text-align: left;
}

.table th {
  background-color: #f9fafb;
}

.table tr:nth-child(even) {
  background-color: #f9fafb;
}

.table img {
  object-fit: cover;
}

.table span {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}
</style>
