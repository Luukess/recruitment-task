import React from "react";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { Sx } from "./filterpatients.style";

const FilterPatients = (props) => {

    const { setSurnameFilter, setCityFilter, onClickAddPatient } = props;

    return (
        <Box component='div' sx={Sx.filterMainBox}>
            <Grid container spacing={2}>
                <Grid xs={12} sm={6} md={3}>
                    <TextField sx={Sx.inputsSx} size="small" label="Nazwisko" variant="filled" onChange={(e) => setSurnameFilter(e.target.value)} />
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <TextField sx={Sx.inputsSx} size="small" label="Miasto" variant="filled" onChange={(e) => setCityFilter(e.target.value)} />
                </Grid>
                <Grid xs={12} sm={6} md={3} sx={Sx.gridButtonSx}>
                    <Button sx={Sx.inputsSx} variant="contained" type="button" onClick={() => onClickAddPatient()}>Dodaj pacjenta</Button>
                </Grid>
                <Grid xs={12} sm={6} md={3} sx={Sx.gridButtonSx}>
                    <Button sx={Sx.inputsSx} variant="contained" type="button">Przydziel pacjenta</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FilterPatients;