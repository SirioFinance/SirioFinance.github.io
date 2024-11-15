import { HBAR_MAX_BUFFER } from '../../util/constants'

export default function ModalDashboard({
  amount,
  balance,
  hbarBuffer,
  onChange,
  token,
}) {
  const handleMax = () => {
    const value =
      token.isHbar && hbarBuffer
        ? Math.max(balance - HBAR_MAX_BUFFER, 0)
        : balance
    onChange(value)
  }

  return (
    <div className="info-dashboard-section">
      <h2 className="dashboard-main-balance">
        <input
          pattern="[0-9]+"
          onChange={(e) => onChange(e.target.value)}
          onFocus={(event) => event.target.select()}
          value={amount}
          placeholder="0.0"
          className="dashboard-input"
        />
      </h2>
      <div className="dashboard-mini-info" style={{ position: 'relative' }}>
        <p className="max">
          <button onClick={handleMax}>Max</button>
        </p>
        <p>{token.name}</p>
        <p className="mini-info-balance">{balance}</p>
      </div>
    </div>
  )
}
