import Button from '../Utils/Button'
import './searchFailed.css'

const SearchFailed = ({ address, closeBtn }) => {
  return (
    <div className="searchFailed">
      <h2>{address}</h2>
      <p className="icon">&#10060;</p>
      <p>
        No address found. You submitted a wrong address or this address has no
        open positions on Sirio.
      </p>
      <Button type="secondary-btn" onClick={closeBtn}>
        Go Back
      </Button>
    </div>
  )
}

export default SearchFailed
