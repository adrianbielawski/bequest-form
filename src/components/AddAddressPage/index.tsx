import { useState } from "react"
import './styles.css'
import MainAddAddressPage, { Page } from "./MainAddAddressPage/indes"

const AddAddressPage = () => {
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)

  const handlePageChange = (page: Page) => {
    setSelectedPage(page)
  }

  const getPage = () => {
    switch (selectedPage) {
      case 'findByPostcode':
        return <div>find by postcode</div>
      case 'enterAddress':
        return <div>enter address</div>
      default:
        return <MainAddAddressPage onChange={handlePageChange}/>
    }
  }

  return (
    <div className='add-address-page-wrapper'>
      {getPage()}
    </div>
  )
}

export default AddAddressPage