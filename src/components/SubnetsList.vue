<script setup lang="ts">
import { ref } from 'vue';
import { SubnetInterface } from '@/interfaces'

// Define props for the component if any
const isMobile = window.matchMedia('(max-width: 700px)').matches;

const subnets = ref<SubnetInterface[]>([]);

// Search function for finding input sizes
const searchSize = (nameKey: number, myArray: any[]): any | undefined => {
  return myArray.find(item => item.size === nameKey);
};

// Populate subnets data (Example)
const networks = [] // replace with your actual network data
const inputs = [] // replace with your actual subnet form data

networks.forEach((subnet) => {
  const input = searchSize(subnet.getNeededSize(), inputs);
  const result = {
    name: input?.name || '',
    hosts: subnet.getNeededSize(),
    network: subnet.getNetwork(),
    first_IP: subnet.getFirstIP(),
    last_IP: subnet.getLastIP(),
    broadcast: subnet.getBroadcast(),
    mask: subnet.getSubnetMask(),
  };
  subnets.value.push(result);
});

// Reset function
const reset = () => {
  // Add your reset logic here (such as clearing stores)
  console.log('Reset triggered');
};

</script>

<template>
  <div>
    <!-- Reset Button -->
    <button @click="reset" class="reset-button">Reset</button>

    <!-- Responsive Layout for Mobile -->
    <div v-if="isMobile" class="subnets-mobile">
      <div v-for="(subnet, index) in subnets" :key="index" class="subnet-card">
        <div class="subnet-header">
          <h5>Name: {{ subnet.name }}</h5>
          <h6>Hosts: {{ subnet.hosts }}</h6>
        </div>
        <ul class="subnet-list">
          <li>Network: {{ subnet.network }}</li>
          <li>First IP: {{ subnet.first_IP }}</li>
          <li>Last IP: {{ subnet.last_IP }}</li>
          <li>Broadcast: {{ subnet.broadcast }}</li>
          <li>Subnet Mask: {{ subnet.mask }}</li>
        </ul>
      </div>
    </div>

    <!-- Table Layout for Desktop -->
    <div v-else>
      <table class="subnet-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Hosts</th>
            <th>Network</th>
            <th>First IP</th>
            <th>Last IP</th>
            <th>Broadcast</th>
            <th>Subnet Mask</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(subnet, index) in subnets" :key="index">
            <td>{{ subnet.name }}</td>
            <td>{{ subnet.hosts }}</td>
            <td>{{ subnet.network }}</td>
            <td>{{ subnet.first_IP }}</td>
            <td>{{ subnet.last_IP }}</td>
            <td>{{ subnet.broadcast }}</td>
            <td>{{ subnet.mask }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Reset Button */
.reset-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.reset-button:hover {
  background-color: #45a049;
}

/* Mobile Layout */
.subnets-mobile {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.subnet-card {
  background-color: white;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.subnet-header {
  margin-bottom: 1rem;
}

.subnet-list {
  list-style: none;
  padding: 0;
}

.subnet-list li {
  margin: 0.5rem 0;
}

/* Desktop Table Layout */
.subnet-table {
  width: 100%;
  border-collapse: collapse;
}

.subnet-table th, .subnet-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.subnet-table th {
  background-color: #f4f4f4;
}
</style>
