import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import { Box } from '@mui/material'

Chart.defaults.color = '#FFF'
Chart.defaults.plugins.legend.position = 'bottom'
Chart.register(CategoryScale)

function TokenPieChart({ chartData }) {
  return (
    <Box width={{ xs: '300px', md: '400px' }}>
      <Doughnut
        data={chartData}
        options={{
          aspectRatio: 1.5,
          legend: {
            labels: {
              fontColor: 'white',
            },
          },
          responsive: true,
        }}
      />
    </Box>
  )
}
export default TokenPieChart
