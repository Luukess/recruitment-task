import React, { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import Chart from "./components/Chart";
import { Typography } from '@mui/material';
import { Sx } from "./homepage.style";
import { Select, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import BiotechIcon from '@mui/icons-material/Biotech';
import ListItem from './components/ListItem'
import { handleGetPatients, handleGetTests } from "../../services/api";

const HomePage = () => {

    const [patientSort, setPatientSort] = useState('asc');
    const [patientsArray, setPatientsArray] = useState([]);
    const [patientsError, setPatientsError] = useState({ error: false, message: '' });

    const [testsSort, setTestSort] = useState('ongoing');
    const [testsArray, setTestsArray] = useState([]);
    const [testsError, setTestsError] = useState({ error: false, message: '' });

    const handleGetAllPatients = async () => {
        try {
            const patientsResponse = await handleGetPatients();
            if (patientsResponse.status === 200) {
                sortPatients(patientsResponse.data, patientSort);
            };
        } catch (e) {
            console.log(e);
            setPatientsError({ error: true, message: 'Problem z serwerem!' });
        };
    };

    const handleGetAllTests = async () => {
        try {
            const testsResponse = await handleGetTests();
            if (testsResponse.status === 200) {
                setTestsArray(testsResponse.data);
            }
        } catch (e) {
            console.log(e);
            setTestsError({ error: true, message: 'Problem z serwerem' });
        }
    }

    const sortPatients = (data, sortMethod) => {
        if (data.length > 0) {
            if (sortMethod === 'asc') {
                const getData = [...data].sort((a, b) => (a.surname.toLowerCase() > b.surname.toLowerCase()) ? 1 : (a.surname.toLowerCase() < b.surname.toLowerCase()) ? -1 : 0);
                setPatientsArray(getData);
            } else if (sortMethod === 'desc') {
                const getData = [...data].sort((a, b) => (a.surname.toLowerCase() < b.surname.toLowerCase()) ? 1 : (a.surname.toLowerCase() > b.surname.toLowerCase()) ? -1 : 0);
                setPatientsArray(getData);
            };
        };
    };

    useEffect(() => {
        sortPatients(patientsArray, patientSort);
    }, [patientSort]);

    useEffect(() => {
        handleGetAllPatients();
        handleGetAllTests();
    }, []);

    return (
        <Container sx={Sx.containerSx}>
            <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={4} >
                    <Box component='div' sx={Sx.chartGridBoxSx}>
                        <Typography variant="h6" sx={Sx.chartHeaderSx}>
                            Pacjenci
                        </Typography>
                        <Box component='div' sx={Sx.chartBoxSx}>
                            <Chart patientsData={patientsArray} />
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
                                {!patientsError.error ?
                                    <>
                                        {patientsArray.length > 0 ? patientsArray?.map((patientData, i) => (
                                            <ListItem key={i} Sx={Sx} patientData={patientData} >
                                                <PersonIcon />
                                            </ListItem>
                                        ))
                                            :

                                            <Box component='div' sx={Sx.comunicateBoxSx}>
                                                <Typography>
                                                    Brak dancyh
                                                </Typography>
                                            </Box>
                                        }
                                    </>
                                    :
                                    <>
                                        <Box component='div' sx={Sx.comunicateBoxSx}>
                                            <Typography>
                                                {patientsError.message}
                                            </Typography>
                                        </Box>
                                    </>
                                }
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
                            <Chart testsData={testsArray} />
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
                                <MenuItem value={'all'}>Wszystkie</MenuItem>
                                <MenuItem value={'ongoing'}>W trakcie</MenuItem>
                                <MenuItem value={'finished'}>Zakończone</MenuItem>
                            </Select>
                        </Box>
                        <Box component='div' sx={Sx.listBoxSx}>
                            <Grid container spacing={1}>
                                {!testsError.error ?
                                    <>
                                        {testsArray.length > 0 ? testsArray?.map((testData, i) => (
                                            <ListItem key={i} Sx={Sx} tessData={testData}>
                                                <EnhancedEncryptionIcon />
                                            </ListItem>
                                        ))
                                            :

                                            <Box component='div' sx={Sx.comunicateBoxSx}>
                                                <Typography>
                                                    Brak dancyh
                                                </Typography>
                                            </Box>
                                        }
                                    </>
                                    :
                                    <>
                                        <Box component='div' sx={Sx.comunicateBoxSx}>
                                            <Typography>
                                                {testsError.message}
                                            </Typography>
                                        </Box>
                                    </>
                                }
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