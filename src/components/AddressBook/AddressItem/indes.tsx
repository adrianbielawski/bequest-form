import classNames from "classnames"
import { Address } from "../AddressesStore/types"
import './styles.css'

interface Props {
  address: Address
  selected: boolean
  onClick?: () => void
}

const AddressItem: React.FC<Props> = ({ address, selected, onClick }) => {
  const addressItemClass = classNames(
    'address-wrapper',
    {
      selected,
    },
  )

  return (
    <ul
      className={addressItemClass}
      onClick={onClick}
    >
      <li>First line: {address.firstLine}</li>
      {address.secondLine && (
        <li>Second line: {address.secondLine}</li>
      )}
      {address.thirdLine && (
        <li>Third line: {address.thirdLine}</li>
      )}
      <li>Postcode: {address.postcode}</li>
      <li>Town: {address.town}</li>
      <li>Country: {address.country}</li>
    </ul>
  )
}

export default AddressItem