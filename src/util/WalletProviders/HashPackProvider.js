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
let pairingData = null

const HashPackProvider = async (onConnect) => {
  const name = 'HashPack'

  const connect = async ({ callback, current }) => {
    console.log('Hashpack - Create session')
    if (callback) {
      callback()
    }

    if (!hc) {
      hc = new HashConnect(HEDERA_NETWORK, APP_ID_HASHPACK, appMetadata, true)
    }

    hc.disconnectionEvent.on((data) => {
      console.log('Hashpack - disconnectionEvent', data)
      pairingData = null
    })
    hc.connectionStatusChangeEvent.on((status) => {
      console.log('Hashpack - connectionStatusChangeEvent', status)
      connectionStatus = status
    })
    hc.pairingEvent.on((newPairing) => {
      console.log('Hashpack - pairingEvent', pairingData)
      pairingData = newPairing
      const accountId = pairingData.accountIds[0]
      const signer = hc.getSigner(AccountId.fromString(accountId))
      onConnect({
        accountId,
        disconnect: async () => await hc.disconnect(),
        name,
        processor: HederaTransactionProcessor,
        provider: signer,
      })
    })

    await hc.init()

    if (!current) {
        await hc.openPairingModal()
    }
  }

  return { connect, getExists: () => true, image: hashpackImg, name }
}

export default HashPackProvider

// import getWalletConnectProvider from './utils/getWalletConnectProvider'
// import hashpackImg from '../../assets/BrandingAssets-main/Icons/hashpack.png'

// export default getWalletConnectProvider(
//   'gjagmgiddbbciopjhllkdnddhcglnemk',
//   'HashPack',
//   hashpackImg,
//   true
// )