import React, { useEffect, useState } from "react";
import {
    Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Stack, Typography
} from '@mui/material';
import { handleGetProjects } from "../../services/api";
import { Sx } from "./projectspage.style";
import FilterComponent from "./components/FilterComponent";
import { handleFilterProjects } from "../../utils/filteringFunction";
import FormModal from "./components/formModal/FormModal";
import AddProjectForm from "./components/addProjectForm/AddProjectForm";


const ProjectsPage = () => {

    const [projectsArray, setProjectsArray] = useState([]);
    const [projectsError, setProjectsError] = useState({ error: false, message: '' });
    const [openModalAddProject, setOpenModalAddProject] = useState(false);

    const [selectProjectFilter, setSelectProjectFilter] = useState('all');
    const [selectStartDate, setSelectStartDate] = useState('');
    const [selectState, setSelectState] = useState('all');

    const filteredProjects = [...handleFilterProjects(projectsArray, selectProjectFilter, selectStartDate, selectState)];

    const [currentPage, setCurrentPage] = useState(1);
    const recordsOnPage = 4;
    const lastIndex = currentPage * recordsOnPage;
    const firstIndex = lastIndex - recordsOnPage;
    const records = filteredProjects.slice(firstIndex, lastIndex);
    const countPages = Math.ceil(filteredProjects.length / recordsOnPage)

    const onClickAddProject = () => {
        setOpenModalAddProject(!openModalAddProject);
    };

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
        setCurrentPage(page);
        setSelectProjectFilter('all');
    }

    useEffect(() => {
        handleGetAllProjects();
    }, []);

    return (
        <>
            <FormModal
                openModalAddProject={openModalAddProject}
                onClickAddProject={onClickAddProject}
            >
                    <AddProjectForm />
            </FormModal>
            <Container >
                <Box sx={Sx.mainBoxSx} >
                    <Box component='div'>
                        <FilterComponent
                            records={records}
                            selectProjectFilter={selectProjectFilter}
                            setSelectProjectFilter={setSelectProjectFilter}
                            selectStartDate={selectStartDate}
                            setSelectStartDate={setSelectStartDate}
                            selectState={selectState}
                            setSelectState={setSelectState}
                            onClickAddProject={onClickAddProject}
                        />
                    </Box>

                    <Box component='div' sx={Sx.tableBoxSx}>
                        <TableContainer sx={{ height: '100%' }} component={Paper} aria-label="projects table">
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
                                {!projectsError.error &&
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
                                }
                            </Table>
                        </TableContainer>
                    </Box>

                    {projectsError.error &&
                        <Box component='div' sx={Sx.errorBoxSx}>
                            <Typography>
                                {`${projectsError.message} sdsd`}
                            </Typography>
                        </Box>
                    }

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