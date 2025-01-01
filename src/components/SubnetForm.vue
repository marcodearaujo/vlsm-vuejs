<script setup lang="ts">
import { ref, watch } from 'vue'
import type { SubnetFormInterface } from '@/interfaces'

const subnetForm = ref<SubnetFormInterface[]>([])

// Define props
const props = defineProps<{
  majorNetwork: string
  suffix: string
  subnets: number
}>()

// Watch the `subnets` prop to update `subnetForm`
watch(
  () => props.subnets,
  (newSubnets) => {
    const subnetsCount = newSubnets
    subnetForm.value = isNaN(subnetsCount)
      ? []
      : Array.from({ length: subnetsCount }, () => ({ name: '', size: 0 }))
  },
)

// Calculate method
const calc = () => {
  console.log('Calculating...', subnetForm.value)
  const majorNetwork = `${props.majorNetwork}/${props.suffix}`
  const subnets = subnetForm.value.map((subnet) => subnet.size)

  // Assume store and subnet classes are properly defined elsewhere
  // this.$Store.clearAllAction();
  // let network = new this.$Subnet(subnets, majorNetwork, this.$Network);
  // this.$Store.setNetworkAction(network);
  // this.$Store.setSubnetFormAction(subnetForm.value);
  // this.$router.push('subnets');

  // Example output for testing purposes
  console.log('Major Network:', majorNetwork)
  console.log('Subnets:', subnets)
}
</script>

<template>
  <div class="container">
    <div class="subnet-form" v-if="subnetForm.length > 0">
      <div class="header">
        <h3>Subnets</h3>
      </div>

      <div v-for="(subnet, index) in subnetForm" :key="index" class="subnet-entry">
        <div class="input-group">
          <div class="input-item">
            <label :for="'name-' + index">Name</label>
            <input v-model="subnet.name" type="text" :id="'name-' + index" placeholder="Name" />
          </div>
          <div class="input-item">
            <label :for="'size-' + index">Size</label>
            <input v-model="subnet.size" type="number" :id="'size-' + index" placeholder="Size" />
          </div>
        </div>
      </div>

      <div class="footer">
        <button @click="calc">Calc</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.card-footer {
  padding: 10px;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.btn {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-block {
  width: 100%;
}

.btn:hover {
  background-color: #218838;
}
</style>
