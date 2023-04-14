import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Sx } from "./patientstable.style";
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { handleErrorToast, handleSuccessToast } from "../../../../components/toastify/Toastify";
import { handleDeletePatient } from "../../../../services/api";

const PatientsTable = (props) => {

    const { patientsArray, tableHeadings, patientsError, onClickUpdatePatientFormModal, setPatientId, patientId, setPatientsArray, onClickPatientsDetailsModal } = props;

    const handleRemovePatient = async (id) => {
        try{
            const patientResponse = await handleDeletePatient(id);

            if(patientResponse.status === 200){
                handleSuccessToast('Usunięto pacjenta');
                setPatientsArray((data) => {
                    const allData = data.filter((patient) => {
                        return patient.id !== id;
                    });
                    return [...allData];
                });
            }
        }catch(e){
            console.log(e);
            handleErrorToast('Usunięcie pacjenta nie powiodło się')
        }
    };

    return (
        <TableContainer sx={{ height: '100%' }} component={Paper} aria-label="patients table">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={Sx.tableCellSx} align="center"></TableCell>
                        {tableHeadings?.map((heading, i) => (
                            <TableCell key={i} sx={Sx.tableCellSx} align="center">{heading}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {!patientsError.error &&
                    <TableBody>
                        {patientsArray?.map((patient, i) => (
                            <TableRow key={i} >
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <IconButton onClick={() => {onClickPatientsDetailsModal(); setPatientId(patient?.id)}}>
                                        <MoreHorizIcon sx={{ fontSize: '16px' }} />
                                    </IconButton>
                                    <IconButton onClick={() => {onClickUpdatePatientFormModal(); setPatientId(patient?.id) }}>
                                        <UpgradeIcon sx={{ fontSize: '16px' }} />
                                    </IconButton>
                                    <IconButton onClick={() => {handleRemovePatient(patient?.id)}} >
                                        <DeleteIcon sx={{ fontSize: '16px' }} />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    {patient.name}
                                </TableCell>
                                <TableCell align="center">
                                    {patient.surname}
                                </TableCell>
                                <TableCell align="center">
                                    {patient.city}
                                </TableCell>
                                <TableCell align="center">
                                    {`ul. ${patient.street} ${patient.houseNumber} / ${patient.apartmentNumber}`}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                }
            </Table>
        </TableContainer>
    );
};

export default PatientsTable;