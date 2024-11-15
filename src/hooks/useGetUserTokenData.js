import { useQueries, useQuery } from '@tanstack/react-query'
import useRpcContext from './useRpcContext'
import {
  BLOCKS_PER_YEAR,
  CONTRACT_EVM_MARKET_POSITION_MANAGER,
  CONTRACT_EVM_PRICE_ORACLE,
} from '../util/constants'
import useWalletContext from './useWalletContext'
import useGetAccount from './useGetAccount'
import useGetTokens from './useGetTokens'
import queryClient from '../util/queryClient'
import { getDecimalNumber, getTokenNumber } from '../util/tokens'
import { useCallback } from 'react'
import { getTokenAbi } from '../util/Contracts/tokens'

export const DEFAULT_DATA = {
  allowance: 0,
  available: 0,
  balance: 0,
  bapy: 0,
  borrow: 0,
  interest: 0,
  price: 0,
  sapy: 0,
  supply: 0,
  w_available: 0,
}

const getPriceAndScale = async (rpcProvider, supraTokenId) => {
  const priceOracleContract = rpcProvider.getContract(
    'PriceOracle',
    CONTRACT_EVM_PRICE_ORACLE
  )

  const supraData = await priceOracleContract.call('getPrice', supraTokenId)
  const decimals = Number(supraData.decimals)
  const scaler = decimals === 18 ? 1 : 10 ** (18 - decimals)
  return Number(supraData.price * BigInt(scaler))
}

export const getPrice = async (rpcProvider, token) => {
  const supraPrice = await getPriceAndScale(rpcProvider, token.supra.supraId)
  if (token.supra.supraId === token.supra.pairUsdId) {
    return supraPrice
  }

  const pairUsdPrice = await getPriceAndScale(
    rpcProvider,
    token.supra.pairUsdId
  )
  return (supraPrice * pairUsdPrice) / 1e18
}

export const getUserTokenData = async (evmAccountId, token, rpcProvider) => {
  const lendingContract = rpcProvider.getContract(
    getTokenAbi(token),
    token.evmSfId
  )
  const marketManagerContract = rpcProvider.getContract(
    'MarketPositionManager',
    CONTRACT_EVM_MARKET_POSITION_MANAGER
  )

  const data = await Promise.all([
    lendingContract.call('getAllBalances', evmAccountId),
    lendingContract.call('supplyRatePerBlock'),
    lendingContract.call('borrowRatePerBlock'),
    marketManagerContract.call(
      'getBorrowableAmount',
      evmAccountId,
      token.evmSfId
    ),
    marketManagerContract.call(
      'getRedeemableAmount',
      evmAccountId,
      token.evmSfId
    ),
    getPrice(rpcProvider, token),
  ])
    .then((r) => {
      return {
        borrow: getTokenNumber(token, r[0][0]),
        supply: getTokenNumber(token, r[0][1]),
        interest: getTokenNumber(token, r[0][2]),
        sapy: getDecimalNumber(18, r[1]) * BLOCKS_PER_YEAR,
        bapy: getDecimalNumber(18, r[2]) * BLOCKS_PER_YEAR,
        available: getTokenNumber(token, r[3]),
        w_available: getTokenNumber(token, r[4]),
        price: getDecimalNumber(18, r[5]),
        fetchDate: new Date(), // Used to estimate in the UI how many blocks have passed for repay payoffs
      }
    })
    .catch((e, ...other) => {
      console.log('Contract call error!!!', e, other)
      throw e
    })

  return data
}

export const useInvalidateUserTokenData = (token) => {
  const { wallet } = useWalletContext()
  const { accountId } = wallet || {}
  const { data: account } = useGetAccount(accountId)
  const evmAccountId = account?.evm_address
  return () =>
    evmAccountId &&
    queryClient.invalidateQueries({
      queryKey: ['userTokenData', evmAccountId, token],
    })
}

export const useGetUserTokensData = (accountId) => {
  const rpcProvider = useRpcContext()
  const { data: account } = useGetAccount(accountId)
  const { data: tokens } = useGetTokens()
  const evmAccountId = account?.evm_address

  const combine = useCallback(
    (results) => {
      const isFetching = !!results.find(({ isFetching }) => isFetching)
      const isPending = !!results.find(({ isPending }) => isPending)
      const data = isPending
        ? null
        : tokens.reduce((value, token, index) => {
            value[token.name] = results[index].data
            return value
          }, {})

      return { data, isFetching, isPending }
    },
    [tokens]
  )

  return useQueries({
    queries: tokens.map((token) => ({
      queryKey: ['userTokenData', evmAccountId, token],
      queryFn: async () =>
        await getUserTokenData(evmAccountId, token, rpcProvider),
      initialData: DEFAULT_DATA,
      enabled: !!(evmAccountId && token),
    })),
    combine,
  })
}

const useGetUserTokenData = (token) => {
  const rpcProvider = useRpcContext()
  const { wallet } = useWalletContext()
  const { accountId } = wallet || {}
  const { data: account } = useGetAccount(accountId)
  const evmAccountId = account?.evm_address

  return useQuery({
    queryKey: ['userTokenData', evmAccountId, token],
    queryFn: async () =>
      await getUserTokenData(evmAccountId, token, rpcProvider),
    initialData: DEFAULT_DATA,
    enabled: !!(evmAccountId && token),
  })
}

export default useGetUserTokenData
