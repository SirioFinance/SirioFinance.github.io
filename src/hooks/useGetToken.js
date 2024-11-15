import { useQuery } from '@tanstack/react-query'
import { SUPPORTED_TOKENS, UNKNOWN_TOKEN } from '../util/constants'

export const getToken = async (tokenId) =>
  SUPPORTED_TOKENS.find(({ name }) => name === tokenId)

const useGetToken = (tokenId) => {
  return useQuery({
    queryKey: ['token', tokenId],
    queryFn: async () => await getToken(tokenId),
    initialData: UNKNOWN_TOKEN,
  })
}

export default useGetToken
