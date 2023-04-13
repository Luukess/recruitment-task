import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Sx } from "./addprojectform.style";
import Grid from '@mui/material/Unstable_Grid2';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useForm } from "react-hook-form";
import { handlePostProject } from "../../../../services/api";
import { handleErrorToast, handleSuccessToast } from "../../../../components/toastify/Toastify";

const AddProjectForm = (props) => {

    const { setProjectsArray } = props;

    const [hideDateInput, setHideDateInput] = useState(true);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log(data)
            if (!data.isFinished) {
                data['dateCompleted'] = null;
            }

            const formData = {
                ...data,
            };

            const projectsResponse = await handlePostProject(formData);
            if (projectsResponse.status === 201) {
                handleSuccessToast('Dodano nowy projekt');
                setProjectsArray((allData) => ([...allData, { ...projectsResponse.data }]));
                reset();
            };

        } catch (e) {
            console.log(e);
            handleErrorToast('Dodanie projektu nieudane');
        };
    };

    return (
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={Sx.mainFormBox} autoComplete="off">
            <Box component='div' sx={{ marginBottom: '16px' }}>
                <Grid container rowSpacing={4} spacing={2}>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Rodzaj projektu" variant="filled" error={errors.projectType ? true : false} {...register('projectType', {
                            required: 'Pole jest wymagane'
                        })} />
                        <Typography variant='caption' align='center' color='error'>{errors.projectType?.message}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Tytuł" variant="filled" error={errors.title ? true : false} {...register('title', {
                            required: 'Pole jest wymagane'
                        })} />
                        <Typography variant='caption' align='center' color='error'>{errors.title?.message}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Autor projektu" variant="filled" error={errors.author ? true : false} {...register('author', {
                            required: 'Pole jest wymagane'
                        })} />
                        <Typography variant='caption' align='center' color='error'>{errors.author?.message}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Instytucja" variant="filled" error={errors.institutionData ? true : false} {...register('institutionData', {
                            required: 'Pole jest wymagane'
                        })} />
                        <Typography variant='caption' align='center' color='error'>{errors.institutionData?.message}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Źródło danych" variant="filled" error={errors.dataSources ? true : false} {...register('dataSources', {
                            required: 'Pole jest wymagane'
                        })} />
                        <Typography variant='caption' align='center' color='error'>{errors.dataSources?.message}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Fundusz" variant="filled" type="number" error={errors.financialFunds ? true : false} {...register('financialFunds', {
                            required: 'Pole jest wymagane'
                        })} />
                        <Typography variant='caption' align='center' color='error'>{errors.financialFunds?.message}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Alias" variant="filled" error={errors.pNumber ? true : false} {...register('pNumber', {
                            required: 'Pole jest wymagane'
                        })} />
                        <Typography variant='caption' align='center' color='error'>{errors.pNumber?.message}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} InputLabelProps={{ shrink: true }} type="date" size="small" label="Data rozpoczęcia" variant="filled" error={errors.dateStarted ? true : false} {...register('dateStarted', {
                            required: 'Pole jest wymagane'
                        })} />
                        <Typography variant='caption' align='center' color='error'>{errors.dateStarted?.message}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        {!hideDateInput &&
                            <>
                                <TextField sx={Sx.inputSx} InputLabelProps={{ shrink: true }} type="date" size="small" label="Data zakończenia" variant="filled" error={errors.dateCompleted ? true : false} {...register('dateCompleted', {
                                    required: 'Pole jest wymagane'
                                })} />
                                <Typography variant='caption' align='center' color='error'>{errors.dateCompleted?.message}</Typography>
                            </>
                        }
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <FormControlLabel label='Projekt zakończony' control={<Checkbox {...register('isFinished', {
                            onChange: (e) => setHideDateInput(!e.target.checked)
                        })} />} />
                    </Grid>
                </Grid>
            </Box>
            <Box component='div' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained">Dodaj</Button>
            </Box>
        </Box>
    );
};

export default AddProjectForm;