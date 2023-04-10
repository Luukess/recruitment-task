import React, { useState } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Chart from "./components/Chart";
import { Typography } from '@mui/material';
import { Sx } from "./homepage.style";
import { Select, MenuItem, Paper, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';

const HomePage = () => {

    const [patientSort, setPatientSort] = useState('asc');
    const [testsSort, setTestSort] = useState('asc');

    return (
        <Container sx={Sx.containerSx}>
            <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={4} >
                    <Box component='div' sx={Sx.chartGridBoxSx}>
                        <Typography variant="h6" sx={Sx.chartHeaderSx}>
                            Pacjenci
                        </Typography>
                        <Box component='div' sx={Sx.chartBoxSx}>
                            <Chart />
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={12} sm={12} md={8}>
                    <Box component='div' sx={Sx.listGridBoxSx}>
                        <Box component='div' sx={Sx.listGridBoxSortSx}>
                            <Select
                                sx={Sx.filterSelectSx}
                                variant="filled"
                                id="patient-list-select"
                                size="small"
                                value={patientSort}
                                onChange={(e) => setPatientSort(e.target.value)}
                            >
                                <MenuItem value={'asc'}>Sort. rosnąco</MenuItem>
                                <MenuItem value={'desc'}>Sort. malejąco</MenuItem>
                            </Select>
                        </Box>
                        <Box component='div' sx={Sx.listBoxSx}>
                            <Grid container spacing={1}>
                                <Grid xs={12}>
                                    <Paper sx={Sx.elementListSx} >
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                        <Typography sx={{marginLeft: '10px'}}>Imię i nazwisko</Typography>
                                    </Paper>
                                </Grid>
                                <Grid xs={12}>
                                    <Paper sx={Sx.elementListSx} > assadsa </Paper>
                                </Grid>
                                <Grid xs={12}>
                                    <Paper sx={Sx.elementListSx} > assadsa </Paper>
                                </Grid>
                                <Grid xs={12}>
                                    <Paper sx={Sx.elementListSx} > assadsa </Paper>
                                </Grid>
                                <Grid xs={12}>
                                    <Paper sx={Sx.elementListSx} > assadsa </Paper>
                                </Grid>
                                <Grid xs={12}>
                                    <Paper sx={Sx.elementListSx} > assadsa </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={12} sm={12} md={4} >
                    <Box component='div' sx={Sx.chartGridBoxSx} >
                        <Typography variant="h6" sx={Sx.chartHeaderSx}>
                            Badania
                        </Typography>
                        <Box sx={Sx.chartBoxSx}>
                            <Chart />
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Box component='div' sx={Sx.listGridBoxSx}>
                        <Box component='div' sx={Sx.listGridBoxSortSx}>
                            <Select
                                sx={Sx.filterSelectSx}
                                variant="filled"
                                id="tests-list-select"
                                size="small"
                                value={testsSort}
                                onChange={(e) => setTestSort(e.target.value)}
                            >
                                <MenuItem value={'asc'}>Sort. rosnąco</MenuItem>
                                <MenuItem value={'desc'}>Sort. malejąco</MenuItem>
                            </Select>
                        </Box>
                        <Box component='div' sx={Sx.listBoxSx}>
                            <Grid container spacing={1}>
                                <Grid xs={12}>
                                    <Paper sx={Sx.elementListSx} >
                                        <Avatar>
                                            <EnhancedEncryptionIcon />
                                        </Avatar>
                                        <Typography sx={{marginLeft: '10px'}}>Nazwa badania</Typography>
                                    </Paper>
                                </Grid>
                                <Grid xs={12}>
                                    <Paper sx={Sx.elementListSx} > assadsa </Paper>
                                </Grid>
                                <Grid xs={12}>
                                    <Paper sx={Sx.elementListSx} > assadsa </Paper>
                                </Grid>
                                <Grid xs={12}>
                                    <Paper sx={Sx.elementListSx} > assadsa </Paper>
                                </Grid>
                                <Grid xs={12}>
                                    <Paper sx={Sx.elementListSx} > assadsa </Paper>
                                </Grid>
                                <Grid xs={12}>
                                    <Paper sx={Sx.elementListSx} > assadsa </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={12} >
                    <Box component='div' sx={Sx.listGridBoxSx}>
                        Lista projeków
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;