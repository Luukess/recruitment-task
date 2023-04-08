import React, { useContext, useState } from 'react';
import { Box, Card, TextField, CardContent, Typography, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Sx } from './loginpage.style';
import { useForm } from "react-hook-form";
import { LoginContext } from '../../contexts/loginContext';
import { userLogin } from '../../utils/user';

const LoginPage = () => {

    const { loggedState, setLoggedState } = useContext(LoginContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const submit = async (data) => {
        try{
            const user = await userLogin();
            if(data.email === user.email && data.password === user.password){
                setLoggedState(true);
            }else{
                throw new Error('Niepoprawne dane logowania');
            }
        }catch(e){
            console.error(e);
        }
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
                            <TextField sx={Sx.inputSx} id="email-login-form" type='email' label="Email" variant="filled" error={errors.email ? true : false} {...register('email', {
                                required: 'Pole jest wymagane',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Niepoprawny adres email'
                                }
                            })} />
                            <Typography variant='caption' align='center' color='error' >{errors.email?.message}</Typography>
                            <TextField sx={Sx.inputSx} id="password-login-form" type='password' label="Password" variant="filled" error={errors.password ? true : false} {...register('password', {
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