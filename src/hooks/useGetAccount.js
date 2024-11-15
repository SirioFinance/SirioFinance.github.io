import { useQuery } from '@tanstack/react-query'
import { MIRROR_NODE_URL } from '../util/constants'
import axios from 'axios'
import queryClient from '../util/queryClient'

const getAccount = async (accountId) => {
  const url = `${MIRROR_NODE_URL}/v1/accounts/${accountId}`
  return (await axios.get(url)).data
}

export const useInvalidateAccount = (accountId) => {
  return () => queryClient.invalidateQueries(['account', accountId])
}

const useGetAccount = (accountId, overrides) => {
  return useQuery({
    queryKey: ['account', accountId],
    queryFn: async () => await getAccount(accountId),
    initialData: null,
    enabled: !!accountId,
    ...overrides,
  })
}

export default useGetAccount
