import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, IconButton } from "@mui/material";
import React from "react";
import { Sx } from "./patientstable.style";
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const PatientsTable = (props) => {

    const { patientsArray, tableHeadings, patientsError, onClickUpdatePatientFormModal, setPatientId } = props;

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
                                    <IconButton >
                                        <MoreHorizIcon sx={{ fontSize: '16px' }} />
                                    </IconButton>
                                    <IconButton onClick={() => {onClickUpdatePatientFormModal(); setPatientId(patient.id) }}>
                                        <UpgradeIcon sx={{ fontSize: '16px' }} />
                                    </IconButton>
                                    <IconButton >
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