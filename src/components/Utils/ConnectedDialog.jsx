import useWalletContext from '../../hooks/useWalletContext'
import Connect from '../Modal/content/Connect'
import Dialog from './Dialog'
import Transaction from '../Modal/content/Transaction'
import { useCallback, useEffect, useRef, useState } from 'react'
import { TX_DELAY } from '../../util/constants'

const TX_STATE_ACCEPT = 'accept'
const TX_STATE_REJECT = 'reject'
// const TX_STATE_SENT = 'sent'

const DEFAULT_STATE = {
  timeout: 0,
}

const ConnectedDialog = ({ children, onClose, open, ...other }) => {
  const [state, setState] = useState(DEFAULT_STATE)
  const { timeout } = state
  const { clearTx, transaction, wallet } = useWalletContext()
  const timeoutRef = useRef()

  // Wrapper to make sure we reset the timeout
  const innerOnClose = useCallback(() => {
    setState((prev) => ({ ...prev, timeout: 0 }))
    onClose()
  }, [onClose])

  // When we close the modal we want to clear the tx state
  const wrappedOnClose = useCallback(() => {
    // See silly hack in WalletProvider; allows us to keep modal
    // open for certain transactions.
    if (!transaction?._meta?.stayOpen) {
      innerOnClose()
    }
    clearTx()
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [clearTx, innerOnClose, transaction])

  // Always close the modal when there are no children to display
  // and no transaction is in progress and a wallet is already
  // connected.
  useEffect(() => {
    if (wallet && !transaction && !children) {
      innerOnClose()
    }
  }, [children, innerOnClose, transaction, wallet])

  useEffect(() => {
    if (
      [TX_STATE_ACCEPT, TX_STATE_REJECT].includes(transaction?.state) &&
      !timeoutRef.current &&
      open
    ) {
      setState((prev) => ({ ...prev, timeout: TX_DELAY }))
      timeoutRef.current = setTimeout(wrappedOnClose, TX_DELAY)
    }
  }, [open, transaction, wrappedOnClose])

  // If no wallet, show connect
  // Else if transacting, show transaction details
  // Else, show children
  let jsx = children
  if (!wallet) {
    jsx = <Connect onClose={wrappedOnClose} />
  } else if (transaction) {
    jsx = <Transaction transaction={transaction} />
  }

  return (
    open && (
      <Dialog onClose={wrappedOnClose} open={open} timeout={timeout} {...other}>
        {jsx}
      </Dialog>
    )
  )
}

export default ConnectedDialog
