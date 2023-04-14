import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { Sx } from './updatepatientform.style';
import { useForm } from "react-hook-form";
import { handleGetPatient, handlePutPatient } from "../../../../services/api";
import { handleErrorToast, handleSuccessToast } from "../../../../components/toastify/Toastify";

const UpdatePatientForm = (props) => {

    const { patientId, setPatientsArray } = props;

    const [defaultFormObject, setDefaultFormObject] = useState({
        street: '',
        houseNumber: '',
        apartmentNumber: '',
        city: '',
        zipCode: '',
        country: '',
        phoneNumber: '',
        email: ''
    });

    const [projectState, setProjectState] = useState(false);
    const [removeFromProject, setRemoveFromProject] = useState(false);
    const [fullPatientObject, setFullProjectObject] = useState(null)

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: defaultFormObject });

    const handleGetDataPatient = async () => {
        try {
            const patientResponse = await handleGetPatient(patientId);
            if (patientResponse.status === 200) {
                setDefaultFormObject({
                    street: patientResponse.data.street,
                    houseNumber: patientResponse.data.houseNumber,
                    apartmentNumber: patientResponse.data.apartmentNumber,
                    city: patientResponse.data.city,
                    zipCode: patientResponse.data.zipCode,
                    country: patientResponse.data.country,
                    phoneNumber: patientResponse.data.phoneNumber,
                    email: patientResponse.data.email
                });
                setProjectState(patientResponse.data.projectId !== null ? true : false);
                setFullProjectObject(patientResponse.data)
            }
        } catch (e) {
            console.log(e);
        };
    };

    const onSubmit = async (data) => {
        try{
            const formData = {
                ...fullPatientObject,
                ...data,
            };
            if(projectState && removeFromProject){
                formData['projectId'] = null;
                setProjectState(false);
            };

            const patientResponse = await handlePutPatient(patientId, formData);
            if(patientResponse.status === 200){
                handleSuccessToast('Zaktualizowano dane');
                setPatientsArray((data) => {
                    const allData = data.filter((patient) => {
                        return patient?.id !== fullPatientObject.id
                    });
                    return [...allData, formData];
                });
            }

        }catch(e){
            console.log(e);
            handleErrorToast('Aktualizacja nie powiodła się')
        };
    };

    useEffect(() => {
        handleGetDataPatient();
    }, []);

    useEffect(() => {
        reset(defaultFormObject);
    }, [defaultFormObject])

    return (
        <>
            <Box onSubmit={handleSubmit(onSubmit)} component='form' autoComplete="off" sx={Sx.mainFormBox}>
                <Box component='div' sx={{ marginBottom: '16px' }}>
                    <Grid container rowSpacing={4} spacing={2} >
                        <Grid xs={12} sm={6} md={4} >
                            <TextField InputLabelProps={{ shrink: true }} sx={Sx.inputSx} size="small" variant="filled" label='Ulica' error={errors.street ? true : false} {...register('street', {
                                required: 'Pole jest wymagane'
                            })} />
                            <Typography variant='caption' align='center' color='error'>
                                {errors.street?.message}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={6} md={4} >
                            <TextField InputLabelProps={{ shrink: true }} sx={Sx.inputSx} size="small" type="number" variant="filled" label='Nr. domu' error={errors.houseNumber ? true : false} {...register('houseNumber', {
                                required: 'Pole jest wymagane'
                            })} />
                            <Typography variant='caption' align='center' color='error'>
                                {errors.houseNumber?.message}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={6} md={4} >
                            <TextField InputLabelProps={{ shrink: true }} sx={Sx.inputSx} size="small" type="number" variant="filled" label='Nr. mieszkania' error={errors.apartmentNumber ? true : false} {...register('apartmentNumber', {
                                required: 'Pole jest wymagane'
                            })} />
                            <Typography variant='caption' align='center' color='error'>
                                {errors.apartmentNumber?.message}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={6} md={4} >
                            <TextField InputLabelProps={{ shrink: true }} sx={Sx.inputSx} size="small" variant="filled" label='Miasto' error={errors.city ? true : false} {...register('city', {
                                required: 'Pole jest wymagane'
                            })} />
                            <Typography variant='caption' align='center' color='error'>
                                {errors.city?.message}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={6} md={4} >
                            <TextField InputLabelProps={{ shrink: true }} sx={Sx.inputSx} size="small" variant="filled" label='Kod pocztowy' error={errors.zipCode ? true : false} {...register('zipCode', {
                                required: 'Pole jest wymagane',
                                maxLength: {
                                    value: 6,
                                    message: 'Maks 6 znaków'
                                }
                            })} />
                            <Typography variant='caption' align='center' color='error'>
                                {errors.zipCode?.message}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={6} md={4} >
                            <TextField InputLabelProps={{ shrink: true }} sx={Sx.inputSx} size="small" variant="filled" label='Kraj' error={errors.country ? true : false} {...register('country', {
                                required: 'Pole jest wymagane'
                            })} />
                            <Typography variant='caption' align='center' color='error'>
                                {errors.country?.message}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={6} md={4} >
                            <TextField InputLabelProps={{ shrink: true }} sx={Sx.inputSx} size="small" variant="filled" label='email' error={errors.email ? true : false} {...register('email', {
                                required: 'Pole jest wymagane',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Niepoprawny adres email'
                                }
                            })} />
                            <Typography variant='caption' align='center' color='error'>
                                {errors.email?.message}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={6} md={4} >
                            <TextField InputLabelProps={{ shrink: true }} sx={Sx.inputSx} size="small" variant="filled" label='Telefon' error={errors.phoneNumber ? true : false} {...register('phoneNumber', {
                                required: 'Pole jest wyamagane',
                                pattern: {
                                    value: /[0-9]/,
                                    message: 'Dozwolone tylko liczby'
                                },
                                maxLength: {
                                    value: 9,
                                    message: 'Maks 9 znaków'
                                }
                            })} />
                            <Typography variant='caption' align='center' color='error'>
                                {errors.phoneNumber?.message}
                            </Typography>
                        </Grid>
                        {projectState &&
                            <Grid xs={12} sm={6} md={4} >
                                <FormControlLabel InputLabelProps={{ shrink: true }} label='Usuń pacjenta z projektu' control={<Checkbox checked={removeFromProject} value={removeFromProject} onChange={(e) => setRemoveFromProject(e.target.checked)} />} />
                            </Grid>
                        }
                    </Grid>
                </Box>
                <Box component='div' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="submit" variant="contained">Dodaj</Button>
                </Box>
            </Box>
        </>
    );
};

export default UpdatePatientForm;