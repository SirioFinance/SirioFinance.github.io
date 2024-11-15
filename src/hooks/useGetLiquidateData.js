import { useQuery } from '@tanstack/react-query'
import { BigNumber } from 'bignumber.js/bignumber.mjs'
import { CONTRACT_EVM_MARKET_POSITION_MANAGER } from '../util/constants'
import useRpcContext from './useRpcContext'
import useGetTokens from './useGetTokens'

const getLiquidateData = async (tokens, rpcProvider) => {
  const marketManagerContract = rpcProvider.getContract(
    'MarketPositionManager',
    CONTRACT_EVM_MARKET_POSITION_MANAGER
  )
  let data = []
  const {
    borrowers,
    debts,
    reward: rewards,
  } = await marketManagerContract.call('checkLiquidations')

  for (let i = 0; i < borrowers.length; i++) {
    const borrower = borrowers[i]
    const debt = debts[i]
    const reward = rewards[i]

    // If there is no debt, skip
    if (!debts[i]) {
      continue
    }

    const { suppliedAssets, liquidateAmounts } =
      await marketManagerContract.call(
        'calcLiquidationDetails',
        borrower,
        reward
      )

    // Build asset amounts
    let assets = []
    let amounts = []
    for (let j = 0; j < suppliedAssets.length; j++) {
      if (!liquidateAmounts[j]) {
        continue
      }

      const token = tokens.find(({ evmSfId }) => evmSfId === suppliedAssets[j])
      assets.push(token.name)
      amounts.push(new BigNumber(liquidateAmounts[j]).div(`1e18`).toNumber())
    }

    data.push({
      borrower,
      debt: new BigNumber(debt).div(`1e18`).toNumber(),
      rewardAssets: assets,
      rewardAmounts: amounts,
      rewardValue: new BigNumber(reward).div(`1e18`).toNumber(),
    })
  }

  return data
}

const useGetLiquidateData = (overrides) => {
  const rpcProvider = useRpcContext()
  const { data: tokens } = useGetTokens()

  return useQuery({
    queryKey: ['liquidateData', tokens],
    queryFn: () => getLiquidateData(tokens, rpcProvider),
    enabled: !!tokens.length,
    ...overrides,
  })
}

export default useGetLiquidateData
