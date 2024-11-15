import { Grid } from '@mui/material'
import './style.css'

export default function MinItem({ max, min }) {
  return (
    <Grid
      alignItems="center"
      container
      flexDirection="column"
      item
      justifyContent="center"
      py={2}
      xs
    >
      <p>{max}</p>
      {min && <span className="small-text">{min}</span>}
    </Grid>
  )
}
