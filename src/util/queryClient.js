import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Disabling because we have way too many queries right now
      // TODO: Possibly re-enable this in the future
      refetchOnWindowFocus: false,
    },
  },
})

export default queryClient
