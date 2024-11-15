import {
  HederaSessionEvent,
  HederaJsonRpcMethod,
  DAppConnector,
  HederaChainId,
} from '@kabila-tech/hedera-wallet-connect'
import {
  APP_DESCRIPTION,
  APP_ID_HASHPACK,
  APP_NAME,
  HEDERA_NETWORK,
} from '../../constants'
import WalletConnectTransactionProcessor from '../../TransactionProcessors/WalletConnectTransactionProcessor'

const projectId = APP_ID_HASHPACK
const metadata = {
  description: APP_DESCRIPTION,
  icons: [`${window.location.origin}/Logo.svg`],
  name: APP_NAME,
  url: window.location.origin,
}

const getAccountId = (dAppConnector) => {
  try {
    return dAppConnector.signers.map((signer) =>
      signer.getAccountId().toString()
    )[0]
  } catch (e) {
    console.log('Unable to get account ID', e)
    return null
  }
}

const events = [
  HederaSessionEvent.ChainChanged,
  HederaSessionEvent.AccountsChanged,
]
const methods = Object.values(HederaJsonRpcMethod)

const getWalletConnectProvider = (extensionId, name, image) => {
  return async (onConnect) => {
    const dAppConnector = new DAppConnector(
      metadata,
      HEDERA_NETWORK,
      projectId,
      methods,
      events,
      [HederaChainId.TESTNET],
      [extensionId]
    )

    await dAppConnector.init({ logger: 'error' })

    const extension = dAppConnector.extensions?.find(
      ({ available }) => !!available
    )

    const connect = async () => {
      console.log(`${name} - Create session`)

      let accountId = getAccountId(dAppConnector)

      if (!accountId && extension) {
        await dAppConnector.connectExtension(extension.id)
        accountId = getAccountId(dAppConnector)
      }

      const signClient = dAppConnector.walletConnectClient

      // Handle pairing proposals
      signClient.on('session_proposal', (event) => {
        // Display session proposal to the user and decide to approve or reject
        console.log(`${name} - session_proposal`, event)
      })

      // Handle session requests, like signing transactions or messages
      signClient.on('session_request', (event) => {
        // Process the session request
        console.log(`${name} - session_request`, event)
      })

      // Handle session deletions
      signClient.on('session_delete', async (event) => {
        // React to session termination
        console.log(`${name} - session_delete`, event)
        await dAppConnector.disconnectAll()
      })

      onConnect({
        accountId,
        disconnect: async () => await dAppConnector.disconnectAll(),
        name,
        processor: WalletConnectTransactionProcessor,
        provider: dAppConnector,
      })
    }

    return { connect, getExists: () => !!extension, image, name }
  }
}

export default getWalletConnectProvider
