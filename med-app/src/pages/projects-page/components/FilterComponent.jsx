import React, { useEffect, useState } from "react";
import { Box, TextField, Select, MenuItem } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { handleFilterProjectTypes } from "../../../utils/filteringFunction";
import { Sx } from "./filtercomponent.style";

const FilterComponent = (props) => {

    const { records, selectProjectFilter, setSelectProjectFilter } = props;

    const filteredTypes = [...handleFilterProjectTypes(records)];

    return (
        <Box component='div' sx={{ backgroundColor: 'red', padding: '10px' }}>
            <Grid container spacing={2}>
                <Grid xs={12} sm={6} md={3}>
                    <Select sx={Sx.inputsSx} size="small" value={selectProjectFilter} onChange={e => setSelectProjectFilter(e.target.value)} >
                        <MenuItem value={'all'}>Wybierz</MenuItem>
                        {filteredTypes?.map((type, i) => (
                            <MenuItem key={i} value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    sd
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    sd
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    sd
                </Grid>
            </Grid>
        </Box>
    );
};

export default FilterComponent;