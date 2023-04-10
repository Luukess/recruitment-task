import React from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { Paper, Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';

const ListItem = (props) => {

    const { Sx, children, patientData, testsData, projectsData } = props;

    return (
        <>
            <Grid xs={12}>
                <Paper sx={Sx.elementListSx} >
                    <Avatar>
                        {children}
                    </Avatar>
                    {/* <Typography sx={{ marginLeft: '10px' }}> */}
                    {/* {testsData && testsData} */}
                    {/* {patientData && `${patientData.surname} ${patientData.name}`}
                        {projectsData && projectsData} */}
                    {/* </Typography> */}

                    {testsData &&
                        <Typography sx={{ marginLeft: '10px' }}>
                            {testsData}
                        </Typography>
                    }

                    {projectsData &&
                        <Typography sx={{ marginLeft: '10px' }}>
                            {projectsData}
                        </Typography>
                    }

                    {patientData &&
                        <Box sx={{ width: 'calc(100% - 45px)', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }} >
                            <Typography align="center" sx={{ width: '300px', fontSize: '13px' }}>
                                {`${patientData.surname} ${patientData.name}`}
                            </Typography>
                            <Typography align="center" sx={{ width: '300px', fontSize: '13px' }}>
                                {`${patientData.email}`}
                            </Typography>
                        </Box>
                    }
                </Paper>
            </Grid>
        </>
    );
};

export default ListItem;