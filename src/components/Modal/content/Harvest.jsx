import { Alert, Typography } from '@mui/material'
import { useInvalidateUserTokenData } from '../../../hooks/useGetUserTokenData'
import useWalletContext from '../../../hooks/useWalletContext'
import { TX_DELAY } from '../../../util/constants'
import Button from '../../Utils/Button'
import ModalListItem from '../ModalListItem'
import { useInvalidateAccount } from '../../../hooks/useGetAccount'

const Harvest = ({ balance, onTxComplete, token, userTokenData, value }) => {
  const { wallet } = useWalletContext()
  const { accountId, processor, provider } = wallet || {}
  const amount = value * 10 ** token.decimal
  const invalidateUserTokenData = useInvalidateUserTokenData(token)
  const invalidateAccount = useInvalidateAccount(accountId)

  async function handleHarvest() {
    try {
      await processor.harvest(provider, { amount, token })
      onTxComplete()
      setTimeout(() => {
        invalidateAccount()
        invalidateUserTokenData()
      }, TX_DELAY)
    } catch (e) {
      console.log('Unable to harvest', e)
    }
  }

  const warning =
    value > balance ? "You can't harvest more than your accumulated value." : ''

  const disabled = !parseFloat(value) || warning

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
            {userTokenData.interest != 0 && (
              <ModalListItem
                title="Claimable Interest"
                value={`${userTokenData.interest}`}
              />
            )}
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
            onClick={handleHarvest}
          >
            Harvest
          </Button>
        </div>
      </div>
      <Typography variant="subtitle1">
        Withdraw the accrued interests by filling the form with desired amount
        and clicking on &quot;Harvest&quot;. If you desire to withdraw your
        supplied assets, go on &quot;Withdraw&quot;.
      </Typography>
    </>
  )
}

export default Harvest
