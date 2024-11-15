import { Alert } from '@mui/material'
import { useInvalidateUserTokenData } from '../../../hooks/useGetUserTokenData'
import useWalletContext from '../../../hooks/useWalletContext'
import { TX_DELAY } from '../../../util/constants'
import ModalListItem from '../ModalListItem'
import Button from '../../Utils/Button'
import queryClient from '../../../util/queryClient'
import { useInvalidateAccount } from '../../../hooks/useGetAccount'

const Supply = ({ balance, token, userTokenData, value }) => {
  const { wallet } = useWalletContext()
  const { accountId, processor, provider } = wallet || {}
  const amount = value * 10 ** token.decimal
  const invalidateUserTokenData = useInvalidateUserTokenData(token)
  const invalidateAccount = useInvalidateAccount(accountId)

  async function handleSupply() {
    try {
      if (!token.isHbar) {
        await processor.approve(provider, { amount, token })
      }
      await processor.supply(provider, { amount, token })
      setTimeout(() => {
        invalidateAccount()
        invalidateUserTokenData()
        queryClient.invalidateQueries({ queryKey: ['marketData'] })
      }, TX_DELAY)
    } catch (e) {
      console.log('Unable to supply', e)
    }
  }

  const warning =
    value > balance ? "You can't supply more than your current balance." : ''

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
        <div className="supply-buttons">
          <Button
            type="secondary-btn"
            disabled={disabled}
            onClick={handleSupply}
          >
            Supply
          </Button>
        </div>
      </div>
    </>
  )
}

export default Supply
