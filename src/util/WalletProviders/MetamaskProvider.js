import metamaskImg from '../../assets/BrandingAssets-main/Icons/metamask.svg'
import EthereumTransactionProcessor from '../TransactionProcessors/EthereumTransactionProcessor'
import { METAMASK_NETWORK, MIRROR_NODE_URL, RPC_URL } from '../constants'
import axios from 'axios'
import Web3 from 'web3'

const switchToHederaNetwork = async (provider) => {
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: METAMASK_NETWORK }],
    })
  } catch (error) {
    if (error.code === 4902) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: 'Hedera Testnet',
              chainId: METAMASK_NETWORK,
              nativeCurrency: {
                name: 'HBAR',
                symbol: 'HBAR',
                decimals: 18,
              },
              rpcUrls: [RPC_URL],
            },
          ],
        })
      } catch (addError) {
        console.error(addError)
      }
    }
    console.error(error)
  }
}

const MetamaskProvider = async (onConnect) => {
  const name = 'Metamask'

  const provider =
    window.ethereum?.providers?.find((provider) => provider.isMetaMask) ||
    window.ethereum

  const connect = async () => {
    console.log('Metamask - Create session')

    switchToHederaNetwork(provider)
    const accounts = await provider.request({ method: 'eth_requestAccounts' })
    const accountId = accounts[0]
    const web3 = new Web3(provider)
    const url = `${MIRROR_NODE_URL}/v1/accounts/${accountId}` // TODO: Refactor this
    const response = (await axios.get(url)).data

    onConnect({
      accountDisplay: response.account,
      accountId,
      disconnect: async () => onConnect(),
      name,
      processor: EthereumTransactionProcessor,
      provider: web3.currentProvider,
    })
  }

  return {
    connect,
    getExists: () => provider?.isMetaMask,
    image: metamaskImg,
    name,
  }
}

export default MetamaskProvider
