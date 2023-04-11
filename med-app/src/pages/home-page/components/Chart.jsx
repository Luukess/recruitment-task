import React, { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = (props) => {

  const { patientsData, testsData } = props;

  const [defaultStatePatients, setDefaultStatePatients] = useState([]);
  const [defaultStateTests, setDefaultStateTests] = useState([]);

  const handleData = () => {
    if (patientsData) {
      const getWithProjects = patientsData.filter((element) => element.projectId !== null);
      const getWithoutProjects = patientsData.filter((element) => element.projectId === null);
      setDefaultStatePatients([getWithProjects.length, getWithoutProjects.length]);
    }
    if (testsData){
      const getFinishedTests = testsData.filter((element) => element.isFinished === true);
      const getNotFinishedTests = testsData.filter((element) => element.isFinished === false);
      setDefaultStateTests([getFinishedTests.length, getNotFinishedTests.length]);
    }
  }

  useEffect(() => {
    handleData();
  }, [patientsData, testsData]);

  const data = {
    labels: ['W projekcie', 'Bez projeku'],
    datasets: [
      {
        label: 'Łacznie',
        data: [...defaultStatePatients],
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
  };

  const dataTests = {
    labels: ['W trakcie', 'Zakończone'],
    datasets: [
      {
        label: 'Łacznie',
        data: [...defaultStateTests],
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

  return (
    <>
      <Box component="div" sx={{ width: '225px' }} >
        {defaultStatePatients.length > 0 ?
          <Doughnut data={data} options={options} />
          :
          null
        }
        {defaultStateTests.length > 0 ?
          <Doughnut data={dataTests} options={options} />
          :
          null
        }
      </Box>
    </>
  );
};

export default Chart;