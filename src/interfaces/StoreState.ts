import type { SubnetFormInterface } from './SubnetForm'

// Define types for the store's state
export interface StoreStateInterface {
  network: string | null
  subnetForm: SubnetFormInterface | null
}
