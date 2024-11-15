import {
  ContractExecuteTransaction,
  AccountAllowanceApproveTransaction,
  ContractFunctionParameters,
  TokenAssociateTransaction,
  AccountId,
} from '@hashgraph/sdk'
import { CONTRACT_MARKET_POSITION_MANAGER } from '../constants'
import { getRepayFn, getSupplyFn } from '../Contracts/tokens'

const process = async (signer, transaction) => {
  await transaction.freezeWithSigner(signer)
  const response = await transaction.executeWithSigner(signer)
  return { id: response.transactionId.toString() }
}

const HederaTransactionProcessor = (accountId) => {
  return {
    approve: async (signer, { amount, token }) => {
      const transaction =
        await new AccountAllowanceApproveTransaction().approveTokenAllowance(
          token.id,
          accountId,
          token.sfId,
          amount
        )

      return await process(signer, transaction)
    },
    associate: async (signer, { token }) => {
      const transaction = await new TokenAssociateTransaction()
        .setAccountId(accountId)
        .setTokenIds([token.id])

      return await process(signer, transaction)
    },
    borrow: async (signer, { amount, token }) => {
      const transaction = await new ContractExecuteTransaction()
        .setContractId(token.sfId)
        .setGas(800000)
        .setFunction(
          'borrow',
          new ContractFunctionParameters().addUint256(amount)
        )

      return await process(signer, transaction)
    },
    harvest: async (signer, { amount, token }) => {
      const transaction = await new ContractExecuteTransaction()
        .setContractId(token.sfId)
        .setGas(250000)
        .setFunction(
          'claimInterests',
          new ContractFunctionParameters().addUint256(amount)
        )

      return await process(signer, transaction)
    },
    liquidation: async (signer, { amount, borrower, token }) => {
      const transaction = await new ContractExecuteTransaction()
        .setContractId(CONTRACT_MARKET_POSITION_MANAGER)
        .setGas(3000000)
        .setFunction(
          'liquidateBorrow',
          new ContractFunctionParameters()
            .addAddress(
              `0x${AccountId.fromString(borrower).toSolidityAddress()}`
            )
            .addAddress(token.evmSfId)
            .addUint256(Math.floor(amount * 10 ** 18))
          // .addUint256(Math.floor(1))
        )

      return await process(signer, transaction)
    },
    repay: async (signer, { amount, token }) => {
      const params = new ContractFunctionParameters()
      if (!token.isHbar) {
        params.addUint256(amount)
      }

      const transaction = await new ContractExecuteTransaction()
        .setContractId(token.sfId)
        .setGas(350000)
        .setFunction(getRepayFn(token), params)

      if (token.isHbar) {
        transaction.setPayableAmount(amount / 10 ** 8)
      }

      return await process(signer, transaction)
    },
    supply: async (signer, { amount, token }) => {
      const transaction = await new ContractExecuteTransaction()
        .setContractId(token.sfId)
        .setGas(250000)

      if (token.isHbar) {
        transaction.setFunction(getSupplyFn(token))
        transaction.setPayableAmount(amount / 10 ** 8)
      } else {
        transaction.setFunction(
          getSupplyFn(token),
          new ContractFunctionParameters().addUint256(amount)
        )
      }

      return await process(signer, transaction)
    },
    withdraw: async (signer, { amount, token }) => {
      const transaction = await new ContractExecuteTransaction()
        .setContractId(token.sfId)
        .setGas(500000)
        .setFunction(
          'redeemExactUnderlying',
          new ContractFunctionParameters().addUint256(Math.floor(amount))
        )

      return await process(signer, transaction)
    },
  }
}

export default HederaTransactionProcessor
