import React, { useState } from 'react';
import { AppBar, Toolbar, Drawer, Box, IconButton, Typography } from '@mui/material';
import { Sx } from './menu.style';
import MenuIcon from '@mui/icons-material/Menu';

const Menu = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense" sx={Sx.toolbarSx}>
                    <IconButton onClick={() => setIsDrawerOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6'>
                        Logo
                    </Typography>
                    <Drawer
                        anchor='left'
                        open={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}
                    >
                        <Box sx={Sx.boxSx}>

                        </Box>
                    </Drawer>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Menu;