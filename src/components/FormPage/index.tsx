import { useState } from "react"
import './styles.css'
import MainPage, { Page } from "components/MainPage"
import AddressesBook from "components/AddressBook"
import AddAddressPage from "components/AddAddressPage"

const FormPage = () => {
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)

  const handlePageChange = (page: Page) => {
    setSelectedPage(page)
  }

  const handleExit = () => {
    setSelectedPage(null)
  }

  const getPage = () => {
    switch (selectedPage) {
      case 'addressBook':
        return <AddressesBook onSelect={handleExit} />
      case 'addAddress':
        return <AddAddressPage onExit={handleExit} />
      default:
        return <MainPage onChange={handlePageChange} />
    }
  }

  return (
    <div className='form-page-wrapper'>
      {getPage()}
    </div>
  )
}

export default FormPage