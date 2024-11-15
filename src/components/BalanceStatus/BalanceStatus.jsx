import Help from '../Utils/Help.jsx'
import ProgressBar from '../ProgressBar.jsx'
import './balanceStatus.css'
import { Box } from '@mui/material'
import { toDecimal } from '../../util/numbers.js'

export default function BalanceStatus({ supply, utilization, borrow, limit }) {
  const title = (
    <span>
      The Liquidation Risk indicates the health status of your loans. It is the
      ratio between the total dollar value of assets you have borrowed and the
      total dollar value of assets you have supplied. When it reaches 75%, you
      are alerted to a potential risk; when it exceeds 85%, your account may be
      subject to liquidation. For more information, visit our{' '}
      <a href="https://astrid.gitbook.io/sirio/technical/liquidation">docs</a>.
    </span>
  )

  return (
    <div className="balance-status">
      <div className="balance-container">
        <div className="supply-blc-container">
          <p>Collateral Balance</p>
          <p className="balance">${toDecimal(supply)}</p>
        </div>
        <div className="collateral-blc-container">
          <p>Utilization Rate</p>
          <p className="balance">{toDecimal(utilization)}%</p>
        </div>
        <div className="borrow-blc-container">
          <p>Borrow Balance</p>
          <p className="balance">${toDecimal(borrow)}</p>
        </div>
      </div>
      <Box alignItems="center" display="flex" mt={2} width="100%">
        <Box alignItems="center" display="flex" mr={1} whiteSpace="nowrap">
          <Help title={title} />
          Liquidation Risk: {limit ? toDecimal(limit) : 0}%
        </Box>
        <Box mr={1} width="100%">
          <ProgressBar progressPercentage={limit} height={6} threshold={true} />
        </Box>
      </Box>
    </div>
  )
}
