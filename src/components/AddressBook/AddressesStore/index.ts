import { createContext } from 'react'
import { cloneDeep } from 'lodash'
import { Action, AddressesContextType, ADD_ADDRESS, CHANGE_SELECTED_ADDRESS, State } from './types'

export const initialState: State = {
  selectedAddress: null,
  addresses: [
    {
      id: '0',
      firstLine: 'Flat 100',
      secondLine: 'Old Kent Road',
      thirdLine: '',
      postcode: 'SE5 0FG',
      town: 'London',
      country: 'England',
    },
  ],
}

const initialContext: AddressesContextType = {
  state: initialState,
  dispatch: () => {}
}

export const AddressesContext = createContext(initialContext)

export const reducer = (state: State, action: Action) => {
  let newState = cloneDeep(state);
  switch (action.type) {
    case ADD_ADDRESS:
      newState.addresses.push(action.address)
      return newState
    case CHANGE_SELECTED_ADDRESS:
      newState.selectedAddress = action.selectedAddress
      return newState;
    default:
      throw new Error();
  }
}