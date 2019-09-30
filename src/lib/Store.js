var Store = {
  state: {
    network: null,
    subnetForm: null
  },
  setNetworkAction (newValue) {
    this.state.network = newValue
  },
  clearNetworkAction () {
    this.state.network = null
  },
  setSubnetFormAction (newValue) {
    this.state.subnetForm = newValue
  },
  clearSubnetFormAction () {
    this.state.subnetForm = null
  },
  clearAllAction () {
    this.clearNetworkAction()
    this.clearSubnetFormAction()
  }
}

export default Store

