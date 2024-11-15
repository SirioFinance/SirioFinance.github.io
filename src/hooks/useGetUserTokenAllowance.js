// import { getTokenNumber } from '../util/tokens'
// import useGetUserTokenAllowances from './useGetUserTokenAllowances'
// import useWalletContext from './useWalletContext'

// const useGetUserTokenAllowance = (token, overrides) => {
//   const { wallet } = useWalletContext()
//   const { accountId } = wallet || {}
//   const { data: allowances } = useGetUserTokenAllowances(accountId, overrides)
//   const allowance = allowances?.find(({ token_id }) => token_id === token.id)
//   const amount = getTokenNumber(token, allowance?.amount)
//   return token.isHbar ? 0 : amount
// }

// export default useGetUserTokenAllowance

import { useQuery } from '@tanstack/react-query'
import { MIRROR_NODE_URL } from '../util/constants'
import axios from 'axios'
import useWalletContext from './useWalletContext'
import queryClient from '../util/queryClient'
import { getTokenNumber } from '../util/tokens'

const getUserTokenAllowance = async (accountId, token) => {
  const url = `${MIRROR_NODE_URL}/v1/accounts/${accountId}/allowances/tokens?spender.id=${token.sfId}&token.id=${token.id}`
  const data = (await axios.get(url)).data
  return data?.allowances?.length ? data.allowances[0] : null
}

export const useInvalidateUserTokenAllowance = (token) => {
  const { wallet } = useWalletContext()
  const { accountId } = wallet || {}
  return () =>
    queryClient.invalidateQueries({
      queryKey: ['allowances', accountId, token.id],
    })
}

const useGetUserTokenAllowance = (token, overrides) => {
  const { wallet } = useWalletContext()
  const { accountId } = wallet || {}

  return useQuery({
    queryKey: ['allowances', accountId, token.id],
    queryFn: async () => {
      const allowance = await getUserTokenAllowance(accountId, token)
      const amount = getTokenNumber(token, allowance?.amount)
      return token.isHbar ? 0 : amount
    },
    initialData: 0,
    enabled: !!accountId && !!token,
    ...overrides,
  })
}

export default useGetUserTokenAllowance
