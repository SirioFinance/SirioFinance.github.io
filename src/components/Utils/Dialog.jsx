import React from 'react'
import MuiDialog from '@mui/material/Dialog'
import MuiDialogContent from '@mui/material/DialogContent'
import '../Modal/modal.css'
import Grow from '@mui/material/Grow'
import classNames from 'classnames'
import { Box, IconButton } from '@mui/material'
import CircularDeterminate from './CircularDeterminate'
import CloseIcon from '@mui/icons-material/Close'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />
})

const Dialog = ({ children, className, onClose, open, timeout }) => {
  return (
    <MuiDialog
      onClose={(event) => {
        event.stopPropagation()
        onClose()
      }}
      open={open}
      slotProps={{
        backdrop: { style: { backgroundColor: 'rgba(0,0,180,0.1)' } },
      }}
      PaperProps={{ elevation: 6 }}
      TransitionComponent={Transition}
    >
      <div className={classNames('modal popup-container', className)}>
        <Box display="flex" justifyContent="space-between" px={2} pt={2}>
          {onClose ? (
            <IconButton
              onClick={(event) => {
                event.stopPropagation()
                onClose()
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <div></div>
          )}
          {!!timeout && (
            <IconButton disabled>
              <CircularDeterminate size="1.5rem" timeout={timeout} />
            </IconButton>
          )}
        </Box>
        <MuiDialogContent>{children}</MuiDialogContent>
      </div>
    </MuiDialog>
  )
}

export default Dialog
