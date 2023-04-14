import React from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Sx } from "./addpatientform.style";
import { handleErrorToast, handleSuccessToast } from "../../../../components/toastify/Toastify";
import { handlePostPatient } from "../../../../services/api";


const AddPatientForm = (props) => {

    const { setPatientsArray } = props;

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try{
            const formData = {
                ...data,
                houseNumber: parseInt(data.houseNumber),
                apartmentNumber: parseInt(data.apartmentNumber),
                projectId: null,
            }
            const patientResponse = await handlePostPatient(formData);
            if(patientResponse.status === 201){
                handleSuccessToast('Dodano nowego pacjenta');
                setPatientsArray((allData) => ([...allData, { ...patientResponse.data }]));
                reset();
            }
        }catch(e){
            console.log(e);
            handleErrorToast('Dodanie pacjenta nie powiodło się')
        }
    };

    return (
        <Box onSubmit={handleSubmit(onSubmit)} component='form' autoComplete="off" sx={Sx.mainFormBox} >
            <Box component='div' sx={{ marginBottom: '16px' }}>
                <Grid container rowSpacing={4} spacing={2} >
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Imię" variant="filled" error={errors.name ? true : false} {...register('name', {
                            required: 'Pole jest wymagane'
                        })} />
                        <Typography variant='caption' align='center' color='error'>
                            {errors.name?.message}
                        </Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Nazwisko" variant="filled" error={errors.surname ? true : false} {...register('surname', {
                            required: 'Pole jest wymagane'
                        })} />
                        <Typography variant='caption' align='center' color='error'>
                            {errors.surname?.message}
                        </Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} >
                        <RadioGroup defaultValue="K" sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
                            <FormControlLabel value="K" control={<Radio size="small" {...register('gender')} />} label="Kobieta" />
                            <FormControlLabel value="M" control={<Radio size="small" {...register('gender')} />} label="Mężczyzna" />
                            <FormControlLabel value="I" control={<Radio size="small" {...register('gender')} />} label="Inna" />
                        </RadioGroup>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Ulica" variant="filled" error={errors.street ? true : false} {...register('street', {
                            required: 'Pole jest wymagane'
                        })} />
                        <Typography variant='caption' align='center' color='error'>
                            {errors.street?.message}
                        </Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" type='number' label="Nr. domu" variant="filled" error={errors.houseNumber ? true : false} {...register('houseNumber', {
                            required: 'Pole jest wymagane'
                        })} />
                        <Typography variant='caption' align='center' color='error'>
                            {errors.houseNumber?.message}
                        </Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" type='number' label="Nr. mieszkania" variant="filled" error={errors.apartmentNumber ? true : false} {...register('apartmentNumber', {
                            required: 'Pole jest wymagane'
                        })} />
                        <Typography variant='caption' align='center' color='error'>
                            {errors.apartmentNumber?.message}
                        </Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Miasto" variant="filled" error={errors.city ? true : false} {...register('city', {
                            required: 'Pole jest wymagane'
                        })} />
                        <Typography variant='caption' align='center' color='error'>
                            {errors.city?.message}
                        </Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Kod pocztowy" variant="filled" error={errors.zipCode ? true : false} {...register('zipCode', {
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
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Kraj" variant="filled" error={errors.country ? true : false} {...register('country', {
                            required: 'Pole jest wymagane'
                        })} />
                        <Typography variant='caption' align='center' color='error'>
                            {errors.country?.message}
                        </Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="Telefon" variant="filled" error={errors.phoneNumber ? true : false} {...register('phoneNumber', {
                            required: 'Pole jest wymagane',
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
                    <Grid xs={12} sm={6} md={4}>
                        <TextField sx={Sx.inputSx} size="small" label="E-mail" variant="filled" error={errors.email ? true : false} {...register('email', {
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
                </Grid>
            </Box>
            <Box component='div' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained">Dodaj</Button>
            </Box>
        </Box>
    );
};

export default AddPatientForm;