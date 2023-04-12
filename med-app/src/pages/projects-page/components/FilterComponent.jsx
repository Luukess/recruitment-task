import React, { useEffect, useState } from "react";
import { Box, TextField, Select, MenuItem, Button } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { handleFilterProjectTypes } from "../../../utils/filteringFunction";
import { Sx } from "./filtercomponent.style";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const FilterComponent = (props) => {

    const { records, selectProjectFilter, setSelectProjectFilter, selectStartDate, setSelectStartDate, selectState, setSelectState, onClickAddProject } = props;

    const filteredTypes = [...handleFilterProjectTypes(records)];

    return (
        <Box component='div' sx={Sx.filterMainBox}>
            <Grid container spacing={2}>
                <Grid xs={12} sm={6} md={3}>
                    <Select sx={Sx.inputsSx} variant="filled" size="small" value={selectProjectFilter} onChange={e => setSelectProjectFilter(e.target.value)} >
                        <MenuItem value={'all'}>Typ projektu</MenuItem>
                        {filteredTypes?.map((type, i) => (
                            <MenuItem key={i} value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Box component='div'>
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
                                sx={Sx.inputsSx}
                                label='Data rozpoczęcia'
                                usePickerValue={selectStartDate}
                                onChange={(value) => { 
                                    if(value !== null){
                                        setSelectStartDate(value.$d.toISOString().split('T')[0])
                                    }else{
                                        setSelectStartDate('')
                                    }
                                 }}

                            />
                        </LocalizationProvider>
                    </Box>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Select sx={Sx.inputsSx} variant="filled" size="small" value={selectState} onChange={e => setSelectState(e.target.value)} >
                        <MenuItem value={'all'}>Stan projektu</MenuItem>
                        <MenuItem value={true}>Zakończony</MenuItem>
                        <MenuItem value={false}>W trakcie</MenuItem>
                    </Select>
                </Grid>
                <Grid xs={12} sm={6} md={3} sx={Sx.gridButtonSx}>
                    <Button sx={Sx.inputsSx} variant="contained" type="button" onClick={() => onClickAddProject()}>Dodaj projekt</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FilterComponent;