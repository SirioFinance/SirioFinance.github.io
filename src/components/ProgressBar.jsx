import { Tooltip } from '@mui/material'

const BLUE = '#3251bf'
const RED = '#b30b13'
const DARK_RED = '#7b0c1b'
const THRESHOLD = 85

const ProgressBar = ({ progressPercentage, height, threshold = false }) => {
  const lineColor = progressPercentage > 75 ? RED : BLUE
  const amount = Math.min(progressPercentage || 0, 100)
  const offset = 0 // Width of white border
  return (
    <div style={{ width: '100%' }}>
      <div
        className="progressLine"
        style={{
          background: `linear-gradient(90deg, white 0% ${THRESHOLD}%, rgba(255, 255, 255, 0.0) ${amount}% 100%)`,
          borderRadius: `${height / 2}px`,
          padding: `${offset}px`,
          position: 'relative',
          width: '100%',
        }}
      >
        <div
          style={{
            background: `linear-gradient(90deg, ${lineColor} 0% ${amount}%, white ${amount}% 100%)`,
            borderRadius: `${height / 2}px`,
            height: `${height}px`,
            width: '100%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            backgroundColor: lineColor,
            border: `${offset}px solid white`,
            borderRadius: `${height + offset}px`,
            height: `${height * 2 + offset}px`,
            width: `${height * 2 + offset}px`,
            left: `calc(${amount}% - ${height / 2 + offset}px)`,
            top: `-${height / 2 - offset / 2}px`,
          }}
        />

        {threshold && (
          <Tooltip
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, height],
                    },
                  },
                ],
              },
            }}
            title={`Liquidation Threshold (${THRESHOLD}%)`}
          >
            <div
              style={{
                position: 'absolute',
                backgroundColor: DARK_RED,
                borderRadius: `${height}px`,
                height: `${height * 2}px`,
                left: `calc(${THRESHOLD}% - ${height / 2 + offset}px)`,
                top: `-${height / 2 - offset}px`,
                width: `${height * 2}px`,
              }}
            />
          </Tooltip>
        )}
      </div>
    </div>
  )
}

export default ProgressBar
