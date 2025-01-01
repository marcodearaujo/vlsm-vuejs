<script setup lang="ts">
import { ref } from 'vue'
import SubnetForm from './SubnetForm.vue'

const network = ref<string>('')
const subnetNum = ref<number>(0)
const selected = ref<string>('/24')
const suffixes = ['/24', '/25', '/26', '/27', '/28', '/29']

// IP address validation method
const validateIp = () => {
  const regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  if (network.value && !regex.test(network.value)) {
    console.log('Invalid IP address format')
    // Add error handling logic as needed
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header">
            <h6 class="mb-0">VLSM Calculator</h6>
          </div>

          <div class="card-body">
            <div class="form-group">
              <!-- Major Network Input -->
              <label for="network">Major Network</label>
              <div class="input-group">
                <input
                  id="network"
                  type="text"
                  class="form-control"
                  v-model="network"
                  @keyup="validateIp"
                  autofocus
                />
                <select v-model="selected" class="form-control">
                  <option v-for="suffix in suffixes" :key="suffix" :value="suffix">
                    {{ suffix }}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-group mt-3">
              <!-- Number of Subnets Input -->
              <label for="subnetNum">Number of Subnets</label>
              <input
                id="subnetNum"
                type="number"
                class="form-control"
                v-model="subnetNum"
                aria-label="Number of Subnets"
              />
            </div>

            <!-- Subnet Form Component -->
            <div class="mt-4">
              <SubnetForm :majorNetwork="network" :suffix="selected" :subnets="subnetNum" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom Styles */
.container {
  max-width: 600px;
  margin-top: 50px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
}

.card-header {
  background-color: #f8f9fa;
  padding: 10px;
  text-align: center;
}

.card-body {
  padding: 20px;
}

.input-group {
  display: flex;
  align-items: center;
}

.input-group input,
.input-group select {
  flex: 1;
}

input,
select {
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

label {
  font-weight: bold;
}

.mt-3 {
  margin-top: 1rem;
}

.mt-4 {
  margin-top: 2rem;
}
</style>
