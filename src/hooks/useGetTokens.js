import { useQuery } from '@tanstack/react-query'
import { SUPPORTED_TOKENS } from '../util/constants'

export const getTokens = async () => SUPPORTED_TOKENS

const useGetTokens = () => {
  return useQuery({
    queryKey: ['tokens'],
    queryFn: async () => await getTokens(),
    initialData: [],
  })
}

export default useGetTokens
