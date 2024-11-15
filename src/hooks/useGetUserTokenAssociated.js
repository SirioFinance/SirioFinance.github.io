import useGetUserTokens from './useGetUserTokens'

const useGetUserTokenAssociated = (accountId, tokenId, isHbar, overrides) => {
  const { data: tokens } = useGetUserTokens(accountId, overrides)
  return isHbar || tokens.find(({ token_id }) => token_id === tokenId)
}

export default useGetUserTokenAssociated
