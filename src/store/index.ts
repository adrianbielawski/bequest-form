import { createContext } from 'react'
import { cloneDeep } from 'lodash'
import { Action, AddressesContextType, ADD_ADDRESS, CHANGE_SELECTED_ADDRESS, State } from './types'

export const initialState: State = {
  selectedAddress: null,
  addresses: [],
}

const initialContext: AddressesContextType = {
  state: initialState,
  dispatch: () => {}
}

export const AddressesContext = createContext(initialContext)

export const reducer = (state: State, action: Action) => {
  const newState = cloneDeep(state);
  switch (action.type) {
    case ADD_ADDRESS:
      const address = {
        id: String(newState.addresses.length),
        ...action.address,
      }
      
      newState.addresses.push(address)
      newState.selectedAddress = address
      return newState
    case CHANGE_SELECTED_ADDRESS:
      newState.selectedAddress = action.selectedAddress
      return newState;
    default:
      throw new Error('Invalid Action');
  }
}