// All URLs in config are assumed to have no trailing slash; this is
// a failsafe in case the configuration is invalid
const removeTrailingSlash = (string) =>
  string?.endsWith('/') ? string.slice(0, -1) : string

export const APP_DESCRIPTION = import.meta.env.VITE_APP_DESCRIPTION
export const APP_ID_BLADE = import.meta.env.VITE_APP_ID_BLADE
export const APP_ID_HASHPACK = import.meta.env.VITE_APP_ID_HASHPACK
export const APP_NAME = import.meta.env.VITE_APP_NAME
export const BLOCKS_PER_YEAR = parseInt(import.meta.env.VITE_BLOCKS_PER_YEAR)
export const CONTRACT_INTEREST_RATE_MODEL = import.meta.env
  .VITE_CONTRACT_INTEREST_RATE_MODEL
export const CONTRACT_PRICE_ORACLE = import.meta.env.VITE_CONTRACT_PRICE_ORACLE
export const CONTRACT_MARKET_POSITION_MANAGER = import.meta.env
  .VITE_CONTRACT_MARKET_POSITION_MANAGER
export const CONTRACT_EVM_INTEREST_RATE_MODEL = import.meta.env
  .VITE_CONTRACT_EVM_INTEREST_RATE_MODEL
export const CONTRACT_EVM_PRICE_ORACLE = import.meta.env
  .VITE_CONTRACT_EVM_PRICE_ORACLE
export const CONTRACT_EVM_MARKET_POSITION_MANAGER = import.meta.env
  .VITE_CONTRACT_EVM_MARKET_POSITION_MANAGER
export const HBAR_MAX_BUFFER = parseFloat(
  import.meta.env.VITE_HBAR_MAX_BUFFER ?? 5
)
export const HEDERA_NETWORK = import.meta.env.VITE_HEDERA_NETWORK
export const METAMASK_NETWORK = import.meta.env.VITE_METAMASK_NETWORK // Hex-encoded
export const TX_DELAY = parseInt(import.meta.env.VITE_TX_DELAY) || 6000 // Delay in ms
export const MIRROR_NODE_URL = removeTrailingSlash(
  import.meta.env.VITE_MIRROR_NODE_URL
)
export const NETWORK_EXPLORER_URL = removeTrailingSlash(
  import.meta.env.VITE_NETWORK_EXPLORER_URL
)
export const RPC_URL = removeTrailingSlash(import.meta.env.VITE_RPC_URL)
export const SUPPORTED_TOKENS = JSON.parse(
  import.meta.env.VITE_SUPPORTED_TOKENS
)
export const UNKNOWN_TOKEN = { name: 'Unknown', icon: '#' }
