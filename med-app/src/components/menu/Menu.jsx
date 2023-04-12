import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Drawer, Box, IconButton, Typography, Button } from '@mui/material';
import { Sx } from './menu.style';
import MenuIcon from '@mui/icons-material/Menu';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { LoginContext } from '../../contexts/loginContext';
import ScienceIcon from '@mui/icons-material/Science';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';

const Menu = () => {

    const { loggedState, setLoggedState } = useContext(LoginContext)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogOutUser = () => setLoggedState(!loggedState);

    return (
        <>
            <AppBar position="static" sx={Sx.appBarSx}>
                <Toolbar variant="dense" sx={Sx.toolbarSx}>
                    <Box sx={Sx.innerBoxOne} component='div'>
                        {loggedState &&
                            <IconButton onClick={() => setIsDrawerOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                        }
                        <Typography variant='h6' sx={{ padding: '8px', display: 'flex', alignItems: 'center' }}>
                            <ScienceIcon sx={{ fontSize: '22px' }} /> MedApp
                        </Typography>
                    </Box>
                    <Box sx={Sx.innerBoxTwo}>
                        {loggedState &&
                            <Button onClick={handleLogOutUser} type='button' variant="contained" startIcon={<PowerSettingsNewIcon />} >Wyloguj</Button>
                        }
                    </Box>
                    <Drawer
                        anchor='left'
                        open={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}
                    >
                        <Box sx={Sx.drawerBox}>
                            <Box component='div' sx={{ padding: '20px' }} >
                                <Typography sx={Sx.logoNavSx}>
                                    <ScienceIcon sx={{ fontSize: '40px' }} /> MedApp
                                </Typography>
                            </Box>
                            <Box component='div' sx={{ padding: '10px' }}>
                                <Grid container spacing={4}>
                                    <Grid xs={12}>
                                        <Button sx={Sx.navLinkSx} type='button' variant="contained" size='small' component='a' onClick={() => navigate('/app/home')} >
                                            Strona główna
                                        </Button>
                                    </Grid>
                                    <Grid xs={12}>
                                        <Button sx={Sx.navLinkSx} type='button' variant="contained" size='small' component='a' onClick={() => navigate('/app/projects')} >
                                            Projekty
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Drawer>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Menu;