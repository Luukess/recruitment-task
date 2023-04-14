import React, { useMemo, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login-page/LoginPage';
import { Box, ThemeProvider } from '@mui/material';
import Menu from './components/menu/Menu';
import { LoginContext } from './contexts/loginContext';
import Toastify from './components/toastify/Toastify';
import HomePage from './pages/home-page/HomePage';
import ProtectedRoute from './components/protectedroute/ProtectedRoute';
import ProjectsPage from './pages/projects-page/ProjectsPage';
import PatientsPage from './pages/patients-page/PatientsPage';
import { theme } from './theme/theme';

function MedApp() {

    const [loggedState, setLoggedState] = useState(false);

    const providerValue = useMemo(() => ({ loggedState, setLoggedState }), [loggedState, setLoggedState]);

    const boxSx = {
        width: '100%',
        height: '100%',
        backgroundColor: '#F3FAFF'
    };

    return (
        <Box sx={boxSx} >
            <ThemeProvider theme={theme}>
                <LoginContext.Provider value={providerValue} >
                    <Menu />
                    <Routes>
                        <Route path='/' element={<Navigate to='/login' />} />
                        <Route exact path='/login' element={<LoginPage />} />
                        <Route element={<ProtectedRoute />} >
                            <Route path='/app/home' element={<HomePage />} />
                            <Route path='/app/projects' element={<ProjectsPage />} />
                            <Route path='/app/patients' element={<PatientsPage />} />
                        </Route>
                        <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                    <Toastify />
                </LoginContext.Provider>
            </ThemeProvider>
        </Box>
    );
};

export default MedApp;
