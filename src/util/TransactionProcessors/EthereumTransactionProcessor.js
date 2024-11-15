import ABIS from '../Contracts/abis'
import { getRepayFn, getSupplyFn, getTokenAbi } from '../Contracts/tokens'
import { CONTRACT_EVM_MARKET_POSITION_MANAGER } from '../constants'
import web3 from '../web3'

const EthereumTransactionProcessor = (accountId) => {
  const process = async (signer, transaction, options) => {
    return new Promise((resolve, reject) => {
      try {
        web3.setProvider(signer)
        transaction
          .send({ from: accountId, ...options })
          .then(({ transactionHash }) => resolve({ id: transactionHash }))
          .catch(reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  return {
    approve: async (signer, { amount, token }) => {
      const contract = new web3.eth.Contract(ABIS['ERC20'], token.evmId)
      const transaction = contract.methods.approve(token.evmSfId, amount)
      return await process(signer, transaction)
    },
    associate: async (signer, { token }) => {
      const contract = new web3.eth.Contract(ABIS.HTS, token.evmId)
      const transaction = await contract.methods.associate()
      return await process(signer, transaction)
    },
    borrow: async (signer, { amount, token }) => {
      const contract = new web3.eth.Contract(
        ABIS[getTokenAbi(token)],
        token.evmSfId
      )
      const transaction = contract.methods.borrow(amount)
      return await process(signer, transaction)
    },
    harvest: async (signer, { amount, token }) => {
      const contract = new web3.eth.Contract(
        ABIS[getTokenAbi(token)],
        token.evmSfId
      )
      const transaction = contract.methods.claimInterests(amount)
      return await process(signer, transaction)
    },
    liquidation: async (signer, { amount, borrower, token }) => {
      const contract = new web3.eth.Contract(
        ABIS['MarketPositionManager'],
        CONTRACT_EVM_MARKET_POSITION_MANAGER
      )
      const transaction = contract.methods.liquidateBorrow(
        borrower,
        token.evmSfId,
        Math.floor(amount * 10 ** 18)
      )
      return await process(signer, transaction)
    },
    repay: async (signer, { amount, token }) => {
      const contract = new web3.eth.Contract(
        ABIS[getTokenAbi(token)],
        token.evmSfId
      )

      const params = token.isHbar ? [] : [amount]
      const transaction = contract.methods[getRepayFn(token)](...params)
      const options = token.isHbar ? { value: amount * 10 ** 10 } : {}
      return await process(signer, transaction, options)
    },
    supply: async (signer, { amount, token }) => {
      // TODO: Make sure we don't need to set the provider before creating the contract
      const contract = new web3.eth.Contract(
        ABIS[getTokenAbi(token)],
        token.evmSfId
      )
      const transaction = token.isHbar
        ? contract.methods[getSupplyFn(token)]()
        : contract.methods[getSupplyFn(token)](amount)
      const options = token.isHbar ? { value: amount * 10 ** 10 } : {}
      return await process(signer, transaction, options)
    },
    withdraw: async (signer, { amount, token }) => {
      const contract = new web3.eth.Contract(
        ABIS[getTokenAbi(token)],
        token.evmSfId
      )
      const transaction = contract.methods.redeemExactUnderlying(
        Math.floor(amount)
      )
      return await process(signer, transaction)
    },
  }
}

export default EthereumTransactionProcessor
