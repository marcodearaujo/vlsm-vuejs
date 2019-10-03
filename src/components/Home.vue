<template>
<b-container>
  <b-row class="justify-content-md-center">
    <div>
      <b-input-group>
        <template v-slot:prepend>
          <b-input-group-text>Major Network</b-input-group-text>
        </template>
        <b-form-input v-model="network" v-focus v-on:keyup="validateIp"></b-form-input>

        <template v-slot:append>
          <b-form-select v-model="selected" :options="suffixes" class="gray"></b-form-select>
        </template>

      </b-input-group>

      <b-input-group prepend="Number of Subnets" class="mb-2">
        <b-form-input aria-label="Number of Subnets" type="number" v-model="subnetNum"></b-form-input>
        <b-input-group-append>
        </b-input-group-append>
      </b-input-group>
    </div>
  </b-row>
  <b-row>
    <SubnetForm :majorNetwork="network" :suffix="selected" :subnets="subnetNum" />
  </b-row>
</b-container>
</template>

<script>

import SubnetForm from './SubnetForm'

export default {
  name: 'Home',
  data () {
    return {
      network: null,
      selected: null,
      subnetNum: null,
      suffixes: [{'value': null, 'text': 'Suffix'}].concat(Array.apply(0, Array(32)).map(function (i, y) { return {'value': ++y, 'text': '/' + y} }).slice(7, 30))
    }
  },
  methods: {
    submit () {
      this.$router.push('subnetform')
      return false
    },
    validateIp (event) {
      event.preventDefault()

      let regex = RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)
      let tempIp = (this.network||'').split('.')
      let isValid = false
      let regexKeys = RegExp(/^([a-z0-9]+|\.)$/i)
      let isValidKeys = regexKeys.test(event.key)

      if (!isValidKeys) {
        return
      }

      for (let i in tempIp) {
        isValid = tempIp[i] == '' || regex.test(tempIp[i])
      }

      isValid = isValid && tempIp.length <= 4

      if (!isValid) {
        this.network = this.network.slice(0,-1)
        return
      }
    }
  },
  components: {
    SubnetForm
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
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
