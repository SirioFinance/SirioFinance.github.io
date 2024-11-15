import { Alert, Typography } from '@mui/material'
import { useInvalidateUserTokenData } from '../../../hooks/useGetUserTokenData'
import useWalletContext from '../../../hooks/useWalletContext'
import { TX_DELAY } from '../../../util/constants'
import Button from '../../Utils/Button'
import ModalListItem from '../ModalListItem'
import queryClient from '../../../util/queryClient'
import { useInvalidateAccount } from '../../../hooks/useGetAccount'

const Withdraw = ({ balance, token, userTokenData, value }) => {
  const { wallet } = useWalletContext()
  const { accountId, processor, provider } = wallet || {}
  const invalidateUserTokenData = useInvalidateUserTokenData(token)
  const invalidateAccount = useInvalidateAccount(accountId)
  const amount = value * 10 ** token.decimal

  async function handleWithdraw() {
    try {
      await processor.withdraw(provider, { amount, token })
      setTimeout(() => {
        invalidateUserTokenData()
        invalidateAccount()
        queryClient.invalidateQueries({ queryKey: ['marketData'] })
      }, TX_DELAY)
    } catch (e) {
      console.log('Unable to withdraw', e)
    }
  }

  const warning =
    value > balance ? "You can't withdraw more than you have supplied." : ''

  const disabled = warning || !parseFloat(value)

  return (
    <>
      <div className="popup-info-container">
        <div className="main-info-container">
          <div className="all-info">
            {userTokenData.sapy != 0 && (
              <ModalListItem
                title="Supply APR"
                value={`${userTokenData.sapy}%`}
              />
            )}
            {userTokenData.supply != 0 && (
              <ModalListItem
                title="Collateral Balance"
                value={`${userTokenData.supply}`}
              />
            )}
            {userTokenData.available != 0 && (
              <ModalListItem
                title="Liquidation Risk"
                value={`${userTokenData.available}`}
              />
            )}
            <ModalListItem
              title="Liquidation Risk Used - &gt; Available"
              value={userTokenData.borrow}
            />
          </div>
        </div>
      </div>
      {warning && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {warning}
        </Alert>
      )}
      <div className="buttons-container">
        <div className="supply-buttons">
          <Button
            type="secondary-btn"
            disabled={disabled}
            onClick={handleWithdraw}
          >
            Withdraw
          </Button>
        </div>
      </div>
      <Typography variant="subtitle1">
        Withdraw the supplied assets by filling the form with desired amount and
        clicking on &quot;Withdraw&quot;. If you desire to withdraw your accrued
        interests, go on &quot;Harvest&quot;
      </Typography>
    </>
  )
}

export default Withdraw
