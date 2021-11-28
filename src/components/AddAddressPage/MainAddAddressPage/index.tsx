import './styles.css'
import Button from "components/Button"

export type Page = 'findByPostcode' | 'enterAddress'

interface Props {
  onChange: (page: Page) => void
  onExit: () => void
}

const MainAddAddressPage: React.FC<Props> = ({ onChange, onExit }) => {
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
      <Button className='exit-button' onClick={onExit}>
        Exit
      </Button>
    </div>
  )
}

export default MainAddAddressPage