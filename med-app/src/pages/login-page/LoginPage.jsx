import React, { useState } from 'react';
import { Box, Card, TextField, CardContent, Typography, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Sx } from './loginpage.style';
import { useForm } from "react-hook-form";

const LoginPage = () => {

    const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm({defaultValues: {
        email: '',
        password: ''
    }});

    const submit = (data) => {
        console.log(data);
    };

    return (
        <Box sx={Sx.boxSx}>
            <Card sx={Sx.mainCardSx}>
                <CardContent>
                    <Box sx={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} component='div'>
                        <PersonIcon sx={{ fontSize: '80px' }} />
                    </Box>
                    <Box onSubmit={handleSubmit(submit)} component='form' noValidate autoComplete="off">
                        <Box component='div'>
                            <TextField sx={Sx.inputSx} id="email-login-form" type='email' label="Email" variant="filled" {...register('email', {
                                required: 'Pole jest wymagane',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Niepoprawny adres email'
                                }
                            })} />
                            <Typography variant='caption' align='center' color='error' >{errors.email?.message}</Typography>
                            <TextField sx={Sx.inputSx} id="password-login-form" type='password' label="Password" variant="filled" {...register('password', {
                                required: 'Pole jest wymagane',
                                minLength: {
                                    value: 5,
                                    message: 'Hasło jest za krótkie'
                                }
                            })} />
                            <Typography variant='caption' align='center' color='error'>{errors.password?.message}</Typography>
                        </Box>
                        <Box>
                            <Button type='submit' sx={Sx.formButtonSx} variant="contained">Zaloguj</Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginPage;