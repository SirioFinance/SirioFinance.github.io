import { useCallback, useEffect, useMemo, useState } from 'react'
import ModalDashboard from './ModalDashboard'
import ConnectedDialog from '../Utils/ConnectedDialog'
import Supply from './content/Supply'
import Withdraw from './content/Withdraw'
import Harvest from './content/Harvest'
import useGetUserTokenBalance from '../../hooks/useGetUserTokenBalance'

const HARVEST_TAB = 'harvest'
const SUPPLY_TAB = 'supply'
const WITHDRAW_TAB = 'withdraw'

const DEFAULT_STATE = {
  amount: 0,
  tab: SUPPLY_TAB,
}

export default function ModalSupply({ onClose, open, token, userTokenData }) {
  const [state, setState] = useState(DEFAULT_STATE)
  const { amount, tab } = state
  const { data: tokenBalance } = useGetUserTokenBalance(token)

  const wrappedOnClose = useCallback(() => {
    setState((prev) => ({ ...prev, amount: '' }))
    onClose()
  }, [onClose])

  const balance = useMemo(() => {
    let balance = 0
    if (userTokenData) {
      if (tab === SUPPLY_TAB) {
        balance = tokenBalance
      } else if (tab === HARVEST_TAB) {
        balance = userTokenData.interest
      } else {
        balance = userTokenData.w_available
      }
    }

    return balance
  }, [tab, tokenBalance, userTokenData])

  useEffect(() => {
    setState((prev) => ({ ...prev, amount: '' }))
  }, [tab])

  function handleInputChange(amount) {
    if (amount >= 0) {
      setState((prev) => ({ ...prev, amount }))
    }
  }

  function handleTxComplete() {
    setState((prev) => ({ ...prev, amount: 0 }))
  }

  return (
    <ConnectedDialog open={open} onClose={wrappedOnClose}>
      <div className="popup-markets-container show">
        <div className="asset-info">
          <img src={token.icon} alt="" />
          <h4>{token.name}</h4>
        </div>
        <div className="popup-options supply-popup supply-active active">
          <div className="options-buttons supply-options">
            <button
              onClick={() => setState((prev) => ({ ...prev, tab: SUPPLY_TAB }))}
              style={{
                borderBottom: tab === SUPPLY_TAB ? '3px solid #3251bf' : 'none',
              }}
            >
              Supply
            </button>
            <button
              onClick={() =>
                setState((prev) => ({ ...prev, tab: HARVEST_TAB }))
              }
              style={{
                borderBottom:
                  tab === HARVEST_TAB ? '3px solid #3251bf' : 'none',
              }}
            >
              Harvest
            </button>
            <button
              onClick={() =>
                setState((prev) => ({ ...prev, tab: WITHDRAW_TAB }))
              }
              style={{
                borderBottom:
                  tab === WITHDRAW_TAB ? '3px solid #3251bf' : 'none',
              }}
            >
              Withdraw
            </button>
          </div>
          <div className="popup-info-container">
            <div className="main-info-container">
              <ModalDashboard
                amount={amount}
                balance={balance}
                hbarBuffer={tab === SUPPLY_TAB}
                onChange={handleInputChange}
                token={token}
              />
            </div>
          </div>
          {tab === HARVEST_TAB && (
            <Harvest
              balance={balance}
              onTxComplete={handleTxComplete}
              token={token}
              userTokenData={userTokenData}
              value={amount}
            />
          )}
          {tab === SUPPLY_TAB && (
            <Supply
              balance={balance}
              token={token}
              userTokenData={userTokenData}
              value={amount}
            />
          )}
          {tab === WITHDRAW_TAB && (
            <Withdraw
              balance={balance}
              token={token}
              userTokenData={userTokenData}
              value={amount}
            />
          )}
        </div>
      </div>
    </ConnectedDialog>
  )
}
