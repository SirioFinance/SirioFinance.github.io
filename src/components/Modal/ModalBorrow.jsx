import { useCallback, useEffect, useState } from 'react'
import ModalDashboard from './ModalDashboard'
import Borrow from './content/Borrow'
import Repay from './content/Repay'
import Risk from './content/Risk'
import ConnectedDialog from '../Utils/ConnectedDialog'
import useWalletContext from '../../hooks/useWalletContext'
import { TX_DELAY } from '../../util/constants'
import queryClient from '../../util/queryClient'
import { useInvalidateAccount } from '../../hooks/useGetAccount'

const BORROW_TAB = 'borrow'
const REPAY_TAB = 'repay'

const DEFAULT_STATE = {
  amount: 0,
  balance: 0,
  event: null,
  tab: BORROW_TAB,
}

export default function ModalBorrow({ onClose, open, token, userTokenData }) {
  const [state, setState] = useState(DEFAULT_STATE)
  const { amount, balance, event, tab } = state
  const { wallet } = useWalletContext()
  const { accountId, processor, provider } = wallet || {}
  const invalidateAccount = useInvalidateAccount(accountId)

  const wrappedOnClose = useCallback(() => {
    setState((prev) => ({ ...prev, amount: '' }))
    onClose()
  }, [onClose])

  const executeBorrow = async () => {
    try {
      const value = amount * 10 ** token.decimal
      await processor.borrow(provider, { amount: value, token })
      setState((prev) => ({ ...prev, amount: 0, event: null }))
      setTimeout(() => {
        invalidateAccount()
        queryClient.invalidateQueries({ queryKey: ['userTokenData'] })
        queryClient.invalidateQueries({ queryKey: ['marketData'] })
      }, TX_DELAY)
    } catch (e) {
      console.log('Unable to borrow', e)
    }
  }

  useEffect(() => {
    let balance = 0
    if (userTokenData) {
      if (tab === BORROW_TAB) {
        balance =
          Math.floor(userTokenData.available * 10 ** (token.decimal - 1)) /
          10 ** (token.decimal - 1)
      } else {
        balance =
          Math.round(userTokenData.borrow * 10 ** token.decimal) /
          10 ** token.decimal
      }
    }

    setState((prev) => ({ ...prev, amount: '', balance }))
  }, [tab, token, userTokenData])

  function handleInputChange(amount) {
    if (amount >= 0) {
      setState((prev) => ({ ...prev, amount }))
    }
  }

  const handleBorrow = async () => {
    // TODO: Make this ID in config
    if (token.name === 'USDC' && !event) {
      setState((prev) => ({ ...prev, event: 'risk' }))
    } else {
      await executeBorrow()
    }
  }

  return (
    <ConnectedDialog open={open} onClose={wrappedOnClose}>
      {event ? (
        <Risk
          onContinue={executeBorrow}
          onGoBack={() => setState((prev) => ({ ...prev, event: null }))}
        />
      ) : (
        <div className="popup-markets-container show">
          <div className="asset-info">
            <img src={token.icon} alt={token.name} />
            <h4>{token.name}</h4>
          </div>
          <div className="popup-options borrow-popup borrow-active active">
            <div className="options-buttons supply-options">
              <button
                onClick={() =>
                  setState((prev) => ({ ...prev, tab: BORROW_TAB }))
                }
                style={{
                  borderBottom:
                    tab === BORROW_TAB ? '3px solid #3251bf' : 'none',
                }}
              >
                Borrow
              </button>
              <button
                onClick={() =>
                  setState((prev) => ({ ...prev, tab: REPAY_TAB }))
                }
                style={{
                  borderBottom: tab === 'repay' ? '3px solid #3251bf' : 'none',
                }}
              >
                Repay
              </button>
            </div>
            <div className="popup-info-container">
              <div className="main-info-container">
                <ModalDashboard
                  amount={amount}
                  balance={balance}
                  onChange={handleInputChange}
                  token={token}
                />
              </div>
            </div>
            {tab === BORROW_TAB && (
              <Borrow
                balance={balance}
                onBorrow={handleBorrow}
                token={token}
                userTokenData={userTokenData}
                value={amount}
              />
            )}
            {tab === REPAY_TAB && (
              <Repay
                balance={balance}
                token={token}
                userTokenData={userTokenData}
                value={amount}
              />
            )}
          </div>
        </div>
      )}
    </ConnectedDialog>
  )
}
