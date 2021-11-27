import './styles.css'
import axios from 'axios'
import Button from "components/Button"
import Input from 'components/Input'
import { NewAddress } from 'components/AddressBook/AddressesStore/types'
import React, { useState } from 'react'

const GET_ADDRESS_URL = 'https://api.getAddress.io/find'
const GET_ADDRESS_API_KEY = process.env.REACT_APP_GET_ADDRESS_API_KEY

interface Props {
  onExit: () => void
  onSave: (address: NewAddress) => void
}

const FindByPostcode: React.FC<Props> = ({ onExit, onSave }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [addresses, setAddresses] = useState<string[] | null>(null)

  const handleFindClick = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const input = new FormData(e.target as HTMLFormElement).get('postcode') as string
    const url = `${GET_ADDRESS_URL}/${encodeURIComponent(input)}`

    axios.get(url, {
      params: {
        'api-key': GET_ADDRESS_API_KEY,
        sort: true,
      }
    }).then(response => {
      setAddresses(response.data.addresses)
      console.log(response)
    }).catch(error => {
      let errorMessage = 'Somethig went wrong, please try again'

      if (!error) {
        errorMessage = 'No internet connection, please try again'
      }
      if (error?.response?.status === 400) {
        errorMessage = 'Invalid postcode'
      }

      setErrorMessage(errorMessage)
    })
  }

  const handleSave = () => {
    // onSave()
  }

  return (
    <div className='find-by-postcode-wrapper'>
      <form onSubmit={handleFindClick}>
        <Input
          name='postcode'
          placeholder='Enter postcode'
          required
        />
        <Button type='submit'>Find</Button>
      </form>
      {errorMessage && (
        <p className='error-message'>
          {errorMessage}
        </p>
      )}
      <div className='buttons'>
        <Button onClick={onExit}>Exit</Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  )
}

export default FindByPostcode