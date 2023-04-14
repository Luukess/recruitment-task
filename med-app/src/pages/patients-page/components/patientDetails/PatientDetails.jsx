import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { Sx } from './patientdetails.style';
import { handleGetPatient } from "../../../../services/api";

const PatientDetails = (props) => {

    const { patientId } = props;

    const [patientsDetails, setPatientsDetails] = useState(null);
    const handleGetInfoPatient = async () => {
        try {
            const patientsResponse = await handleGetPatient(patientId);
            if (patientsResponse.status === 200) {
                setPatientsDetails(patientsResponse.data);
            }
        } catch (e) {
            console.log(e);
        };
    };

    useEffect(() => {
        handleGetInfoPatient();
    }, [])

    return (
        <>
            <Box sx={Sx.mainDetailsBoxSx}>
                <Grid container spacing={2} >
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Imię:</Typography>
                        <Typography sx={Sx.typographySx} >{patientsDetails?.name}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Nazwisko:</Typography>
                        <Typography sx={Sx.typographySx} >{patientsDetails?.surname}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Płeć:</Typography>
                        <Typography sx={Sx.typographySx} >
                        {patientsDetails?.gender === 'K' && 'Kobieta'}
                        {patientsDetails?.gender === 'M' && 'Mężczyzna'}
                        {patientsDetails?.gender === 'I' && 'Inna'}
                        </Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Adres:</Typography>
                        <Typography sx={Sx.typographySx} >{`ul. ${patientsDetails?.street} ${patientsDetails?.houseNumber} / ${patientsDetails?.apartmentNumber}`}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Miasto:</Typography>
                        <Typography sx={Sx.typographySx} >{patientsDetails?.city}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Kod pocztowy:</Typography>
                        <Typography sx={Sx.typographySx} >{patientsDetails?.zipCode}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Kraj:</Typography>
                        <Typography sx={Sx.typographySx} >{patientsDetails?.country}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Email:</Typography>
                        <Typography sx={Sx.typographySx} >{patientsDetails?.email}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Telefon:</Typography>
                        <Typography sx={Sx.typographySx} >{patientsDetails?.phoneNumber}</Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default PatientDetails;