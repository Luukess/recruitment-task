import React from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Sx } from "./formmodal.style";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const FormModal = (props) => {

    const { children, openModal, onClickClose, title } = props;

    return (
        <>
            <Modal
                open={openModal}
                onClose={onClickClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openModal}>
                    <Box sx={Sx.modalBodySx}>
                        <Box component='div' sx={Sx.closeButtonContainerSx}>
                            <Typography variant="h5">
                                {title}
                            </Typography>
                            <IconButton onClick={onClickClose}>
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