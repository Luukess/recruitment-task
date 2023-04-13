import { Box, Container } from "@mui/material";
import React from "react";
import { Sx } from "./patientspage.style";

const PatientsPage = () => {

    return (
        <>
            <Container>
                <Box component='div' sx={Sx.mainBoxSx}>
                    <Box>
                        filter component
                    </Box>
                    <Box sx={Sx.tableBoxSx}>
                        table 
                    </Box>
                    <Box sx={Sx.paginationContainerSx}>
                        pagination
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default PatientsPage;