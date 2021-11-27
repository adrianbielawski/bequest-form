import './styles.css'
import Input from "components/Input"
import Button from "components/Button"
import { NewAddress } from 'components/AddressBook/AddressesStore/types'
import React, { useState } from 'react'
import Select from 'components/Select'
import { countries } from './countries'

interface Props {
  onSave: (address: NewAddress) => void
  onExit: () => void
}

const NewAddressForm: React.FC<Props> = ({ onSave, onExit }) => {
  const [formData, setFormData] = useState<NewAddress>({
    firstLine: '',
    secondLine: '',
    thirdLine: '',
    postcode: '',
    town: '',
    country: '',
  })

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData) {
      onSave(formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const getCountries = () => countries.map(country => (
    <option key={country.label}>
      {country.label}
    </option>
  ))

  return (
    <form
      className='new-address-form-wrapper'
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <Input name='firstLine' type='text' placeholder='First line' required />
      <Input name='secondLine' type='text' placeholder='Second line' />
      <Input name='thirdLine' type='text' placeholder='Third line' />
      <Input name='postcode' type='text' placeholder='Postcode' required />
      <Input name='town' type='text' placeholder='Town' required />
      <Select name='country' placeholder='Country' required>
        <option disabled selected hidden value=''>
          Country
        </option>
        {getCountries()}
      </Select>
      <div className='buttons-wrapper'>
        <Button onClick={onExit}>Exit</Button>
        <Button type='submit'>Save</Button>
      </div>
    </form>
  )
}

export default NewAddressForm