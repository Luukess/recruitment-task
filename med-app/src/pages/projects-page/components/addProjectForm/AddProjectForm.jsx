import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { Sx } from "./addprojectform.style";
import Grid from '@mui/material/Unstable_Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const AddProjectForm = () => {

    return (
        <Box component='div' sx={Sx.mainFormBox}>
            <Box component='div' sx={{marginBottom: '16px'}}>
                <Grid container rowSpacing={4} spacing={2}>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Rodzaj projektu" variant="filled" />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Tytuł" variant="filled" />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Autor projektu" variant="filled" />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Instytucja" variant="filled" />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Źródło danych" variant="filled" />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Fundusz" variant="filled" type="number" />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Alias" variant="filled" />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: "filled",
                                    },
                                    actionBar: {
                                        actions: ['clear'],
                                    },
                                }}
                                sx={Sx.inputSx}
                                label='Data Rozpoczęcia'
                            // usePickerValue={selectStartDate}
                            // onChange={(value) => {
                            //     if (value !== null) {
                            //         setSelectStartDate(value.$d.toISOString().split('T')[0])
                            //     } else {
                            //         setSelectStartDate('')
                            //     }
                            // }}

                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: "filled",
                                    },
                                    actionBar: {
                                        actions: ['clear'],
                                    },
                                }}
                                sx={Sx.inputSx}
                                label='Data zakończenia'
                            // usePickerValue={selectStartDate}
                            // onChange={(value) => {
                            //     if (value !== null) {
                            //         setSelectStartDate(value.$d.toISOString().split('T')[0])
                            //     } else {
                            //         setSelectStartDate('')
                            //     }
                            // }}

                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <FormControlLabel label='Projekt zakończony' control={<Checkbox />} />
                    </Grid>
                </Grid>
            </Box>
            <Box component='div' sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                <Button variant="contained">Dodaj</Button>
            </Box>
        </Box>
    );
};

export default AddProjectForm;