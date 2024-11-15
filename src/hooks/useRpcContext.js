import { useContext } from 'react'
import { RpcContext } from '../util/RpcProvider'

const useRpcContext = () => useContext(RpcContext)

export default useRpcContext
