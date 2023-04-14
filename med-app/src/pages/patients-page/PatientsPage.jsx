import { Box, Container, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Sx } from "./patientspage.style";
import PatientsTable from "./components/table/PatientsTable";
import { handleGetPatients, handleGetProjects } from "../../services/api";
import FilterPatients from "./components/filterPatients/FilterPatients";
import { handleFilterPatients } from "../../utils/filteringFunction";
import FormModal from "../projects-page/components/formModal/FormModal";
import AddPatientForm from "./components/addPatientForm/AddPatientForm";
import AssignPatientForm from "./components/assignPatient/AssignPatientForm";
import UpdatePatientForm from "./components/updatePatientForm/UpdatePatientForm";

const PatientsPage = () => {

    const tableHeadings = ['Imię', 'Nazwisko', 'Miasto', 'Adres'];

    const [patientsArray, setPatientsArray] = useState([]);
    const [patientsError, setPatientsError] = useState({ error: false, message: '' });
    const [projectArray, setProjectArray] = useState([]);

    const [surnameFilter, setSurnameFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');

    const [addPatientModal, setAddPatientModal] = useState(false);
    const [assignPatientModal, setAssignPatientModal] = useState(false);
    const [updatePatientModal, setUpdatePatientModal] = useState(false);

    const [patientId, setPatientId] = useState(null);

    const filteredPatients = [...handleFilterPatients(patientsArray, surnameFilter, cityFilter)];

    const [currentPage, setCurrentPage] = useState(1);
    const recordsOnPage = 6;
    const lastIndex = currentPage * recordsOnPage;
    const firstIndex = lastIndex - recordsOnPage;
    const records = filteredPatients.slice(firstIndex, lastIndex);
    const countPages = Math.ceil(filteredPatients.length / recordsOnPage)

    const onClickAddPatientModal = () => {
        setAddPatientModal(!addPatientModal);
    };

    const onClickAssignPatientModal = () => {
        setAssignPatientModal(!assignPatientModal);
    };

    const onClickUpdatePatientFormModal = () => {
        setUpdatePatientModal(!updatePatientModal)
    };

    const handlePagination = (event, page) => {
        setCurrentPage(page);
        setCityFilter('')
        setSurnameFilter('')
    };

    const handleGetAllPatients = async () => {
        try {
            const patientsResponse = await handleGetPatients();
            if (patientsResponse.status === 200) {
                setPatientsArray(patientsResponse.data);
            }
        } catch (e) {
            console.log(e);
            setPatientsError({ error: true, message: 'Problem z serwerem' });
        }
    };

    const handleGetAllProjects = async () => {
        try {
            const projectResponse = await handleGetProjects();
            if (projectResponse.status === 200) {
                setProjectArray(projectResponse.data);
            }
        } catch (e) {
            console.log(e);
        };
    };

    useEffect(() => {
        handleGetAllPatients();
        handleGetAllProjects();
    }, []);

    useEffect(() => {
        if (currentPage > countPages) {
            setCurrentPage(1);
        }
    }, [countPages, countPages]);

    return (
        <>
            <FormModal
                openModal={addPatientModal}
                onClickClose={onClickAddPatientModal}
                title={'Dodaj pacjenta'}
            >
                <AddPatientForm setPatientsArray={setPatientsArray} />
            </FormModal>

            <FormModal
                openModal={assignPatientModal}
                onClickClose={onClickAssignPatientModal}
                title={'Przydziel pacjenta'}
            >
                <AssignPatientForm
                    projectArray={projectArray}
                    patientsArray={patientsArray}
                    setPatientsArray={setPatientsArray}
                />
            </FormModal>

            <FormModal
                openModal={updatePatientModal}
                onClickClose={onClickUpdatePatientFormModal}
                title={'Zaktualizuj dane pacjenta'}
            >
                <UpdatePatientForm
                    patientId={patientId}
                    setPatientsArray={setPatientsArray}
                />
            </FormModal>

            <Container>
                <Box component='div' sx={Sx.mainBoxSx}>
                    <Box component='div'>
                        <FilterPatients
                            setSurnameFilter={setSurnameFilter}
                            setCityFilter={setCityFilter}
                            onClickAddPatient={onClickAddPatientModal}
                            onClickAssignPatientModal={onClickAssignPatientModal}
                        />
                    </Box>
                    <Box sx={Sx.tableBoxSx}>
                        <PatientsTable
                            patientsArray={records}
                            tableHeadings={tableHeadings}
                            patientsError={patientsError}
                            onClickUpdatePatientFormModal={onClickUpdatePatientFormModal}
                            setPatientId={setPatientId}
                        />
                    </Box>
                    {patientsError.error &&
                        <Box>
                            <Typography sx={Sx.errorBoxSx}>
                                {`${patientsError.message} sdsd`}
                            </Typography>
                        </Box>
                    }
                    <Box sx={Sx.paginationContainerSx}>
                        <Stack spacing={2}>
                            <Pagination count={countPages} color="primary" onChange={handlePagination} />
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default PatientsPage;