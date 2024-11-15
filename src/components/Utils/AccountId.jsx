const AccountId = ({ accountId }) => {
  return accountId.length > 30
    ? `${accountId.slice(0, 9)}...${accountId.slice(-5)}`
    : accountId
}

export default AccountId
