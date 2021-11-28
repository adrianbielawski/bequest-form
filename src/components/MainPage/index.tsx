import { useContext } from "react"
import './styles.css'
import Button from "components/Button"
import { AddressesContext } from "store"
import AddressItem from "components/AddressBook/AddressItem"

export type Page = 'addressBook' | 'addAddress'

interface Props {
  onChange: (page: Page) => void
}

const MainPage: React.FC<Props> = ({ onChange }) => {
  const { state } = useContext(AddressesContext)

  const handleAddressBookClick = () => {
    onChange('addressBook')
  }

  const handleAddClick = () => {
    onChange('addAddress')
  }

  return (
    <div className='main-page-wrapper'>
      {state.selectedAddress && (
        <div className='selected-address'>
          <AddressItem
            address={state.selectedAddress}
            selected={true}
          />
        </div>
      )}
        <Button onClick={handleAddressBookClick}>
          Select from address book
        </Button>
        <p className='or'>Or</p>
        <Button onClick={handleAddClick}>
          Add new address
        </Button>
    </div>
  )
}

export default MainPage