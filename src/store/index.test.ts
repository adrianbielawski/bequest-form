import { reducer } from "store"
import { Action, AddAddress, ADD_ADDRESS, ChangeSelectedAddress, CHANGE_SELECTED_ADDRESS, State } from "./types"

describe('reducer', () => {
  let state: State

  beforeEach(() => {
    state = {
      selectedAddress: null,
      addresses: [],
    }
  })

  it('adds new address to store and marks it as selected', () => {
    const action: AddAddress = {
      type: ADD_ADDRESS,
      address: {
        firstLine: 'Foo',
        postcode: 'AB1 2CD',
        town: 'Fooville',
        country: 'Fooland'
      }
    }

    const newState = reducer(state, action)

    const newAddress = {
      id: '0',
      ...action.address
    }

    expect(newState.addresses).toHaveLength(1)
    expect(newState.addresses[0]).toEqual(newAddress)
    expect(newState.selectedAddress).toEqual(newAddress)
  })

  it('sets selected address', () => {
    const action: ChangeSelectedAddress = {
      type: CHANGE_SELECTED_ADDRESS,
      selectedAddress: {
        id: '123',
        firstLine: 'Foo',
        postcode: 'AB1 2CD',
        town: 'Fooville',
        country: 'Fooland'
      }
    }

    const newState = reducer(state, action)

    expect(newState.selectedAddress).toEqual(action.selectedAddress)
  })

  it('throws exception for unknown actions', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
    } as any as Action  // Trick linter into thinking this is OK

    expect(() => reducer(state, action)).toThrow('Invalid Action')
  })
})

export {}