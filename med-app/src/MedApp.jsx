import * as React from 'react';
import { Route, Routes, } from 'react-router-dom';
import LoginPage from './pages/login-page/LoginPage';
import Box from '@mui/material/Box';
import Menu from './components/menu/Menu';

function MedApp() {

  const boxSx = {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#F3FAFF'
  };

  return (
    <Box sx={boxSx} >
      <Menu />
      <Routes>
        <Route exact path='/login' element={<LoginPage />} />
        <Route path='*' element={<LoginPage />} />
      </Routes>
    </Box>
  );
};



export default MedApp;
