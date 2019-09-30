<template>
<b-container>
  <b-row align-v="center" align-h="center">
    <b-col sm="*">
      <b-card header-tag="header" footer-tag="footer" v-if="subnetForm.length > 0">
        <template v-slot:header>
          <h6 class="mb-0">Subnets</h6>
        </template>
        <template>
          <div v-for="(subnet, index) in subnetForm" :key="index" class="mb-2">
          <b-row align-v="center" align-h="center">
            <b-col sm="*" class="mx-1"><b-form-input placeholder="Name" v-model="subnet.name" :key="index"></b-form-input></b-col>
            <b-col sm="*" class="mx-1"><b-form-input placeholder="size" type="number" v-model="subnet.size" :key="index"></b-form-input></b-col>
          </b-row>
          </div>
        </template>
        <template v-slot:footer>
          <b-button block variant="success" v-on:click="calc">Calc</b-button>
        </template>
      </b-card>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  name: 'SubnetForm',
  props: {
    majorNetwork: String,
    suffix: Number,
    subnets: String
  },
  data () {
    return {
      subnetForm: []
    }
  },
  watch: {
    subnets: function () {
      let subnets = parseInt(this.subnets)
      this.subnetForm = isNaN(subnets) ? [] : Array.apply(0, Array(subnets)).map(function () { return {'name': '', 'size': 0} })
    }
  },
  methods: {
    calc: function () {
      this.$Store.clearAllAction()
      let majorNetwork = this.majorNetwork + '/' + this.suffix
      let subnets = []
      for (let i in this.subnetForm) {
        subnets.push(this.subnetForm[i].size)
      }
      let network = new this.$Subnet(subnets, majorNetwork, this.$Network)
      this.$Store.setNetworkAction(network)
      this.$Store.setSubnetFormAction(this.subnetForm)
      this.$router.push('subnets')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.gray {
  color: #495057;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
}
</style>
