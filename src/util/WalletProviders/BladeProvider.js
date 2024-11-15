import { BladeConnector, ConnectorStrategy } from '@bladelabs/blade-web3.js'
import {
  APP_DESCRIPTION,
  APP_ID_BLADE,
  APP_NAME,
  HEDERA_NETWORK,
} from '../constants'
import bladeImg from '../../assets/BrandingAssets-main/Icons/blade.png'
import HederaTransactionProcessor from '../TransactionProcessors/HederaTransactionProcessor'

const params = { dAppCode: APP_ID_BLADE, network: HEDERA_NETWORK }

const BladeProvider = async (onConnect) => {
  const name = 'Blade'

  let bladeConnector = null
  try {
    bladeConnector = await BladeConnector.init(ConnectorStrategy.EXTENSION, {
      description: APP_DESCRIPTION,
      icons: [`${window.location.origin}/Logo.svg`],
      name: APP_NAME,
      url: window.location.origin,
    })
  } catch (e) {
    console.log('Blade - wallet not found')
  }

  const connect = async () => {
    console.log('Blade - Create session')
    await bladeConnector.createSession(params)

    const signer = await bladeConnector.strategy.signers[0]
    const accountId = signer.getAccountId().toString()

    onConnect({
      accountId,
      disconnect: async () => await bladeConnector.killSession(),
      name,
      processor: HederaTransactionProcessor,
      provider: signer,
    })
  }

  return { connect, getExists: () => !!bladeConnector, image: bladeImg, name }
}

export default BladeProvider
