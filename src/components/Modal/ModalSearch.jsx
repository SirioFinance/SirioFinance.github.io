import SearchLoading from '../SearchLoading/SearchLoading'
import SearchSuccess from '../SearchSuccess/SearchSuccess'
import SearchFailed from '../SearchFailed/SearchFailed'
import Dialog from '../Utils/Dialog'
import { useGetUserTokensData } from '../../hooks/useGetUserTokenData'
import useGetTokens from '../../hooks/useGetTokens'
import useGetUserTotals from '../../hooks/useGetUserTotals'

export default function ModalSearch({ onClose, open, value }) {
  const { data: tokens, isPending: tokensLoading } = useGetTokens()
  const {
    data: userTokensData,
    error,
    isPending: userTokensDataLoading,
  } = useGetUserTokensData(value)
  const { borrowAmount, borrowLimit, utilization, netApy, supplyAmount } =
    useGetUserTotals(tokens, userTokensData)

  const loading = tokensLoading || userTokensDataLoading

  return (
    <Dialog open={open} onClose={onClose}>
      {loading && <SearchLoading />}
      {userTokensData && (
        <SearchSuccess
          address={value}
          apy={netApy}
          supply={supplyAmount}
          utilization={utilization}
          borrow={borrowAmount}
          limit={borrowLimit}
        />
      )}
      {error && <SearchFailed address={value} closeBtn={onClose} />}
    </Dialog>
  )
}
