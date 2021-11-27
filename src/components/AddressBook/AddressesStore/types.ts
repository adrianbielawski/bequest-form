import { Dispatch } from "react"

export const ADD_ADDRESS = 'ADD_ADDRESS'
export const CHANGE_SELECTED_ADDRESS = 'CHANGE_SELECTED_ADDRESS'

export interface AddAddress {
  type: typeof ADD_ADDRESS
  address: NewAddress
}

export interface ChangeSelectedAddress {
  type: typeof CHANGE_SELECTED_ADDRESS
  selectedAddress: Address
}

export type Action = AddAddress | ChangeSelectedAddress

export interface Address {
  id: string
  firstLine: string
  secondLine?: string
  thirdLine?: string
  postcode: string
  town: string
  country: string
}

export type NewAddress = Omit<Address, 'id'>

export interface State {
  selectedAddress: Address | null
  addresses: Address[]
}

export interface AddressesContextType {
  state: State,
  dispatch: Dispatch<Action>
}