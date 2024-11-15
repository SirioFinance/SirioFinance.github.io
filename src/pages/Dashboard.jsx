import BalanceStatus from '../components/BalanceStatus/BalanceStatus'
import CenterNetStatus from '../components/CenterNetStatus/CenterNetStatus'
import DashboardMarkets from '../components/DashBoardMarkets/DashboardMarkets'
import warningImage from '../assets/warning.png'
import useGetTokens from '../hooks/useGetTokens'
import { useGetUserTokensData } from '../hooks/useGetUserTokenData'
import useWalletContext from '../hooks/useWalletContext'
import useGetUserTotals from '../hooks/useGetUserTotals'

function Dashboard() {
  const { data: tokens } = useGetTokens()
  const { wallet } = useWalletContext()
  const { accountId } = wallet || {}
  const { data: userTokensData, isFetching } = useGetUserTokensData(accountId)
  const userTotals = useGetUserTotals(tokens, userTokensData)

  const {
    borrowAmount = 0,
    borrowLimit = 0,
    utilization = 0,
    netApy = 0,
    supplyAmount = 0,
  } = userTotals

  return (
    <div
      className="content-container dashboard-container"
      style={{
        width: '100%',
        maxWidth: '1400px',
        margin: 'auto',
        padding: '20px',
      }}
    >
      {!isFetching && borrowLimit > 75 && (
        <div
          className="warning-alert"
          style={{
            display: 'flex',
            gap: '30px',
            backgroundColor: 'white',
            padding: '20px 20px',
            borderRadius: '20px',
            alignItems: 'center',
          }}
        >
          <img
            src={warningImage}
            alt={'Warning'}
            className="warning-image"
            style={{ height: '60px' }}
          />
          <div>
            <h2
              style={{
                color: '#a30b13',
                fontFamily: 'Gilroy-SemiBold',
                marginBottom: '5px',
              }}
            >
              Warning
            </h2>
            <p style={{ lineHeight: '30px' }}>
              The Liquidation Risk indicates the health status of your loans. It
              is the ratio between the total dollar value of assets you have
              borrowed and the total dollar value of assets you have supplied.
              Your Liquidation Risk is above 75% and it may be at risk. If you
              don’t repay (even partially) your loan or you don’t supply new
              collateral before your Liquidation Risk raised above 85%, you may
              be subject to liquidation. For more information, visit our{' '}
              <a href="https://astrid.gitbook.io/sirio/technical/liquidation">
                docs
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <CenterNetStatus Apy={netApy} />
      <BalanceStatus
        supply={supplyAmount}
        utilization={utilization}
        borrow={borrowAmount}
        limit={borrowLimit}
      />
      <DashboardMarkets />
    </div>
  )
}

export default Dashboard
