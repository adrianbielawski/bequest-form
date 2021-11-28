import { fireEvent, render } from "@testing-library/react"
import { AddressesContext } from "store"
import { CHANGE_SELECTED_ADDRESS, State } from "store/types"
import AddressBook from "."

describe('AddressBook', () => {
  let onExit = jest.fn()
  let onSelect = jest.fn()
  let initialState: State

  beforeEach(() => {
    jest.clearAllMocks()
    initialState = {
      selectedAddress: null,
      addresses: [
        {
          id: '1234',
          firstLine: 'Foo Lane',
          postcode: 'FO0 8AR',
          town: 'Fooville',
          country: 'Fooland',
        }
      ]
    }
  })

  it('dispatches change event when item is selected', () => {
    const context = {
      state: initialState,
      dispatch: jest.fn()
    }
    const { container } = render(
      <AddressesContext.Provider value={context}>
        <AddressBook onExit={onExit} onSelect={onSelect} />
      </AddressesContext.Provider>
    )

    fireEvent.click(container.querySelector('.address-wrapper')!)

    expect(context.dispatch).toHaveBeenCalledWith({
      type: CHANGE_SELECTED_ADDRESS,
      selectedAddress: initialState.addresses[0]
    })
  })

  it('calls onSelect when Select is clicked', () => {
    const context = {
      state: {
        ...initialState,
        selectedAddress: initialState.addresses[0]
      },
      dispatch: jest.fn()
    }

    const { getByText } = render(
      <AddressesContext.Provider value={context}>
        <AddressBook onExit={onExit} onSelect={onSelect} />
      </AddressesContext.Provider>
    )

    fireEvent.click(getByText('Select'))

    expect(onSelect).toHaveBeenCalled()
  })

  it('calls onExit when Exit is clicked', () => {
    const context = {
      state: initialState,
      dispatch: jest.fn()
    }
    const { getByText } = render(
      <AddressesContext.Provider value={context}>
        <AddressBook onExit={onExit} onSelect={onSelect} />
      </AddressesContext.Provider>
    )

    fireEvent.click(getByText('Exit'))

    expect(onExit).toHaveBeenCalled()
  })
})

export { }