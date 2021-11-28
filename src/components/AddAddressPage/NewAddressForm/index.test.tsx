import { fireEvent, render } from "@testing-library/react"
import { NewAddress } from "store/types"
import NewAddressForm from "."

describe('NewAddressForm', () => {
  let onSave: (address: NewAddress) => void
  let onExit: () => void

  beforeEach(() => {
    onSave = jest.fn()
    onExit = jest.fn()
  })

  it('does not call the onSave callback if form is not valid', () => {
    const { getByText } = render(<NewAddressForm onSave={onSave} onExit={onExit} />)

    fireEvent.click(getByText('Save'))

    expect(onSave).not.toHaveBeenCalled()
  })

  it('calls the onSave callback if form is valid', () => {
    const { container, getByText } = render(<NewAddressForm onSave={onSave} onExit={onExit} />)

    // Enter valid data
    fireEvent.change(container.querySelector('[name=firstLine]')!, { target: { value: 'Foo Avenue' } })
    fireEvent.change(container.querySelector('[name=postcode]')!, { target: { value: 'FO0 8AR' } })
    fireEvent.change(container.querySelector('[name=town]')!, { target: { value: 'Fooville' } })
    fireEvent.change(container.querySelector('[name=country]')!, { target: { value: 'Yemen' } })

    fireEvent.click(getByText('Save')!)

    expect(onSave).toHaveBeenCalledWith({
      firstLine: 'Foo Avenue',
      secondLine: '',
      thirdLine: '',
      postcode: 'FO0 8AR',
      town: 'Fooville',
      country: 'Yemen'
    })
  })

  it('calls onExit when exit is clicked', () => {
    const { getByText } = render(<NewAddressForm onSave={onSave} onExit={onExit} />)

    fireEvent.click(getByText('Exit'))

    expect(onExit).toHaveBeenCalled()
  })
})

export { }