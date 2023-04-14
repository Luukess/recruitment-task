import React from "react";
import { Box, Select, MenuItem, Button } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { handleFilterProjectTypes } from "../../../utils/filteringFunction";
import { Sx } from "./filtercomponent.style";



const FilterComponent = (props) => {

    const { projectsArray, selectProjectFilter, setSelectProjectFilter, selectState, setSelectState, onClickAddProject } = props;

    const filteredTypes = [...handleFilterProjectTypes(projectsArray)];

    return (
        <Box component='div' sx={Sx.filterMainBox}>
            <Grid container spacing={2}>
                <Grid xs={12} sm={4} >
                    <Select sx={Sx.inputsSx} variant="filled" size="small" value={selectProjectFilter} onChange={e => setSelectProjectFilter(e.target.value)} >
                        <MenuItem value={'all'}>Typ projektu</MenuItem>
                        {filteredTypes?.map((type, i) => (
                            <MenuItem key={i} value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid xs={12} sm={4} >
                    <Select sx={Sx.inputsSx} variant="filled" size="small" value={selectState} onChange={e => setSelectState(e.target.value)} >
                        <MenuItem value={'all'}>Stan projektu</MenuItem>
                        <MenuItem value={true}>Zakończony</MenuItem>
                        <MenuItem value={false}>W trakcie</MenuItem>
                    </Select>
                </Grid>
                <Grid xs={12} sm={4} sx={Sx.gridButtonSx}>
                    <Button sx={Sx.inputsSx} variant="contained" type="button" onClick={() => onClickAddProject()}>Dodaj projekt</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FilterComponent;