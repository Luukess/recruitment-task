import React from "react";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const HomePage = () => {


    return (
        <Container fixed sx={{ backgroundColor: 'red', height: '100%'}}>
            <Grid container spacing={2}>
                <Grid xs={12} sm={4} >
                    <Box component='div' sx={{ backgroundColor: 'yellow', height: '255px' }}>
                        Wykres użytkowników
                    </Box>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Box component='div' sx={{ backgroundColor: 'pink', height: '255px' }}>
                        lista pacjentów
                    </Box>
                </Grid>
                <Grid xs={12} sm={4}>
                    <Box component='div' sx={{ backgroundColor: 'pink', height: '255px' }}>
                        wykres badań
                    </Box>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Box component='div' sx={{ backgroundColor: 'pink', height: '255px' }}>
                        Lista badań
                    </Box>
                </Grid>
                <Grid xs={12} >
                    <Box component='div' sx={{ backgroundColor: 'pink', height: '255px' }}>
                        Lista projeków
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;