import { Alert, Typography } from '@mui/material'
import useGetUserTokenBalance from '../../../hooks/useGetUserTokenBalance'
import Button from '../../Utils/Button'
import ModalListItem from '../ModalListItem'

const Borrow = ({ balance, onBorrow, token, userTokenData, value }) => {
  const { data: tokenBalance } = useGetUserTokenBalance(token)

  const warning =
    value > balance ? "You can't borrow more than your limit." : ''

  return (
    <>
      <div className="popup-info-container">
        <div className="main-info-container">
          <div className="all-info">
            {userTokenData.bapy != 0 && (
              <ModalListItem
                title="Borrow APR"
                value={`${userTokenData.bapy}%`}
              />
            )}
            {tokenBalance != 0 && (
              <ModalListItem title="Wallet Balance" value={`${tokenBalance}`} />
            )}
            {userTokenData.available != 0 && (
              <ModalListItem
                title="Liquidation Risk"
                value={`${userTokenData.available}`}
              />
            )}
            <ModalListItem title="Borrow Usage" value={userTokenData.borrow} />
          </div>
        </div>
      </div>
      {warning && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {warning}
        </Alert>
      )}
      <div className="buttons-container">
        <div className="borrow-buttons">
          <Button
            type="secondary-btn"
            disabled={!parseFloat(value) || warning}
            onClick={onBorrow}
          >
            Borrow
          </Button>
        </div>
      </div>
      <Typography variant="subtitle1">
        Borrow this asset by filling the form with the amount you wish to borrow
        and clicking on &quot;Borrow&quot;.
      </Typography>
    </>
  )
}

export default Borrow
