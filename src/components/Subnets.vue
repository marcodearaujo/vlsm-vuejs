<template>
<b-container>
  <b-button block variant="success" v-on:click="reset">Reset</b-button>
  <b-row align-v="center" align-h="center" v-if="isMobile">
    <b-col>
      <div class="textStart white">
        <div v-for="(subnet, index) in subnets" :key="index" class="mb-2">
          <b-card header-tag="header">
            <template v-slot:header>
                <h5 class="mb-0">Name: {{ subnet.name }}</h5>
                <h6 class="mb-0">Hosts: {{ subnet.hosts }}</h6>
            </template>
            <b-list-group>
              <b-list-group-item button>Network: {{ subnet.network }}</b-list-group-item>
              <b-list-group-item button>First IP: {{ subnet.first_IP }}</b-list-group-item>
              <b-list-group-item button>Last IP: {{ subnet.last_IP }}</b-list-group-item>
              <b-list-group-item button>Broadcast: {{ subnet.broadcast }}</b-list-group-item>
              <b-list-group-item button>Subnet Mask: {{ subnet.mask }}</b-list-group-item>
            </b-list-group>
          </b-card>
        </div>
      </div>
    </b-col>
  </b-row>
  <template v-else>
    <div>
      <b-table striped bordered borderless hover small foot-clone dark :items="subnets"></b-table>
    </div>
  </template>
</b-container>
</template>

<script>
export default {
  name: 'Subnets',
  data () {
    let searchSize = function (nameKey, myArray) {
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].size === nameKey) {
          return myArray[i]
        }
      }
    }

    let isMobile = window.matchMedia('(max-width: 700px)').matches

    let subnets = []
    let networks = this.$sharedState.network.getNetworks() // <----
    let inputs = this.$sharedState.subnetForm // <----
    for (let i in networks) {
      let subnet = networks[i]
      let input = searchSize(subnet.getNeededSize(), inputs)
      let result = {
        name: input.name,
        hosts: subnet.getNeededSize(),
        network: subnet.getNetwork(),
        first_IP: subnet.getFirstIP(),
        last_IP: subnet.getLastIP(),
        broadcast: subnet.getBroadcast(),
        mask: subnet.getSubnetMask()
      }
      subnets.push(result)
    }
    this.$Store.clearAllAction()
    return {
      subnets,
      isMobile
    }
  },
  methods: {
    reset: function () {
      this.$Store.clearAllAction()
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.textStart {
    text-align: start;
}
.white {
  background-color: #ffffff;
}
</style>
