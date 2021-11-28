import axios from 'axios'
import { fireEvent, render, screen } from "@testing-library/react"
import FindByPostcode from "."
import { act } from 'react-dom/test-utils'

jest.mock('axios')

describe('FinByPostcode', () => {
  let onSave = jest.fn()
  let onExit = jest.fn()

  const validResponse = {
    data: {
      postcode: 'FO0 8AR',
      addresses: [
        {
          line_1: 'Foo',
          line_2: '',
          line_3: '',
          town_or_city: 'Fooville',
          country: 'Fooland'
        },
        {
          line_1: 'Bar',
          line_2: '',
          line_3: '',
          town_or_city: 'Barburgh',
          country: 'Barland'
        },
      ]
    }
  }

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('does not call the onSave callback if no address is selected', () => {
    const { getByText } = render(<FindByPostcode onSave={onSave} onExit={onExit} />)

    fireEvent.click(getByText('Save'))

    expect(onSave).not.toHaveBeenCalled()
  })

  it('renders error message when incorrect postcode is entered', async () => {
    (axios.get as jest.Mock).mockRejectedValue({ response: { status: 400 } })

    await act(async () => {
      const { container, getByText } = render(<FindByPostcode onSave={onSave} onExit={onExit} />)

      fireEvent.change(container.querySelector('[name=postcode]')!, { target: { value: 'INVALID' } })
      fireEvent.click(getByText('Find'))
    })

    // Error message present
    expect(() => screen.getByText('Invalid postcode')).not.toThrow()
  })

  it('renders addresses when correct postcode is entered', async () => {
    (axios.get as jest.Mock).mockResolvedValue(validResponse)

    const { container, getByText } = render(<FindByPostcode onSave={onSave} onExit={onExit} />)

    fireEvent.change(container.querySelector('[name=postcode]')!, { target: { value: 'VALID' } })

    await act(async () => {
      fireEvent.click(getByText('Find'))
    })

    // No error message present
    expect(() => screen.getByText('Invalid postcode')).toThrow()

    const list = screen.getByTestId('addresses-list')
    const addresses = Array.from(list.querySelectorAll('li')).map(
      (address: HTMLLIElement) => address.textContent
    )
    expect(addresses).toEqual([
      'Foo, FO0 8AR, Fooville, Fooland',
      'Bar, FO0 8AR, Barburgh, Barland',
    ])
  })

  it('selecting an address hides the list and enables the save button', async () => {
    (axios.get as jest.Mock).mockResolvedValue(validResponse)

    const { container, getByText } = render(<FindByPostcode onSave={onSave} onExit={onExit} />)

    fireEvent.change(container.querySelector('[name=postcode]')!, { target: { value: 'VALID' } })

    await act(async () => {
      fireEvent.click(getByText('Find'))
    })

    fireEvent.click(getByText('Foo, FO0 8AR, Fooville, Fooland'))

    // List is gone
    expect(() => screen.getByTestId('addresses-list')).toThrow()
    expect(getByText('Save').hasAttribute('disabled')).toBe(false)
  })

  it('calls the onSave callback when save is clicked', async () => {
    (axios.get as jest.Mock).mockResolvedValue(validResponse)

    const { container, getByText } = render(<FindByPostcode onSave={onSave} onExit={onExit} />)

    fireEvent.change(container.querySelector('[name=postcode]')!, { target: { value: 'VALID' } })

    await act(async () => {
      fireEvent.click(getByText('Find'))
    })

    fireEvent.click(getByText('Foo, FO0 8AR, Fooville, Fooland'))

    fireEvent.click(getByText('Save'))

    expect(onSave).toHaveBeenCalledWith({
      firstLine: 'Foo',
      secondLine: '',
      thirdLine: '',
      postcode: 'FO0 8AR',
      town: 'Fooville',
      country: 'Fooland'
    })
  })

  it('calls onExit when exit is clicked', () => {
    const { getByText } = render(<FindByPostcode onSave={onSave} onExit={onExit} />)

    fireEvent.click(getByText('Exit'))

    expect(onExit).toHaveBeenCalled()
  })
})

export { }