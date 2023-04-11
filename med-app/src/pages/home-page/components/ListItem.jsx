import React from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { Paper, Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';

const ListItem = (props) => {

    const { Sx, children, patientData, tessData, projectsData } = props;

    return (
        <>
            <Grid xs={12}>
                <Paper sx={Sx.elementListSx} >
                    <Avatar>
                        {children}
                    </Avatar>
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
                    {tessData &&
                        <Box sx={{ width: 'calc(100% - 45px)', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }} >
                            <Typography align="center" sx={{ width: '300px', fontSize: '13px' }}>
                                {`${tessData.testName}`}
                            </Typography>
                        </Box>
                    }
                </Paper>
            </Grid>
        </>
    );
};

export default ListItem;