import React from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { Paper, Avatar } from '@mui/material';
import { Typography } from '@mui/material';

const ListItem = (props) => {

    const { Sx, children, patientsData, testsData } = props;

    return (
        <>
            <Grid xs={12}>
                <Paper sx={Sx.elementListSx} >
                    <Avatar>
                        {children}
                    </Avatar>
                    <Typography sx={{ marginLeft: '10px' }}>{patientsData ? patientsData : testsData}</Typography>
                </Paper>
            </Grid>
        </>
    );
};

export default ListItem;