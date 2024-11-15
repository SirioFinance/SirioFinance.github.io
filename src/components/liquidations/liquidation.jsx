import './liquidation.css'
import MarketStatusContainer from '../MarketStatusContainer/MarketStatusContainer'
import LiquidationListItem from './LiquidationListItem'
import useGetLiquidateData from '../../hooks/useGetLiquidateData'
import SearchLoading from '../SearchLoading/SearchLoading'

function Liquidation() {
  const { data: liquidateData, isPending: liquidateIsPending } =
    useGetLiquidateData()

  return (
    <div className="content-container liquidations-container">
      <div className="liquidation-inner-container">
        <h3 className="liquidation-header">Liquidations Manager</h3>
        <MarketStatusContainer title="Liquidation Markets">
          {liquidateIsPending ? (
            <SearchLoading />
          ) : (
            liquidateData?.map(
              (order) =>
                order.borrower &&
                order.rewardValue > 0 && (
                  <LiquidationListItem
                    amount={`${order.rewardValue}`}
                    borrower={order.borrower}
                    debt={order.debt}
                    reward={order.rewardAmounts}
                    rewardAssets={order.rewardAssets}
                    key={order.borrower}
                  />
                )
            )
          )}
          {!liquidateIsPending && !liquidateData?.length && (
            <h3 style={{ margin: '10px 0 0 10px' }}>
              There are no more liquidations.
            </h3>
          )}
        </MarketStatusContainer>
      </div>
    </div>
  )
}

export default Liquidation
