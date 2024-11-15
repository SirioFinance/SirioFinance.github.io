import web3 from './web3'
import ABIS from './Contracts/abis'
import { createContext } from 'react'

export const RpcContext = createContext()

const provider = {
  getBalance: async (evmAddress) => await web3.eth.getBalance(evmAddress),
  getContract: (abi, evmAddress) => {
    const contract = new web3.eth.Contract(ABIS[abi], evmAddress)

    return {
      call: async (method, ...args) => {
        try {
          return await contract.methods[method](...args).call()
        } catch (e) {
          console.log(`Contract call error: ${evmAddress}.${method}`, e)
        }
      },
    }
  },
}

const RpcProvider = ({ children }) => {
  return <RpcContext.Provider value={provider}>{children}</RpcContext.Provider>
}

export default RpcProvider
