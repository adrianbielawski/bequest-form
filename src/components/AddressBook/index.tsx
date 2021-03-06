import { useContext } from "react"
import './styles.css'
import Button from "components/Button"
import AddressItem from "./AddressItem"
import { AddressesContext } from "store"

interface Props {
  onSelect: () => void
  onExit: () => void
}

const AddressBook: React.FC<Props> = ({ onSelect, onExit }) => {
  const { state, dispatch } = useContext(AddressesContext)

  const addressComponents = state.addresses.map(address => {
    const handleClick = () => {
      dispatch({
        type: 'CHANGE_SELECTED_ADDRESS',
        selectedAddress: address,
      })
    }

    const isSelected = state.selectedAddress?.id === address.id

    return (
      <li className='address' key={address.id}>
        <AddressItem
          address={address}
          selected={isSelected}
          onClick={handleClick}
        />
      </li>
    )
  })

  const hasAddresses = state.addresses.length > 0

  return (
    <div className='address-book-wrapper'>
      <ul className='addresses'>
        {hasAddresses ? (
          addressComponents
        ) : (
          <p className='no-addresses'>
            You have no addresses in your address book
          </p>
        )}
      </ul>
      <div className='buttons'>
        <Button onClick={onExit}>
          Exit
        </Button>
        {hasAddresses && (
          <Button
            disabled={!state.selectedAddress}
            onClick={onSelect}
          >
            Select
          </Button>
        )}
      </div>
    </div>
  )
}

export default AddressBook