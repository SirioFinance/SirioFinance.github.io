import { Alert } from '@mui/material'
import useGetUserTokenBalance from '../../../hooks/useGetUserTokenBalance'
import { useInvalidateUserTokenData } from '../../../hooks/useGetUserTokenData'
import useWalletContext from '../../../hooks/useWalletContext'
import { TX_DELAY } from '../../../util/constants'
import Button from '../../Utils/Button'
import ModalListItem from '../ModalListItem'
import { useInvalidateAccount } from '../../../hooks/useGetAccount'
import { getTokenNumber } from '../../../util/tokens'

const Repay = ({ balance, token, userTokenData, value }) => {
  const { data: tokenBalance } = useGetUserTokenBalance(token)
  const { wallet } = useWalletContext()
  const { accountId, processor, provider } = wallet || {}
  const invalidateUserTokenData = useInvalidateUserTokenData(token)
  const invalidateAccount = useInvalidateAccount(accountId)
  const amount = value * 10 ** token.decimal
  const repayFull = balance === value
  const numBlocksSinceLoad =
    ((new Date().getTime() - userTokenData.fetchDate.getTime()) / 1000 / 15) *
    20 // About 20 blocks every 15 seconds
  const finalAmount = repayFull
    ? Math.ceil(amount + userTokenData.bapy * numBlocksSinceLoad)
    : amount

  async function handleRepay() {
    try {
      if (!token.isHbar) {
        await processor.approve(provider, { amount: finalAmount, token })
      }
      await processor.repay(provider, { amount: finalAmount, token })
      setTimeout(() => {
        invalidateUserTokenData()
        invalidateAccount()
      }, TX_DELAY)
    } catch (e) {
      console.log('Unable to repay', e)
    }
  }

  const warning =
    value > balance
      ? "You can't repay more than your borrowed amount."
      : value > tokenBalance
      ? "You can't repay more than your current balance."
      : ''

  const disabled = warning || !parseFloat(value)

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
      {repayFull && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          When repaying your full balance a small extra amount will be sent to
          the contract to ensure the repayment is successful. Full repayment
          amount is <b>{getTokenNumber(token, finalAmount)}</b>
        </Alert>
      )}
      <div className="buttons-container">
        <div className="borrow-buttons">
          <Button
            type="secondary-btn"
            onClick={handleRepay}
            disabled={disabled}
          >
            Repay
          </Button>
        </div>
      </div>
    </>
  )
}

export default Repay
