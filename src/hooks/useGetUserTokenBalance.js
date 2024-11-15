import { getTokenNumber } from '../util/tokens'
import useGetAccount from './useGetAccount'
import useWalletContext from './useWalletContext'

const useGetUserTokenBalance = (token, overrides = {}) => {
  const { wallet } = useWalletContext()
  const { accountId } = wallet || {}
  const query = useGetAccount(accountId, overrides)
  const tokens = query.data?.balance?.tokens

  const balance = token.isHbar
    ? getTokenNumber(token, query.data?.balance?.balance || 0)
    : getTokenNumber(
        token,
        tokens?.find(({ token_id }) => token_id === token.id)?.balance || 0
      )
  return { ...query, data: balance }
}

export default useGetUserTokenBalance
