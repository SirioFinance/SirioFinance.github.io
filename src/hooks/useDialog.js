import { useCallback, useState } from 'react'

const DEFAULT_STATE = {
  open: false,
}

const useDialog = (overrides) => {
  const [state, setState] = useState(DEFAULT_STATE)
  const { open } = state
  const onClose = useCallback(
    () => setState((prev) => ({ ...prev, open: false })),
    []
  )
  const onRequestOpen = useCallback(() => {
    setState((prev) => ({ ...prev, open: true }))
  }, [])

  return {
    open,
    onClose,
    onRequestOpen,
    ...overrides,
  }
}

export default useDialog
