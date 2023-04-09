import React from "react";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const HomePage = () => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

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