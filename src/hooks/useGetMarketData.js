import { useQuery } from '@tanstack/react-query'
import { BigNumber } from 'bignumber.js/bignumber.mjs'
import { BLOCKS_PER_YEAR, CONTRACT_EVM_PRICE_ORACLE } from '../util/constants'
import useRpcContext from './useRpcContext'
import useGetTokens from './useGetTokens'
import { getDecimalNumber, getTokenNumber } from '../util/tokens'
import { getTokenAbi } from '../util/Contracts/tokens'
import { getPrice } from './useGetUserTokenData'

const getMarketData = async (tokens, rpcProvider) => {
  const tokenContracts = tokens.map((token) => ({
    contract: rpcProvider.getContract(getTokenAbi(token), token.evmSfId),
    token,
  }))

  const results = await Promise.all([
    ...tokenContracts
      .map(({ contract, token }) => [
        contract.call('getUnderlyingBalance'),
        contract.call('totalBorrows'),
        contract.call('supplyRatePerBlock'),
        contract.call('borrowRatePerBlock'),
        getPrice(rpcProvider, token),
      ])
      .flat(),
  ])

  const data = {}
  tokenContracts.forEach(({ token }, index) => {
    const i = 5 * index
    data[token.name] = {
      supply: getTokenNumber(token, results[i]),
      borrow: getTokenNumber(token, results[i + 1]),
      sapy: getDecimalNumber(
        18,
        new BigNumber(results[i + 2]).multipliedBy(BLOCKS_PER_YEAR)
      ),
      bapy: getDecimalNumber(
        18,
        new BigNumber(results[i + 3]).multipliedBy(BLOCKS_PER_YEAR)
      ),
      price: getDecimalNumber(18, results[i + 4]),
    }
  })

  return data
}

const useGetMarketData = (overrides) => {
  const rpcProvider = useRpcContext()
  const { data: tokens } = useGetTokens()

  return useQuery({
    queryKey: ['marketData', tokens],
    queryFn: () => getMarketData(tokens, rpcProvider),
    enabled: !!tokens.length,
    ...overrides,
  })
}

export default useGetMarketData
