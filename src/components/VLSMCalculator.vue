<script setup lang="ts">
import { ref, watch } from 'vue'
import SubnetForm from './SubnetForm.vue'

const network = ref<string>('')
const subnetNum = ref<number>(0)
const selected = ref<string>('/24')
const suffixes = ['/24', '/25', '/26', '/27', '/28', '/29']

// IP address validation method
const validateIp = (ip: string): boolean => {
  const regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return regex.test(ip)
}
watch(network, (newValue) => {
  if (!validateIp(newValue)) {
    console.log('Invalid IP address format')
    // You could show a validation message to the user here
  }
})
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header">
            <h3 class="mb-0">VLSM Calculator</h3>
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
                  :aria-invalid="network && !validateIp(network) ? 'true' : 'false'"
                  :class="{ 'is-invalid': network && !validateIp(network) }"
                  autofocus
                />
                <select v-model="selected" class="form-control">
                  <option v-for="suffix in suffixes" :key="suffix" :value="suffix">
                    {{ suffix }}
                  </option>
                </select>
              </div>
              <!-- Validation error -->
              <div v-if="network && !validateIp(network)" class="invalid-feedback">
                Invalid IP address format
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
                :disabled="!validateIp(network)"
                aria-label="Number of Subnets"
                :aria-disabled="!validateIp(network)"
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
  background-color: #f8f9fa; /* Light background for the card header */
  padding: 10px;
  text-align: center;
  color: #222222;
}

.card-header h6 {
  margin: 0; /* To remove any default margin */
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

/* Ensuring input and select background is distinct and text is readable */
input,
select {
  color: var(--input-text-color); /* Set text color */
  background-color: var(--input-background-color); /* Set background color */
  border: 1px solid var(--input-border-color); /* Set border color */
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

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
