import Button from '../../Utils/Button'

const Risk = ({ onContinue, onGoBack }) => (
  <div className="popup-options risk-popup">
    <div className="risk-circle">
      <p>&nbsp;75%</p>
    </div>
    <div className="risk-text">
      The probability shown above represents the likelihood of your loan being
      liquidated, as calculated by our model. This model has been trained with
      data from millions of loans and dozens of variables, including your
      collateral and its allocations, global market conditions, and more. If the
      probability exceeds 50%, we recommend reducing the amount of assets you
      have borrowed or increasing your collateral. Otherwise, you may be more
      susceptible to liquidation.
      <a href=""> Read the docs to know more. </a>
    </div>
    <div className="buttons-container">
      <div className="risk-buttons">
        <Button type="secondary-btn" onClick={onContinue}>
          Continue
        </Button>
        <Button type="secondary-btn" onClick={onGoBack}>
          Go Back
        </Button>
      </div>
    </div>
  </div>
)

export default Risk
