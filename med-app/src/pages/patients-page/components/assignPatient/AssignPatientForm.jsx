import React, { useState } from "react";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { Sx } from "./assignpatientform.style";
import { useForm } from "react-hook-form";
import { handleGetPatient, handlePutPatient } from "../../../../services/api";
import { handleErrorToast, handleSuccessToast } from "../../../../components/toastify/Toastify";
import { handleFilteredPatientsToAssign } from "../../../../utils/filteringFunction";

const AssignPatientForm = (props) => {

    const { projectArray, patientsArray, setPatientsArray } = props;

    const [defaultFormObjec, setDefaultFormObject] = useState({
        patientId: 0,
        projectId: 0
    });

    const [patientidSelect, setPatientIdSelect] = useState(0);
    const [projectIdSelect, setProjectIdSelect] = useState(0);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: defaultFormObjec });

    const filteredPatients = [...handleFilteredPatientsToAssign(patientsArray)];

    const onSubmit = async (data) => {
        try {
            const patientGetResponse = await handleGetPatient(data.patientId);
            if (patientGetResponse.status === 200) {
                const formData = {
                    ...patientGetResponse.data,
                    projectId: data.projectId
                }
                const patientPutResponse = await handlePutPatient(data.patientId, formData);

                if (patientPutResponse.status === 200) {
                    handleSuccessToast('Przydzielono pacjenta');
                    setPatientsArray((data) => {
                        const allPatients = data.filter((patient) => {
                            return patient.id !== patientGetResponse.data.id;
                        });
                        return [...allPatients, formData];
                    });
                    reset();
                    setPatientIdSelect(0);
                    setProjectIdSelect(0)
                };
            };

        } catch (e) {
            console.log(e);
            handleErrorToast('Przydzielenie pacjenta nie powiodło się')
        }
    };

    return (
        <>
            <Box onSubmit={handleSubmit(onSubmit)} component='form' autoComplete="off" sx={Sx.mainFormBox}>
                <Box component='div' sx={{ marginBottom: '16px' }}>
                    <Grid container rowSpacing={4} spacing={2}>
                        <Grid xs={12} sm={6}>
                            <Select
                                error={errors.projectId ? true : false}
                                variant="filled"
                                size="small"
                                sx={Sx.inputSx}
                                id="project-select"
                                value={projectIdSelect}
                                {...register('projectId', {
                                    required: true,
                                    validate: (value) => {
                                        if (value === 0) {
                                            return 'Nie wybrano projektu';
                                        } else {
                                            return true;
                                        };
                                    },
                                    onChange: (e) => setProjectIdSelect(e.target.value)
                                })}
                            >
                                <MenuItem value={0}>Wybierz projekt</MenuItem>
                                {projectArray?.map((project, i) => (
                                    <MenuItem key={i} value={project?.id}>{project?.title}</MenuItem>
                                ))}
                            </Select>
                            <Typography variant='caption' align='center' color='error'>
                                {errors.projectId?.message}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Select
                                error={errors.patientId ? true : false}
                                variant="filled"
                                size="small"
                                sx={Sx.inputSx}
                                id="patients-select"
                                value={patientidSelect}
                                {...register('patientId', {
                                    required: true,
                                    validate: (value) => {
                                        if (value === 0) {
                                            return 'Nie wybrano pacjenta'
                                        } else {
                                            return true;
                                        };
                                    },
                                    onChange: (e) => setPatientIdSelect(e.target.value)
                                })}
                            >
                                <MenuItem value={0}>Wybierz pacjenta</MenuItem>
                                {filteredPatients?.map((patient, i) => (
                                    <MenuItem key={i} value={patient?.id}>{`${patient?.name} ${patient?.surname}`}</MenuItem>
                                ))}
                            </Select>
                            <Typography variant='caption' align='center' color='error'>
                                {errors.patientId?.message}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box component='div' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="submit" variant="contained">Dodaj</Button>
                </Box>
            </Box>
        </>
    );
};

export default AssignPatientForm;