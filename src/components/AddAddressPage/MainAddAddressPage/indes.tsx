import './styles.css'
import Button from "components/Button"

export type Page = 'findByPostcode' | 'enterAddress'

interface Props {
  onChange: (page: Page) => void
}

const MainAddAddressPage: React.FC<Props> = ({ onChange }) => {
  const handleFindAddressClick = () => {
    onChange('findByPostcode')
  }

  const handleEnterAddressClick = () => {
    onChange('enterAddress')
  }

  return (
    <div className='add-address-options-wrapper'>
      <Button onClick={handleFindAddressClick}>
        Find by postcode
      </Button>
      <p className='or'>Or</p>
      <Button onClick={handleEnterAddressClick}>
        Enter address manually
      </Button>
    </div>
  )
}

export default MainAddAddressPage