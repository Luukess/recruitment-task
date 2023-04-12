import React from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Sx } from "./formmodal.style";

const FormModal = (props) => {

    const {openModalAddProject, onClickAddProject} = props;

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

                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default FormModal;