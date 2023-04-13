import { Box, Container, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Sx } from "./patientspage.style";
import PatientsTable from "./components/table/PatientsTable";
import { handleGetPatients } from "../../services/api";
import FilterPatients from "./components/filterPatients/FilterPatients";
import { handleFilterPatients } from "../../utils/filteringFunction";

const PatientsPage = () => {

    const tableHeadings = ['Imię', 'Nazwisko', 'Miasto', 'Adres'];

    const [patientsArray, setPatientsArray] = useState([]);
    const [patientsError, setPatientsError] = useState({ error: false, message: '' });

    const [surnameFilter, setSurnameFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');

    const filteredPatients = [...handleFilterPatients(patientsArray, surnameFilter, cityFilter)];

    const [currentPage, setCurrentPage] = useState(1);
    const recordsOnPage = 6;
    const lastIndex = currentPage * recordsOnPage;
    const firstIndex = lastIndex - recordsOnPage;
    const records = filteredPatients.slice(firstIndex, lastIndex);
    const countPages = Math.ceil(filteredPatients.length / recordsOnPage)

    const handlePagination = (event, page) => {
        setCurrentPage(page);
        setCityFilter('')
        setSurnameFilter('')
    }

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

    useEffect(() => {
        handleGetAllPatients();
    }, []);

    useEffect(() => {
        if (currentPage > countPages) {
            setCurrentPage(1);
        }
    }, [countPages, countPages]);

    return (
        <>
            <Container>
                <Box component='div' sx={Sx.mainBoxSx}>
                    <Box component='div'>
                        <FilterPatients 
                            setSurnameFilter={setSurnameFilter}
                            setCityFilter={setCityFilter}
                        />
                    </Box>
                    <Box sx={Sx.tableBoxSx}>
                        <PatientsTable
                            patientsArray={records}
                            tableHeadings={tableHeadings}
                            patientsError={patientsError}
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