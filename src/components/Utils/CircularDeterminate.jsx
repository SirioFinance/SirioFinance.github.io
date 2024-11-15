import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'

const DEFAULT_STATE = {
  progress: 100,
}

const CircularDeterminate = ({ timeout, ...other }) => {
  const [state, setState] = useState(DEFAULT_STATE)
  const { progress } = state

  useEffect(() => {
    const increments = 200
    const timer = setInterval(() => {
      setState((prev) => ({
        ...prev,
        // Skipping one increment to compensate for delay
        progress: Math.max(
          prev.progress - 100 / ((timeout - increments) / increments),
          0
        ),
      }))
    }, increments)

    return () => {
      clearInterval(timer)
    }
  }, [timeout])

  return <CircularProgress variant="determinate" value={progress} {...other} />
}

export default CircularDeterminate
