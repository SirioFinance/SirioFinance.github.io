import MarketStatusContainer from '../MarketStatusContainer/MarketStatusContainer'
import MarketStats from '../marketStats'
import AllMarketListItem from './AllMarketListItem'
import MarketsSearch from '../marketsSearch/MarketsSearch'
import useGetTokens from '../../hooks/useGetTokens'
import useGetMarketData from '../../hooks/useGetMarketData'
import SearchLoading from '../SearchLoading/SearchLoading'
import { Box } from '@mui/material'

const MarketsContainer = () => {
  const { data: marketData, isPending } = useGetMarketData()
  const { data: tokens } = useGetTokens()

  return (
    <div className="content-container">
      <div className="markets-inner-container">
        <MarketsSearch />
        <h2>Global Stats</h2>
        <MarketStats data={marketData} isPending={isPending} />
        <div className="markets-status">
          <MarketStatusContainer title="All Markets">
            {!marketData ? (
              <Box display="flex" justifyContent="center" width="100%">
                <SearchLoading />
              </Box>
            ) : (
              tokens?.map(({ icon, name }) => {
                const data = marketData[name]
                return (
                  !!data && (
                    <AllMarketListItem
                      key={name}
                      title={name}
                      img={icon}
                      supply={data.supply + data.borrow}
                      supplyApy={data.sapy}
                      totalBorrow={data.borrow}
                      supplyMin={(data.supply + data.borrow) * data.price}
                      supplyApyMIn="1.76%"
                      totalBorrowMin={data.borrow * data.price}
                      borrowApy={data.bapy}
                    />
                  )
                )
              })
            )}
          </MarketStatusContainer>
        </div>
      </div>
    </div>
  )
}

export default MarketsContainer
