import React, { useEffect, useState } from "react";
import {
    Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Stack, Typography, IconButton
} from '@mui/material';
import { handleDeleteProject, handleGetPatients, handleGetProjects } from "../../services/api";
import { Sx } from "./projectspage.style";
import FilterComponent from "./components/FilterComponent";
import { handleAmountPatients, handleFilterProjects } from "../../utils/filteringFunction";
import FormModal from "./components/formModal/FormModal";
import AddProjectForm from "./components/addProjectForm/AddProjectForm";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteIcon from '@mui/icons-material/Delete';
import ProjectDetails from "./components/projectDetails/ProjectDetails";
import { handleErrorToast, handleSuccessToast } from "../../components/toastify/Toastify";
import UpdateForm from "./components/updateForm/UpdateForm";


const ProjectsPage = () => {

    const [projectsArray, setProjectsArray] = useState([]);
    const [projectsError, setProjectsError] = useState({ error: false, message: '' });
    const [openModalAddProject, setOpenModalAddProject] = useState(false);
    const [openModalWithDetails, setOpenModalWithDetails] = useState(false);
    const [opneModalWithUpdateForm, setOpenModalWithUpdateForm] = useState(false);
    const [getProjectId, setGetProjectId] = useState(null);

    const [patientsArray, setPatientsArray] = useState([]);

    const [selectProjectFilter, setSelectProjectFilter] = useState('all');
    const [selectState, setSelectState] = useState('all');

    const filteredProjects = [...handleFilterProjects(projectsArray, selectProjectFilter, selectState)];

    const [currentPage, setCurrentPage] = useState(1);
    const recordsOnPage = 8;
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

    const onClickCloseUpdateProject = () => {
        setOpenModalWithUpdateForm(!opneModalWithUpdateForm)
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

    const handleRemoveProject = async (id) => {
        try {
            const projectResponse = await handleDeleteProject(id);
            if (projectResponse.status === 200) {
                handleSuccessToast('Projekt usunięto');
                setProjectsArray((data) => {
                    const restData = data.filter((project) => {
                        return project?.id !== id;
                    });
                    return restData;
                });
            }
        } catch (e) {
            console.log(e);
            handleErrorToast('Usunięcie projektu nie powiodło się');
        }
    };

    const handleGetAllPatients = async () => {
        try{
            const patientsResponse = await handleGetPatients();
            if(patientsResponse.status === 200){
                setPatientsArray(patientsResponse.data)
            }
        }catch(e){
            console.log(e);
        };
    };

    const handlePagination = (event, page) => {
        setCurrentPage(page);
        setSelectProjectFilter('all');
    };

    useEffect(() => {
        handleGetAllProjects();
        handleGetAllPatients();
    }, []);

    useEffect(() => {
        if (currentPage > countPages) {
            setCurrentPage(1);
        }
    }, [countPages, countPages]);

    return (
        <>
            <FormModal
                openModal={openModalAddProject}
                onClickClose={onClickAddProject}
                title={'Dodaj projekt'}
            >
                <AddProjectForm setProjectsArray={setProjectsArray} projectsArray={projectsArray} setCurrentPage={setCurrentPage} />
            </FormModal>

            <FormModal
                openModal={openModalWithDetails}
                onClickClose={onClickCloseDetails}
                title={'Informacje'}
            >
                <ProjectDetails
                    projectId={getProjectId}
                    patientsArray={patientsArray}
                />
            </FormModal>

            <FormModal
                openModal={opneModalWithUpdateForm}
                onClickClose={onClickCloseUpdateProject}
                title={'Edycja'}
            >
                <UpdateForm
                    projectId={getProjectId}
                    setProjectsArray={setProjectsArray}
                />
            </FormModal>

            <Container >
                <Box sx={Sx.mainBoxSx} >
                    <Box component='div'>
                        <FilterComponent
                            projectsArray={projectsArray}
                            selectProjectFilter={selectProjectFilter}
                            setSelectProjectFilter={setSelectProjectFilter}
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
                                        <TableCell sx={Sx.tableCellSx} align="center">Tytuł</TableCell>
                                        <TableCell sx={Sx.tableCellSx} align="center" >Alias</TableCell>
                                        <TableCell sx={Sx.tableCellSx} align="center" >Data rozp.</TableCell>
                                        <TableCell sx={Sx.tableCellSx} align="center" >Data zak.</TableCell>
                                        <TableCell sx={Sx.tableCellSx} align="center" >Status projektu</TableCell>
                                        <TableCell sx={Sx.tableCellSx} align="center" >Pacjentów</TableCell>
                                    </TableRow>
                                </TableHead>
                                {!projectsError.error &&
                                    <TableBody>
                                        {records?.map((project, i) => (
                                            <TableRow key={i}>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <IconButton onClick={() => { onClickCloseDetails(); setGetProjectId(project.id) }}>
                                                        <MoreHorizIcon sx={{ fontSize: '16px' }} />
                                                    </IconButton>
                                                    <IconButton onClick={() => {onClickCloseUpdateProject(); setGetProjectId(project.id)}}>
                                                        <UpgradeIcon sx={{ fontSize: '16px' }} />
                                                    </IconButton>
                                                    <IconButton onClick={() => { handleRemoveProject(project.id) }}>
                                                        <DeleteIcon sx={{ fontSize: '16px' }} />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {project.projectType}
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
                                                <TableCell align="center">
                                                    {handleAmountPatients(patientsArray, project?.id)}
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