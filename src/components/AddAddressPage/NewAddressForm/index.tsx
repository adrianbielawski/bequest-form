import './styles.css'
import Input from "components/Input"
import Button from "components/Button"
import { NewAddress } from 'store/types'
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
    if (validateForm()) {
      onSave(formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateForm = () => {
    if (
      !formData.firstLine.length
      || !formData.postcode.length
      || !formData.town.length
      || !formData.country.length
    ) {
      return false
    }

    return true
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
      <Input name='firstLine' type='text' placeholder='First line' required indicateRequired />
      <Input name='secondLine' type='text' placeholder='Second line' />
      <Input name='thirdLine' type='text' placeholder='Third line' />
      <Input name='postcode' type='text' placeholder='Postcode' required indicateRequired />
      <Input name='town' type='text' placeholder='Town' required indicateRequired />
      <Select name='country' placeholder='Country' required indicateRequired defaultValue=''>
        <option disabled hidden value=''>
          Country
        </option>
        {getCountries()}
      </Select>
      <p className='required-text'>
        * Required fields
      </p>
      <div className='buttons-wrapper'>
        <Button onClick={onExit}>Exit</Button>
        <Button
          type='submit'
          disabled={!validateForm()}
        >
          Save
        </Button>
      </div>
    </form>
  )
}

export default NewAddressForm