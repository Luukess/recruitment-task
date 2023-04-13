import React from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Sx } from "./formmodal.style";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const FormModal = (props) => {

    const { children, openModalAddProject, onClickAddProject, title } = props;

    return (
        <>
            <Modal
                open={openModalAddProject}
                onClose={onClickAddProject}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openModalAddProject}>
                    <Box sx={Sx.modalBodySx}>
                        <Box component='div' sx={Sx.closeButtonContainerSx}>
                            <Typography sx={{fontSize: '18px'}}>
                                {title}
                            </Typography>
                            <IconButton onClick={onClickAddProject}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        {children}
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default FormModal;