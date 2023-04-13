import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Sx } from "./patientspage.style";
import PatientsTable from "./components/table/PatientsTable";
import { handleGetPatients } from "../../services/api";

const PatientsPage = () => {

    const tableHeadings = ['Imię', 'Nazwisko', 'Miasto', 'Adres'];

    const [patientsArray, setPatientsArray] = useState([]);
    const [patientsError, setPatientsError] = useState({ error: false, message: '' });

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

    return (
        <>
            <Container>
                <Box component='div' sx={Sx.mainBoxSx}>
                    <Box>
                        filter component
                    </Box>
                    <Box sx={Sx.tableBoxSx}>
                        <PatientsTable
                            patientsArray={patientsArray}
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
                        pagination
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default PatientsPage;