import { useContext, useState } from "react"
import './styles.css'
import MainAddAddressPage, { Page } from "./MainAddAddressPage"
import NewAddressForm from "./NewAddressForm"
import { ADD_ADDRESS, NewAddress } from "store/types"
import { AddressesContext } from "store/index"
import FindByPostcode from "./FindByPostcode"

interface Props {
  onExit: () => void
}

const AddAddressPage: React.FC<Props> = ({ onExit }) => {
  const { dispatch } = useContext(AddressesContext)
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)

  const handlePageChange = (page: Page) => {
    setSelectedPage(page)
  }

  const handleExit = () => {
    setSelectedPage(null)
  }

  const addNewAddress = (address: NewAddress) => {
    dispatch({ type: ADD_ADDRESS, address })
    setSelectedPage(null)
    onExit()
  }

  const getPage = () => {
    switch (selectedPage) {
      case 'findByPostcode':
        return (
          <FindByPostcode
            onSave={addNewAddress}
            onExit={handleExit}
          />
        )
      case 'enterAddress':
        return (
          <NewAddressForm
            onSave={addNewAddress}
            onExit={handleExit}
          />
        )
      default:
        return (
          <MainAddAddressPage
            onChange={handlePageChange}
            onExit={onExit}
          />
        )
    }
  }

  return (
    <div className='add-address-page-wrapper'>
      {getPage()}
    </div>
  )
}

export default AddAddressPage