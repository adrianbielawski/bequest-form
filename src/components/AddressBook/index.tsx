import { useContext } from "react"
import './styles.css'
import Button from "components/Button"
import AddressItem from "./AddressItem/indes"
import { AddressesContext } from "./AddressesStore"

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

  return (
    <div className='address-book-wrapper'>
      <ul className='addresses'>
        {addressComponents}
      </ul>
      <div className='buttons'>
        <Button
          className='exit-button'
          onClick={onExit}
        >
          Exit
        </Button>
        <Button
          className='select-button'
          disabled={!state.selectedAddress}
          onClick={onSelect}
        >
          Select
        </Button>
      </div>
    </div>
  )
}

export default AddressBook