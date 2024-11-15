import { useState } from 'react'
import Dialog from '../Utils/Dialog'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Button from '../Utils/Button'

const LOCAL_STORAGE_KEY = 'acknowledged'

const DEFAULT_STATE = {
  acknowledged: false,
  doNotShow: false,
}

export default function ModalIntro() {
  const [state, setState] = useState(DEFAULT_STATE)
  const { acknowledged, doNotShow } = state

  const doNotShowStorage = localStorage.getItem(LOCAL_STORAGE_KEY)

  const handleClose = () => {
    if (doNotShow) {
      localStorage.setItem(LOCAL_STORAGE_KEY, 'true')
    }

    setState((prev) => ({ ...prev, acknowledged: true }))
  }

  return (
    <Dialog className="wide" open={!doNotShowStorage && !acknowledged}>
      <div className="popup-markets-container show">
        <h3 style={{ marginBottom: '10px' }}>
          Want to learn more about Sirio?
        </h3>
        <div
          style={{ fontSize: '16px', fontWeight: 'normal', lineHeight: '20px' }}
        >
          <p>
            Feel free to visit our{' '}
            <a
              href="https://astrid.gitbook.io/sirio"
              rel="noreferrer"
              target="_blank"
            >
              documentation
            </a>
            , where you can find a detailed explanation for each feature
            available, accompanied by a video-tutorial.
          </p>
          <div style={{ margin: '10px 0px', textAlign: 'left', width: '100%' }}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() =>
                    setState((prev) => ({ ...prev, doNotShow: !doNotShow }))
                  }
                  size="small"
                />
              }
              label={
                <Typography sx={{ fontSize: '12px', fontWeight: 'normal' }}>
                  Never show again
                </Typography>
              }
            />
          </div>
        </div>
        <Button type="secondary-btn" className="small" onClick={handleClose}>
          Close
        </Button>
      </div>
    </Dialog>
  )
}
