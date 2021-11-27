import { useContext } from "react"
import './styles.css'
import Button from "components/Button"
import AddressItem from "./AddressItem/indes"
import { AddressesContext } from "./AddressesStore"

interface Props {
  onSelect: () => void
}

const AddressBook: React.FC<Props> = ({ onSelect }) => {
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
      <Button
        className='select-button'
        onClick={onSelect}
      >
        Select
      </Button>
    </div>
  )
}

export default AddressBook