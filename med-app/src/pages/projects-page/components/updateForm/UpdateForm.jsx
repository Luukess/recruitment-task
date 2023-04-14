import { Box, TextField, FormControlLabel, Checkbox, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Sx } from "./updateform.style";
import Grid from '@mui/material/Unstable_Grid2';
import { useForm } from "react-hook-form";
import { handleGetProject, handlePutProject } from "../../../../services/api";
import { handleErrorToast, handleSuccessToast } from "../../../../components/toastify/Toastify";

const UpdateForm = (props) => {

    const { projectId, setProjectsArray } = props;

    const [defaultFormObject, setDefaultFormObject] = useState({
        title: '',
        author: '',
        institutionData: '',
        pNumber: '',
        financialFunds: '',
        dateStarted: '',
        dateCompleted: '',
        isFinished: false
    });
    const [hideFinishDate, setHideFinishDate] = useState(defaultFormObject.isFinished);
    const [fullProjectObject, setFullProjectObject] = useState(null);

    const { register, handleSubmit, formState: { errors }, reset, resetField } = useForm({ defaultValues: defaultFormObject });

    const handleGetDataProject = async () => {
        try {
            const projectResponse = await handleGetProject(projectId);
            setDefaultFormObject({
                title: projectResponse.data.title,
                author: projectResponse.data.author,
                institutionData: projectResponse.data.institutionData,
                pNumber: projectResponse.data.pNumber,
                financialFunds: projectResponse.data.financialFunds,
                dateStarted: projectResponse.data.dateStarted,
                dateCompleted: projectResponse.data.dateCompleted,
                isFinished: projectResponse.data.isFinished
            });
            setFullProjectObject(projectResponse.data);
        } catch (e) {
            console.log(e)
        };
    };

    const onSubmit = async (data) => {
        try {
            if (!hideFinishDate) {
                data.dateCompleted = null;
            }
            const formData = {
                ...fullProjectObject,
                ...data,
                isFinished: hideFinishDate
            }
            const projectResponse = await handlePutProject(fullProjectObject?.id, formData);
            console.log(projectResponse.data, 'dddd')
            if (projectResponse.status === 200) {
                handleSuccessToast('Zaktualizowano projekt');
                setProjectsArray((data) => {
                    const filterProjects = data.filter((project) => {
                        return project.id !== fullProjectObject?.id;
                    });
                    return [...filterProjects, projectResponse.data];
                })
            };

        } catch (e) {
            console.log(e);
            handleErrorToast('Aktualizacja nie powiodła się');
        }
    };

    useEffect(() => {
        handleGetDataProject();
    }, []);

    useEffect(() => {
        if (!hideFinishDate) {
            resetField('dateCompleted');
        }
    }, [hideFinishDate])

    useEffect(() => {
        reset(defaultFormObject);
        setHideFinishDate(defaultFormObject.isFinished);
    }, [defaultFormObject])

    return (
        <>
            <Box onSubmit={handleSubmit(onSubmit)} component='form' sx={Sx.mainFormBox}>
                <Box component='div' sx={{ marginBottom: '16px' }}>
                    <Grid container rowSpacing={4} spacing={2}>
                        <Grid xs={12} sm={6} md={4}>
                            <TextField InputLabelProps={{ shrink: true }} sx={Sx.inputSx} size="small" label="Tytył" variant="filled" error={errors.title ? true : false} {...register('title', {
                                required: 'Pole jest wymagane'
                            })} />
                            <Typography variant='caption' align='center' color='error'>
                                {errors.title?.message}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <TextField InputLabelProps={{ shrink: true }} sx={Sx.inputSx} size="small" label="Autor projektu" variant="filled" error={errors.author ? true : false} {...register('author', {
                                required: 'Pole jest wymagane'
                            })} />
                            <Typography variant='caption' align='center' color='error'>
                                {errors.author?.message}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <TextField InputLabelProps={{ shrink: true }} sx={Sx.inputSx} size="small" label="Instytucja" variant="filled" error={errors.institutionData ? true : false}  {...register('institutionData', {
                                required: 'Pole jest wymagane'
                            })} />
                            <Typography variant='caption' align='center' color='error'>
                                {errors.institutionData?.message}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <TextField InputLabelProps={{ shrink: true }} sx={Sx.inputSx} size="small" label="Alias" variant="filled" error={errors.pNumber ? true : false} {...register('pNumber', {
                                required: 'Pole jest wymagane'
                            })} />
                            <Typography variant='caption' align='center' color='error'>
                                {errors.pNumber?.message}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <TextField InputLabelProps={{ shrink: true }} sx={Sx.inputSx} type="number" size="small" label="Fundusz" variant="filled" error={errors.financialFunds ? true : false} {...register('financialFunds', {
                                required: 'Pole jest wymagane'
                            })} />
                            <Typography variant='caption' align='center' color='error'>
                                {errors.financialFunds?.message}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <TextField InputLabelProps={{ shrink: true }} sx={Sx.inputSx} type="date" size="small" label="Data rozpoczecia" variant="filled" error={errors.dateStarted ? true : false} {...register('dateStarted', {
                                required: 'Pole jest wymagane'
                            })} />
                            <Typography variant='caption' align='center' color='error'>
                                {errors.dateStarted?.message}
                            </Typography>
                        </Grid>
                        {hideFinishDate &&
                            <Grid xs={12} sm={6} md={4}>
                                <>
                                    <TextField InputLabelProps={{ shrink: true }} sx={Sx.inputSx} type="date" size="small" label="Data zakończenia" variant="filled" error={errors.dateCompleted ? true : false} {...register('dateCompleted', {
                                        required: 'Pole jest wymagane'
                                    })} />
                                    <Typography variant='caption' align='center' color='error'>
                                        {errors.dateCompleted?.message}
                                    </Typography>
                                </>
                            </Grid>
                        }
                        <Grid>
                            <FormControlLabel label='Projekt zakończony' control={<Checkbox value={hideFinishDate} checked={hideFinishDate} onChange={(e) => { setHideFinishDate(e.target.checked) }} />} />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="submit" variant="contained">Zaktualizuj</Button>
                </Box>
            </Box>
        </>
    );
};

export default UpdateForm;