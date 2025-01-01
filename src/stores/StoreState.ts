import { reactive } from 'vue'
import type { StoreStateInterface, SubnetFormInterface } from '@/interfaces'

// Create the reactive store
const store = reactive<StoreStateInterface>({
  network: '',
  subnetForm: { name: '', size: 0 },
})

// Define store actions to mutate the state
export const useStore = () => {
  const setNetworkAction = (newValue: string | null) => {
    store.network = newValue
  }

  const clearNetworkAction = () => {
    store.network = null
  }

  const setSubnetFormAction = (newValue: SubnetFormInterface) => {
    store.subnetForm = newValue
  }

  const clearSubnetFormAction = () => {
    store.subnetForm = null
  }

  const clearAllAction = () => {
    clearNetworkAction()
    clearSubnetFormAction()
  }

  return {
    state: store,
    setNetworkAction,
    clearNetworkAction,
    setSubnetFormAction,
    clearSubnetFormAction,
    clearAllAction,
  }
}
