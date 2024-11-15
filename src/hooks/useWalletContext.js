import { useContext } from 'react'
import { WalletContext } from '../util/WalletProvider'

const useWalletContext = () => useContext(WalletContext)

export default useWalletContext
