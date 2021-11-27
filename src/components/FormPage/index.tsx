import { useState } from "react"
import './styles.css'
import AddressesBook from "components/AddressBook"
import MainPage, { Page } from "components/MainPage"

const FormPage = () => {
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)

  const handlePageChange = (page: Page) => {
    setSelectedPage(page)
  }

  const handleAddressSelection = () => {
    setSelectedPage(null)
  }

  const getPage = () => {
    switch (selectedPage) {
      case 'addressBook':
        return <AddressesBook onSelect={handleAddressSelection} />
      case 'addAddress':
        return <></>
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