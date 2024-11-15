import { transactionToBase64String } from '@kabila-tech/hedera-wallet-connect'
import {
  ContractExecuteTransaction,
  AccountAllowanceApproveTransaction,
  ContractFunctionParameters,
  TransactionId,
  TokenAssociateTransaction,
} from '@hashgraph/sdk'
import { CONTRACT_MARKET_POSITION_MANAGER, HEDERA_NETWORK } from '../constants'
import { getRepayFn, getSupplyFn } from '../Contracts/tokens'

const WalletConnectTransactionProcessor = (accountId) => {
  const process = async (dAppConnector, transaction) => {
    transaction.setTransactionId(TransactionId.generate(accountId))

    const params = {
      transactionList: transactionToBase64String(transaction),
      signerAccountId: `hedera:${HEDERA_NETWORK}:${accountId}`,
    }
    const response = await dAppConnector.signAndExecuteTransaction(params)
    return { id: response.transactionId }
  }

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
        .setGas(5000000)
        .setFunction(
          'borrow',
          new ContractFunctionParameters().addUint256(amount)
        )

      return await process(signer, transaction)
    },
    harvest: async (signer, { amount, token }) => {
      const transaction = await new ContractExecuteTransaction()
        .setContractId(token.sfId)
        .setGas(5000000)
        .setFunction(
          'claimInterests',
          new ContractFunctionParameters().addUint256(amount)
        )

      return await process(signer, transaction)
    },
    liquidation: async (signer, { amount, borrower, token }) => {
      const transaction = await new ContractExecuteTransaction()
        .setContractId(CONTRACT_MARKET_POSITION_MANAGER)
        .setGas(5000000)
        .setFunction(
          'liquidateBorrow',
          new ContractFunctionParameters()
            .addAddress(borrower)
            .addAddress(token.sfId)
            .addUint256(Math.floor(amount * 10 ** 18))
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
        .setGas(5000000)
        .setFunction(getRepayFn(token), params)

      if (token.isHbar) {
        transaction.setPayableAmount(amount / 10 ** 8)
      }

      return await process(signer, transaction)
    },
    supply: async (signer, { amount, token }) => {
      const transaction = await new ContractExecuteTransaction()
        .setContractId(token.sfId)
        .setGas(5000000)

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
        .setGas(5000000)
        .setFunction(
          'redeemExactUnderlying',
          new ContractFunctionParameters().addUint256(Math.floor(amount))
        )

      return await process(signer, transaction)
    },
  }
}

export default WalletConnectTransactionProcessor
