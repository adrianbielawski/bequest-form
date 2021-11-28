import './styles.css'
import axios from 'axios'
import Button from "components/Button"
import Input from 'components/Input'
import { NewAddress } from 'components/AddressBook/AddressesStore/types'
import React, { useState } from 'react'
import ResultItem from './ResultItem'

const GET_ADDRESS_URL = 'https://api.getAddress.io/find'
const GET_ADDRESS_API_KEY = process.env.REACT_APP_GET_ADDRESS_API_KEY

interface GetAddressResponse {
  postcode: string,
  latitude: number
  longitude: number
  addresses: {
    formatted_address: string[]
    thoroughfare: string
    building_name: string
    sub_building_name: string
    sub_building_number: string
    building_number: string
    line_1: string
    line_2: string
    line_3: string
    line_4: string
    locality: string
    town_or_city: string
    county: string
    district: string
    country: string
  }[]
}

interface Props {
  onExit: () => void
  onSave: (address: NewAddress) => void
}

const FindByPostcode: React.FC<Props> = ({ onExit, onSave }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [addresses, setAddresses] = useState<NewAddress[] | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<NewAddress | null>(null)

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const postcode = new FormData(e.target as HTMLFormElement).get('postcode') as string
    const url = `${GET_ADDRESS_URL}/${encodeURIComponent(postcode)}`

    axios.get<GetAddressResponse>(url, {
      params: {
        'api-key': GET_ADDRESS_API_KEY,
        sort: true,
        expand: true,
      }
    }).then((response) => {
      const addresses = response.data.addresses
      const formattedAddresses = addresses.map(address => ({
        firstLine: address.line_1,
        secondLine: address.line_2,
        thirdLine: address.line_3,
        postcode: response.data.postcode,
        town: address.town_or_city,
        country: address.country,
      }))

      setAddresses(formattedAddresses)
      setSelectedAddress(null)
      if (errorMessage) {
        setErrorMessage('')
      }
    }).catch(error => {
      let errorMessage = 'Somethig went wrong, please try again'

      if (!error) {
        errorMessage = 'No internet connection, please try again'
      }
      if (error?.response?.status === 400) {
        errorMessage = 'Invalid postcode'
      }

      setErrorMessage(errorMessage)
      setAddresses(null)
      setSelectedAddress(null)
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (e.target.value.length === 0) {
      setAddresses(null)
    }
  }

  const parseAddress = (address: NewAddress) => {
    return Object.values(address)
      .filter(a => a.length > 0)
      .join(', ')
      .replace(' ,', '')
  }

  const getAddresses = () => addresses?.map((address, index) => {
    const hancleClick = () => {
      setSelectedAddress(address)
    }

    return (
      <ResultItem onClick={hancleClick} key={index}>
        {parseAddress(address)}
      </ResultItem>
    )
  })

  const handleSave = () => {
    if (!selectedAddress) return
    onSave(selectedAddress)
  }

  return (
    <div className='find-by-postcode-wrapper'>
      <div className='form-wrapper'>
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <Input
            name='postcode'
            placeholder='Enter postcode'
            required
          />
          <Button type='submit'>Find</Button>
        </form>
        {(addresses && !selectedAddress) && (
          <ul className='addresses'>
            {getAddresses()}
          </ul>
        )}
      </div>
      {errorMessage && (
        <p className='error-message'>
          {errorMessage}
        </p>
      )}
      {selectedAddress && (
        <p className='selected-address'>
          {parseAddress(selectedAddress)}
        </p>
      )}
      <div className='buttons'>
        <Button onClick={onExit}>Exit</Button>
        <Button
          disabled={!selectedAddress}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default FindByPostcode