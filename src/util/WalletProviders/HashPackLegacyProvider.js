import { HashConnect } from 'hashconnect'
import { AccountId } from '@hashgraph/sdk'
import {
  APP_DESCRIPTION,
  APP_ID_HASHPACK,
  APP_NAME,
  HEDERA_NETWORK,
} from '../constants'
import hashpackImg from '../../assets/BrandingAssets-main/Icons/hashpack.png'
import HederaTransactionProcessor from '../TransactionProcessors/HederaTransactionProcessor'

const appMetadata = {
  description: APP_DESCRIPTION,
  icons: [`${window.location.origin}/Logo.svg`],
  name: APP_NAME,
  url: window.location.origin,
}

let hc = null
let connectionStatus = null
let initData = null
let pairingData = null

const HashPackLegacyProvider = async (onConnect) => {
  const name = 'HashPack'
  let exists = false

  if (!hc) {
    hc = new HashConnect(HEDERA_NETWORK !== 'mainnet')
  }

  const pair = (newPairing) => {
    console.log('Hashpack - pairingEvent', pairingData)
    pairingData = newPairing

    const accountId = pairingData.accountIds[0]
    const provider = hc.getProvider(
      HEDERA_NETWORK,
      pairingData.topic,
      accountId
    )
    const signer = hc.getSigner(provider)
    onConnect({
      accountId,
      disconnect: async () => await hc.disconnect(pairingData.topic),
      name,
      processor: HederaTransactionProcessor,
      provider: signer,
    })
  }

  hc.connectionStatusChangeEvent.on((status) => {
    console.log('Hashpack - connectionStatusChangeEvent', status)
    connectionStatus = status
  })
  hc.foundExtensionEvent.on((walletMetadata) => {
    console.log('Hashpack - foundExtensionEvent', walletMetadata)
    exists = true
  })
  hc.pairingEvent.on(pair)

  initData = await hc.init(appMetadata, HEDERA_NETWORK, false)

  const connect = async ({ callback, current }) => {
    console.log('Hashpack - Create session', callback, current)
    if (callback) {
      callback()
    }

    if (current) {
      pair(initData.savedPairings[0])
    } else {
      hc.connectToLocalWallet()
    }
  }

  return { connect, getExists: () => true, image: hashpackImg, name }
}

export default HashPackLegacyProvider
