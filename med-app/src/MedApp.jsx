import React, { useMemo, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login-page/LoginPage';
import Box from '@mui/material/Box';
import Menu from './components/menu/Menu';
import { LoginContext } from './contexts/loginContext';
import Toastify from './components/toastify/Toastify';

function MedApp() {

    const [loggedState, setLoggedState] = useState(false);

    const providerValue = useMemo(() => ({ loggedState, setLoggedState }), [loggedState, setLoggedState]);

    const boxSx = {
        width: '100vw',
        height: '100vh',
        backgroundColor: '#F3FAFF'
    };

    return (
        <Box sx={boxSx} >
            <LoginContext.Provider value={providerValue} >
                <Menu />
                <Routes>
                    <Route path='/' element={<Navigate to='/login' />} />
                    <Route exact path='/login' element={<LoginPage />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
                <Toastify />
            </LoginContext.Provider>
        </Box>
    );
};

export default MedApp;
