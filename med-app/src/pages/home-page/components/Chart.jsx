import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Box from '@mui/material/Box';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {

  const data = {
    labels: ['W projekcie', 'Bez projeku'],
    datasets: [
      {
        label: 'Suma',
        data: [12, 19],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
    legend: {
        diaplay: false
    }
  };

  const options = {
        plugins: {
            legend: {
                position: 'bottom',
            },
            border: {
                display: false
            },
        }
  }

    return(
        <>
            <Box component="div" sx={{width: '225px'}} >
                <Doughnut data={data} options={options} />
            </Box>
        </>
    );
};

export default Chart;