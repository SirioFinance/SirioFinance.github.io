import './style.css'
import ProgressBar from '../ProgressBar.jsx'
import { SUPPORTED_TOKENS } from '../../util/constants.js'
import PaperContainer from '../DashBoardMarkets/PaperContainer.jsx'
import TokenPieChart from '../charts/TokenPieChart.jsx'
import SearchLoading from '../SearchLoading/SearchLoading.jsx'
import { Box } from '@mui/material'

const MarketIndividualStats = ({ amount, header, isPending, markets }) => {
  const data = markets.map((el) => {
    // TODO: Refactor this so we don't need to do a lookup
    // and guarantee the token exists
    const token = SUPPORTED_TOKENS.find(({ name }) => el.name === name)
    return { el, token }
  })

  const chartData = {
    labels: data.map((data) => data.token?.name),
    datasets: [
      {
        label: 'Market Share',
        data: data.map(({ el }) => el.per),
        backgroundColor: [
          '#0B2439',
          '#3251BF',
          '#0D4A85',
          '#19A2CA',
          '#1EC2E1',
          '#A8DEE9',
        ],
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  }

  return (
    <PaperContainer sx={{ width: '100%' }} title={`${header} - ${amount}`}>
      <Box display="flex" justifyContent="center">
        {isPending ? (
          <SearchLoading />
        ) : (
          <TokenPieChart chartData={chartData} />
        )}
      </Box>
      {/* <div className="market-stats">
        {data.map(({ el, token }) => {
          return token ? (
            <div key={token.name}>
              <div className="topMarketsInfo">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                >
                  <img
                    src={token.icon}
                    alt=""
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '10px',
                    }}
                  />
                  <p>{el.name}</p>
                </div>
                <p>{el.per}%</p>
              </div>
              <ProgressBar progressPercentage={el.per} height={4} />
            </div>
          ) : (
            <div>Token not found</div>
          )
        })}
      </div> */}
    </PaperContainer>
  )
}

export default MarketIndividualStats
