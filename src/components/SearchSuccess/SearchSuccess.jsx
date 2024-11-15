import './searchSuccess.css'
import CenterNetStatus from '../CenterNetStatus/CenterNetStatus'
import BalanceStatus from '../BalanceStatus/BalanceStatus'
import AccountId from '../Utils/AccountId'

const SearchSuccess = ({
  address,
  apy,
  supply,
  borrow,
  utilization,
  limit,
}) => {
  return (
    <div className="searchSuccess">
      <h2>
        <AccountId accountId={address} />
      </h2>
      <div className="search-info">
        <CenterNetStatus Apy={apy} secondary={true} />
        <BalanceStatus
          supply={supply}
          utilization={utilization}
          borrow={borrow}
          limit={limit}
        />
      </div>
    </div>
  )
}

export default SearchSuccess
