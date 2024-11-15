import useGetAccount from './useGetAccount'

const useGetUserTokens = (accountId, overrides = {}) => {
  const query = useGetAccount(accountId, overrides)
  return { ...query, data: query.data?.balance?.tokens || [] }
}

export default useGetUserTokens
