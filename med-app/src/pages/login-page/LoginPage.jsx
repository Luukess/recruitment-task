import React, { useState } from 'react';
import { Box, Card, TextField, CardContent, CardMedia, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Sx } from './loginpage.style';

const LoginPage = () => {

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    return (
        <Box sx={Sx.boxSx}>
            <Card sx={Sx.mainCardSx}>
                <CardContent>
                    <Box sx={{height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} component='div'>
                        <PersonIcon  sx={{fontSize: '80px'}} />
                    </Box>
                    <Box component='form' noValidate autoComplete="off">
                        <Box component='div'>
                            <TextField sx={Sx.inputSx} id="email-login-form" type='email' label="Email" variant="outlined" value={emailValue} />
                            <TextField sx={Sx.inputSx} id="password-login-form" type='password' label="Password" variant="outlined" value={passwordValue} />
                        </Box>
                        <Box>
                            <Button sx={Sx.formButtonSx} variant="contained">Zaloguj</Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginPage;