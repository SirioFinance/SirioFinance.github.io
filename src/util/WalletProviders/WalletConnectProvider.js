import {
  HederaSessionEvent,
  HederaJsonRpcMethod,
  DAppConnector,
  HederaChainId,
  networkNamespaces,
} from '@kabila-tech/hedera-wallet-connect'
import {
  APP_DESCRIPTION,
  APP_ID_HASHPACK,
  APP_NAME,
  HEDERA_NETWORK,
} from '../constants'
import walletConnectImg from '../../assets/BrandingAssets-main/Icons/walletconnect.png'
import WalletConnectTransactionProcessor from '../TransactionProcessors/WalletConnectTransactionProcessor'

const projectId = APP_ID_HASHPACK
const metadata = {
  description: APP_DESCRIPTION,
  icons: [`${window.location.origin}/Logo.svg`],
  name: APP_NAME,
  url: window.location.origin,
}

let dAppConnector = null

const getAccountId = () => {
  return dAppConnector.signers.map((signer) =>
    signer.getAccountId().toString()
  )[0]
}

const WalletConnectProvider = async (onConnect) => {
  const name = 'WalletConnect'

  const events = [
    HederaSessionEvent.ChainChanged,
    HederaSessionEvent.AccountsChanged,
  ]
  const methods = Object.values(HederaJsonRpcMethod)

  const connect = async ({ callback, current, pairingString = false }) => {
    console.log('WalletConnect - Create session')
    if (callback) {
      callback()
    }

    let accountId = null
    if (!dAppConnector) {
      dAppConnector = new DAppConnector(
        metadata,
        HEDERA_NETWORK,
        projectId,
        methods,
        events,
        [HederaChainId.TESTNET]
      )

      await dAppConnector.init({ logger: 'error' })
      accountId = getAccountId()
    }

    if (!accountId) {
      if (pairingString) {
        const { uri } = await dAppConnector.walletConnectClient.connect({
          pairingTopic: undefined,
          requiredNamespaces: networkNamespaces(
            HEDERA_NETWORK,
            methods,
            events
          ),
        })
        return uri
      } else {
        await dAppConnector.openModal()
      }
      accountId = getAccountId()
    }

    const signClient = dAppConnector.walletConnectClient

    // Handle pairing proposals
    signClient.on('session_proposal', (event) => {
      // Display session proposal to the user and decide to approve or reject
      console.log('WalletConnect - session_proposal', event)
    })

    // Handle session requests, like signing transactions or messages
    signClient.on('session_request', (event) => {
      // Process the session request
      console.log('WalletConnect - session_request', event)
    })

    // Handle session deletions
    signClient.on('session_delete', async (event) => {
      // React to session termination
      console.log('WalletConnect - session_delete', event)
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

  const getPairingString = () =>
    connect({ callback: () => null, pairingString: true })

  return {
    connect,
    getExists: () => true,
    getPairingString,
    image: walletConnectImg,
    name,
  }
}

export default WalletConnectProvider
