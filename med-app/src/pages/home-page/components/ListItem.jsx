import React from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { Paper, Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { useTheme } from "@emotion/react";

const ListItem = (props) => {

    const theme = useTheme();

    const { Sx, children, patientData, tessData, projectData } = props;

    return (
        <>
            <Grid xs={12}>
                <Paper sx={{...Sx.elementListSx, backgroundColor: theme.palette.primary.light}} >
                    <Avatar>
                        {children}
                    </Avatar>
                    {projectData &&
                        <Box sx={{ width: 'calc(100% - 45px)', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <Typography align="center" sx={{ width: '300px', fontSize: '13px', padding: '4px 0' }}>
                                {projectData.projectType}
                            </Typography>
                            <Typography align="center" sx={{ width: '300px', fontSize: '13px', padding: '4px 0' }}>
                                {`Nazwa projektu: ${projectData.title}`}
                            </Typography>
                            <Typography align="center" sx={{ width: '300px', fontSize: '13px', padding: '4px 0' }}>
                                {`Data Rozpocząecia: ${projectData.dateStarted}`}
                            </Typography>
                        </Box>
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