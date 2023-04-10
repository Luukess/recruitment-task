import React, { useState } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Chart from "./components/Chart";
import { Typography } from '@mui/material';
import { Sx } from "./homepage.style";
import { Select, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import BiotechIcon from '@mui/icons-material/Biotech';
import ListItem from "./ListItem";

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
                                <ListItem Sx={Sx} patientsData={'dane pacjenta'} >
                                    <PersonIcon />
                                </ListItem>
                                <ListItem Sx={Sx} patientsData={'dane pacjenta'} >
                                    <PersonIcon />
                                </ListItem>
                                <ListItem Sx={Sx} patientsData={'dane pacjenta'} >
                                    <PersonIcon />
                                </ListItem>
                                <ListItem Sx={Sx} patientsData={'dane pacjenta'} >
                                    <PersonIcon />
                                </ListItem>
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
                <Grid xs={12} sm={12} md={8}>
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
                                <ListItem Sx={Sx} testsData={'dane badań'}>
                                    <EnhancedEncryptionIcon />
                                </ListItem>
                                <ListItem Sx={Sx} testsData={'dane badań'}>
                                    <EnhancedEncryptionIcon />
                                </ListItem>
                                <ListItem Sx={Sx} testsData={'dane badań'}>
                                    <EnhancedEncryptionIcon />
                                </ListItem>
                                <ListItem Sx={Sx} testsData={'dane badań'}>
                                    <EnhancedEncryptionIcon />
                                </ListItem>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={12} >
                    <Box component='div' sx={Sx.listGridBoxSx}>
                        <Box component='div' sx={{ padding: '10px' }}>
                            <Typography variant="h6">
                                Projekty badawcze
                            </Typography>
                        </Box>
                        <Box component='div' sx={Sx.listBoxSx}>
                            <Grid container spacing={1}>
                                <ListItem Sx={Sx} projectsData={'dane projektów'}>
                                    <BiotechIcon />
                                </ListItem>
                                <ListItem Sx={Sx} projectsData={'dane projektów'}>
                                    <BiotechIcon />
                                </ListItem>
                                <ListItem Sx={Sx} projectsData={'dane projektów'}>
                                    <BiotechIcon />
                                </ListItem>
                                <ListItem Sx={Sx} projectsData={'dane projektów'}>
                                    <BiotechIcon />
                                </ListItem>
                                <ListItem Sx={Sx} projectsData={'dane projektów'}>
                                    <BiotechIcon />
                                </ListItem>
                                <ListItem Sx={Sx} projectsData={'dane projektów'}>
                                    <BiotechIcon />
                                </ListItem>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;