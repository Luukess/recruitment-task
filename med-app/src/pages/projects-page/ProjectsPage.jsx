import React, { useEffect, useState } from "react";
import {
    Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Stack, Typography, IconButton
} from '@mui/material';
import { handleGetProjects } from "../../services/api";
import { Sx } from "./projectspage.style";
import FilterComponent from "./components/FilterComponent";
import { handleFilterProjects } from "../../utils/filteringFunction";
import FormModal from "./components/formModal/FormModal";
import AddProjectForm from "./components/addProjectForm/AddProjectForm";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteIcon from '@mui/icons-material/Delete';
import ProjectDetails from "./components/projectDetails/ProjectDetails";


const ProjectsPage = () => {

    const [projectsArray, setProjectsArray] = useState([]);
    const [projectsError, setProjectsError] = useState({ error: false, message: '' });
    const [openModalAddProject, setOpenModalAddProject] = useState(false);
    const [openModalWithDetails, setOpenModalWithDetails] = useState(false);
    const [getProjectId, setGetProjectId] = useState(null);
    console.log(getProjectId)
    const [selectProjectFilter, setSelectProjectFilter] = useState('all');
    const [selectStartDate, setSelectStartDate] = useState('');
    const [selectState, setSelectState] = useState('all');

    const filteredProjects = [...handleFilterProjects(projectsArray, selectProjectFilter, selectStartDate, selectState)];

    const [currentPage, setCurrentPage] = useState(1);
    const recordsOnPage = 6;
    const lastIndex = currentPage * recordsOnPage;
    const firstIndex = lastIndex - recordsOnPage;
    const records = filteredProjects.slice(firstIndex, lastIndex);
    const countPages = Math.ceil(filteredProjects.length / recordsOnPage)

    const onClickAddProject = () => {
        setOpenModalAddProject(!openModalAddProject);
    };

    const onClickCloseDetails = () => {
        setOpenModalWithDetails(!openModalWithDetails);
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
                openModal={openModalAddProject}
                onClickClose={onClickAddProject}
                title={'Dodaj projekt'}
            >
                <AddProjectForm setProjectsArray={setProjectsArray} projectsArray={projectsArray} />
            </FormModal>

            <FormModal
                openModal={openModalWithDetails}
                onClickClose={onClickCloseDetails}
                title={'Informacje'}
            >
                <ProjectDetails
                    projectId={getProjectId}
                />
            </FormModal>

            <Container >
                <Box sx={Sx.mainBoxSx} >
                    <Box component='div'>
                        <FilterComponent
                            projectsArray={projectsArray}
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
                                        <TableCell sx={Sx.tableCellSx} align="center"></TableCell>
                                        <TableCell sx={Sx.tableCellSx} align="center">Typ projektu</TableCell>
                                        <TableCell sx={Sx.tableCellSx} align="center">Tytuł</TableCell>
                                        <TableCell sx={Sx.tableCellSx} align="center" >Alias</TableCell>
                                        <TableCell sx={Sx.tableCellSx} align="center" >Data rozp.</TableCell>
                                        <TableCell sx={Sx.tableCellSx} align="center" >Data zak.</TableCell>
                                        <TableCell sx={Sx.tableCellSx} align="center" >Status projektu</TableCell>
                                    </TableRow>
                                </TableHead>
                                {!projectsError.error &&
                                    <TableBody>
                                        {records?.map((project, i) => (
                                            <TableRow key={i}>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <IconButton onClick={() => {onClickCloseDetails(), setGetProjectId(project.id)}}>
                                                        <MoreHorizIcon sx={{ fontSize: '16px' }} />
                                                    </IconButton>
                                                    <IconButton>
                                                        <UpgradeIcon sx={{ fontSize: '16px' }} />
                                                    </IconButton>
                                                    <IconButton>
                                                        <DeleteIcon sx={{ fontSize: '16px' }} />
                                                    </IconButton>
                                                </TableCell>
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
                                                    {project.dateStarted}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {project.dateCompleted ?
                                                        `${project.dateCompleted}`
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