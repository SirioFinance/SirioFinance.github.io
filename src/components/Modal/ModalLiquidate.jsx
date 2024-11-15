import { useMemo } from 'react'
import useGetTokens from '../../hooks/useGetTokens'
import { useGetUserTokensData } from '../../hooks/useGetUserTokenData'
import queryClient from '../../util/queryClient'
import ConnectedDialog from '../Utils/ConnectedDialog'
import useWalletContext from '../../hooks/useWalletContext'
import { TX_DELAY } from '../../util/constants'
import { useInvalidateAccount } from '../../hooks/useGetAccount'
import useGetUserTotals from '../../hooks/useGetUserTotals'

export default function ModalLiquidate({
  debt,
  borrower,
  onClose,
  open,
  rewards,
  rewardAssets,
}) {
  const { data: tokens } = useGetTokens()
  const { wallet } = useWalletContext()
  const { accountId, processor, provider } = wallet || {}
  const { data: userTokensData } = useGetUserTokensData(accountId)
  const invalidateAccount = useInvalidateAccount(accountId)
  const userTotals = useGetUserTotals(tokens, userTokensData)

  const amounts = useMemo(() => {
    const updatedAmounts = {}
    if (userTotals) {
      tokens.forEach(({ name }) => {
        const { price } = userTokensData[name]
        if (userTotals.supplyAmount > debt) {
          updatedAmounts[name] = debt / price
        }
      })
    }

    return updatedAmounts
  }, [debt, userTotals])

  async function liquidateHandler(token, reward) {
    try {
      await processor.liquidation(provider, { amount: reward, borrower, token })
      setTimeout(async () => {
        invalidateAccount()
        queryClient.invalidateQueries({ queryKey: ['liquidateData'] })
        queryClient.invalidateQueries({ queryKey: ['marketData'] })
        queryClient.invalidateQueries({ queryKey: ['userTokenData'] })
      }, TX_DELAY)
    } catch (e) {
      console.log('Unable to liquidate', e)
    }
  }

  const sum = Object.entries(amounts).reduce(
    (value, amount) => value + amount,
    0
  )

  return (
    <ConnectedDialog open={open} onClose={onClose}>
      <div className="liquidation-modal">
        <h3>Choose Asset to Liquidate</h3>
        <div className="wallets-container">
          {rewardAssets.map((rewardAsset, index) => {
            const token = tokens.find(({ name }) => name === rewardAsset)
            const amount = amounts[token.name] || 0
            return amount > 0 ? (
              <button
                key={token.id}
                onClick={() => liquidateHandler(token, rewards[index])}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', marginLeft: '5px' }}>
                  <img
                    src={token.icon}
                    alt={token.name}
                    style={{ marginRight: '10px' }}
                  />
                  <p>{token.name}</p>
                </div>
                <p>{Math.floor(amount * 1000) / 1000}</p>
              </button>
            ) : (
              ''
            )
          })}

          {sum <= 0 && (
            <p>
              You don&apos;t have enough assets supplied to liquidate this loan
            </p>
          )}
        </div>
      </div>
    </ConnectedDialog>
  )
}
