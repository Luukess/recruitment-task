import React, { useEffect, useState } from "react";
import {
    Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Stack
} from '@mui/material';
import { handleGetProjects } from "../../services/api";
import { Sx } from "./projectspage.style";
import FilterComponent from "./components/FilterComponent";


const ProjectsPage = () => {

    const [projectsArray, setProjectsArray] = useState([]);
    const [projectsError, setProjectsError] = useState({ error: false, message: '' });

    const [selectProjectFilter, setSelectProjectFilter] = useState('all');

    const [currentPage, setCurrentPage] = useState(1);
    const recordsOnPage = 4;
    const lastIndex = currentPage * recordsOnPage;
    const firstIndex = lastIndex - recordsOnPage;
    const records = projectsArray.slice(firstIndex, lastIndex);
    const countPages = Math.ceil(projectsArray.length / recordsOnPage)

    const handleGetAllProjects = async () => {
        try {
            const projectsResponse = await handleGetProjects();
            if (projectsResponse.status === 200) {
                setProjectsArray(projectsResponse.data);
            }
        } catch (e) {
            console.log(e);
            setProjectsError({ error: true, message: 'Problem z serwerem!' });
        };
    };

    const handlePagination = (event, page) => {
        console.log({ event }, { page });
        setCurrentPage(page);
    }

    useEffect(() => {
        handleGetAllProjects();
    }, []);

    return (
        <>
            <Container >
                <Box sx={{ bgcolor: '#cfe8fc', height: 'calc(100vh - 58px)' }} >
                    <Box component='div'>
                        <FilterComponent
                            records={records}
                            selectProjectFilter={selectProjectFilter}
                            setSelectProjectFilter={setSelectProjectFilter}
                        />
                    </Box>
                    <TableContainer component={Paper} aria-label="projects table">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={Sx.tableCellSx} align="center">Typ projektu</TableCell>
                                    <TableCell sx={Sx.tableCellSx} align="center">Tytuł</TableCell>
                                    <TableCell sx={Sx.tableCellSx} align="center" >Alias</TableCell>
                                    <TableCell sx={Sx.tableCellSx} align="center" >Data rozp.</TableCell>
                                    <TableCell sx={Sx.tableCellSx} align="center" >Data zak.</TableCell>
                                    <TableCell sx={Sx.tableCellSx} align="center" >Stan projektu</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {records?.map((project, i) => (
                                    <TableRow key={i}>
                                        <TableCell align="center">
                                            {project.projectType}
                                        </TableCell>
                                        <TableCell align="center">
                                            {project.title}
                                        </TableCell>
                                        <TableCell align="center">
                                            {project.pNumber}
                                        </TableCell>
                                        <TableCell align="center">
                                            {project.dataStarted}
                                        </TableCell>
                                        <TableCell align="center">
                                            {project.dataCompleted ?
                                                `${project.dataCompleted}`
                                                :
                                                'Brak'
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                            {project.isFinished ?
                                                'Zakończony'
                                                :
                                                'W trakcie'
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box component='div' sx={Sx.paginationContainerSx}>
                        <Box component='div' >
                            <Stack spacing={2}>
                                <Pagination count={countPages} onChange={handlePagination} color="primary" />
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default ProjectsPage;