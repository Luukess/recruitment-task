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
import { handleGetPatients, handleGetProjects, handleGetTests } from "../../services/api";
import { handleFilterTests } from "../../utils/filteringFunction";

const HomePage = () => {

    const [patientSort, setPatientSort] = useState('asc');
    const [patientsArray, setPatientsArray] = useState([]);
    const [patientsError, setPatientsError] = useState({ error: false, message: '' });

    const [testsSort, setTestSort] = useState('all');
    const [testsArray, setTestsArray] = useState([]);
    const [testsError, setTestsError] = useState({ error: false, message: '' });

    const [projectsArray, setProjectsArray] = useState([]);
    const [projectsError, setProjectsError] = useState({ error: false, message: '' });

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
            };
        } catch (e) {
            console.log(e);
            setTestsError({ error: true, message: 'Problem z serwerem' });
        };
    };

    const handleGetAllProjects = async () => {
        try {
            const responseProjects = await handleGetProjects();
            if (responseProjects.status === 200) {
                setProjectsArray(responseProjects.data);
            };
        } catch (e) {
            console.log(e);
            setProjectsError({ error: true, message: 'Problem z serwerem' });
        };
    };

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

    const testsAllData = [...handleFilterTests(testsArray, testsSort)];

    useEffect(() => {
        sortPatients(patientsArray, patientSort);
    }, [patientSort]);

    useEffect(() => {
        handleGetAllPatients();
        handleGetAllTests();
        handleGetAllProjects();
    }, []);

    return (
        <Container sx={Sx.containerSx}>
            <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={4} >
                    <Box component='div' sx={{ ...Sx.chartGridBoxSx, boxShadow: 3 }}>
                        <Typography variant="h6" sx={Sx.chartHeaderSx}>
                            Pacjenci
                        </Typography>
                        <Box component='div' sx={Sx.chartBoxSx}>
                            <Chart patientsData={patientsArray} />
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={12} sm={12} md={8}>
                    <Box component='div' sx={{...Sx.listGridBoxSx, boxShadow: 3}}>
                        <Box component='div' sx={Sx.listGridBoxSortSx}>
                            <Select
                                sx={Sx.filterSelectSx}
                                variant="filled"
                                id="patient-list-select"
                                size="small"
                                value={patientSort}
                                onChange={(e) => setPatientSort(e.target.value)}
                            >
                                <MenuItem value={'asc'}>Sort. A - Z</MenuItem>
                                <MenuItem value={'desc'}>Sort. Z - A</MenuItem>
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
                    <Box component='div' sx={{...Sx.chartGridBoxSx, boxShadow: 3}} >
                        <Typography variant="h6" sx={Sx.chartHeaderSx}>
                            Badania
                        </Typography>
                        <Box sx={Sx.chartBoxSx}>
                            <Chart testsData={testsArray} />
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={12} sm={12} md={8}>
                    <Box component='div' sx={{...Sx.listGridBoxSx, boxShadow: 3}}>
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
                                        {testsAllData.length > 0 ? testsAllData?.map((testData, i) => (
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
                    <Box component='div' sx={{...Sx.listGridBoxSx, boxShadow: 3}}>
                        <Box component='div' sx={{ padding: '10px' }}>
                            <Typography variant="h6">
                                Projekty
                            </Typography>
                        </Box>
                        <Box component='div' sx={Sx.listBoxSx}>
                            <Grid container spacing={1}>
                                {!projectsError.error ?
                                    <>
                                        {projectsArray.length > 0 ? projectsArray?.map((projectData, i) => (
                                            <ListItem key={i} Sx={Sx} projectData={projectData}>
                                                <BiotechIcon />
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
                                                {projectsError.message}
                                            </Typography>
                                        </Box>
                                    </>
                                }
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;