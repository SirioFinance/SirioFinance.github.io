import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
// import HashPackProvider from './WalletProviders/HashPackProvider'
// import BladeProvider from './WalletProviders/BladeProvider'
import MetamaskProvider from './WalletProviders/MetamaskProvider'
import { useSearchParams } from 'react-router-dom'
import WalletConnectProvider from './WalletProviders/WalletConnectProvider'
import KabilaProvider from './WalletProviders/KabilaProvider'
import HashPackLegacyProvider from './WalletProviders/HashPackLegacyProvider'

const PROVIDERS = [
  // HashPackProvider,
  HashPackLegacyProvider,
  MetamaskProvider,
  // BladeProvider,
  KabilaProvider,
  WalletConnectProvider,
]
const LOCAL_STORAGE_KEY = 'connectedWallet'

export const WalletContext = createContext()

const DEFAULT_STATE = {
  providers: [],
  transaction: null,
  wallet: null,
}

const WalletProvider = ({ children }) => {
  const [searchParams] = useSearchParams()
  const [state, setState] = useState(DEFAULT_STATE)
  const { providers, transaction, wallet } = state
  const impersonate = searchParams.get('impersonate')

  const clearTx = useCallback(
    () => setState((prev) => ({ ...prev, transaction: null })),
    []
  )

  const setWallet = useCallback((wallet) => {
    const eventWrapper =
      (func, key) =>
      async (...args) => {
        try {
          setState((prev) => ({
            ...prev,
            transaction: {
              ...prev.transaction,
              state: 'sent',
              // This is a silly hack to allow modals to stay open for approve
              // transactions; TODO: Make this better
              _meta: { stayOpen: key === 'approve' },
            },
          }))
          const { id } = await func(...args)
          setState((prev) => ({
            ...prev,
            transaction: { ...prev.transaction, id, state: 'accept' },
          }))
        } catch (e) {
          console.log('WalletProvider - Tx Error', e)
          setState((prev) => ({
            ...prev,
            transaction: {
              ...prev.transaction,
              id: e?.data?.transactionId,
              state: 'reject',
            },
          }))
          throw e
        }
      }

    if (wallet?.accountId) {
      const processor = wallet.processor(wallet.accountId)
      const wrappedProcessor = Object.keys(processor).reduce((value, key) => {
        value[key] = eventWrapper(processor[key], key)
        return value
      }, {})

      const wrappedWallet = {
        ...wallet,
        accountDisplay: wallet.accountDisplay || wallet.accountId,
        disconnect: async () => {
          localStorage.removeItem(LOCAL_STORAGE_KEY)
          setState((prev) => ({ ...prev, transaction: null, wallet: null }))
          try {
            await wallet.disconnect()
          } catch (e) {
            console.log('WalletProvider - Disconnect Error', e)
          }
        },
        processor: wrappedProcessor,
      }
      setState((prev) => ({ ...prev, wallet: wrappedWallet }))
    } else {
      setState((prev) => ({ ...prev, wallet: null }))
    }
  }, [])

  useEffect(() => {
    const func = async () => {
      const onConnect = (wallet) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, wallet?.name)
        setWallet(wallet)
      }
      const providerPromises = PROVIDERS.map(async (provider) => {
        try {
          return await provider(onConnect)
        } catch (e) {
          console.error('Unable to init provider', e)
        }
      })
      const providers = (await Promise.all(providerPromises)).filter(Boolean)
      const existingProviders = providers.filter(({ getExists }) => getExists())
      const currentProvider = localStorage.getItem(LOCAL_STORAGE_KEY)
      existingProviders.forEach(({ connect, name }) => {
        if (currentProvider === name) {
          connect({ current: true })
        }
      })

      setState((prev) => ({ ...prev, providers: existingProviders }))
    }

    func()
  }, [setWallet])

  const context = useMemo(
    () => ({
      clearTx,
      providers,
      transaction,
      wallet: wallet
        ? {
            ...wallet,
            accountId: impersonate || wallet.accountId,
            accountDisplay: impersonate || wallet.accountDisplay,
          }
        : wallet,
    }),
    [clearTx, providers, transaction, wallet]
  )

  return (
    <WalletContext.Provider value={context}>{children}</WalletContext.Provider>
  )
}

export default WalletProvider
