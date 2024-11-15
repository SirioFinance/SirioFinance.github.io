import { useState } from 'react'
import './markets.css'
import ModalSearch from '../Modal/ModalSearch'
import useDialog from '../../hooks/useDialog'
import Button from '../Utils/Button'

const MarketsSearch = () => {
  const [searchValue, setSearchValue] = useState('')
  const [value, setValue] = useState('')
  const searchDialogProps = useDialog()

  const onSearch = () => {
    if (searchValue !== '') {
      searchDialogProps.onRequestOpen()
      setValue(searchValue)
    }
  }

  return (
    <>
      <div className="search-container">
        <h2>Individual Stats</h2>
        <div className="search">
          <input
            type="text"
            className="search-input"
            id="search-input"
            placeholder="Search by account"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button onClick={onSearch}>Search</Button>
        </div>
      </div>

      <ModalSearch {...searchDialogProps} value={value} />
    </>
  )
}

export default MarketsSearch
