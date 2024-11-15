import useDialog from '../../hooks/useDialog'
import useGetTokens from '../../hooks/useGetTokens'
import MinItem from '../marketscontainer/ListItemWithMin'
import ModalLiquidate from '../Modal/ModalLiquidate'
import AccountId from '../Utils/AccountId'
import Button from '../Utils/Button'

export default function LiquidationListItem({
  amount,
  borrower,
  debt,
  reward,
  rewardAssets,
}) {
  const liquidateDialogProps = useDialog()
  const { data: tokens } = useGetTokens()
  const assetReward = reward.map((el) => Math.floor(el * 1000) / 1000)

  return (
    <>
      <div
        className="row"
        style={{
          padding: '20px 10px',
          marginBottom: 0,
        }}
      >
        <span className="asset-cell">{`$${
          Math.floor(debt * 1000) / 1000
        }`}</span>
        <div className="cell">
          <span title={borrower}>
            <AccountId accountId={borrower} />
          </span>
        </div>
        <div className="cell">
          {rewardAssets.map((asset, index) => {
            const { icon, name } =
              tokens.find((token) => token.name === asset) || {} // Just in case
            return <img src={icon} alt={name} key={index} />
          })}
        </div>
        <MinItem
          max={`${assetReward.join(', ')}`}
          min={`$${Math.floor(amount * 1000) / 1000}`}
        />
        <div className="cell">
          <Button
            className="small"
            onClick={liquidateDialogProps.onRequestOpen}
            size="small"
            type="secondary-btn"
          >
            Liquidate
          </Button>
        </div>
      </div>

      <ModalLiquidate
        {...liquidateDialogProps}
        borrower={borrower}
        debt={debt}
        rewards={reward}
        rewardAssets={rewardAssets}
      />
    </>
  )
}
