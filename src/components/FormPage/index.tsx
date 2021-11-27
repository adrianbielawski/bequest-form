import { useState } from "react"
import './styles.css'
import Button from "components/Button"

type SelectedOption = 'addressBook' | 'addAddress'

const FormPage = () => {
  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(null)

  const handleAddressBookClick = () => {
    setSelectedOption('addressBook')
  }

  const handleAddClick = () => {
    setSelectedOption('addAddress')
  }

  const getOptionPage = () => {
    switch (selectedOption) {
      case 'addressBook':
        return <></>
      case 'addAddress':
        return <></>
    }
  }

  return (
    <div className='form-page-wrapper'>
      {selectedOption ? (
        getOptionPage()
      ) : (
        <div className='buttons-wrapper'>
          <Button onClick={handleAddressBookClick}>
            Select from address book
          </Button>
          <p className='or'>Or</p>
          <Button onClick={handleAddClick}>
            Add new address
          </Button>
        </div>
      )}
    </div>
  )
}

export default FormPage