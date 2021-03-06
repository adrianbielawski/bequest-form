import './styles.css'

interface Props {
  onClick: () => void
}

const ResultItem: React.FC<Props> = ({ children, onClick }) => {

  return (
    <li
      className='result-item-wrapper'
      onClick={onClick}
    >
      {children}
    </li>
  )
}

export default ResultItem