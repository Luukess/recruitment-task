import React, { useEffect, useState } from "react";
import { handleGetProject } from "../../../../services/api";
import { Sx } from "./projestdetails.style";
import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

const ProjectDetails = (props) => {

    const { projectId } = props;
    const [detailsData, setDetailsData] = useState(null);

    console.log(detailsData)
    const handleGetInfoProject = async () => {
        try {
            const projectResponse = await handleGetProject(projectId);
            if (projectResponse.status === 200) {
                setDetailsData(projectResponse.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        handleGetInfoProject();
    }, [])

    return (
        <>
            <Box component='div' sx={Sx.mainDetailsBoxSx}>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Typ projektu:</Typography>
                        <Typography sx={Sx.typographySx} >{detailsData?.projectType}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Tytuł:</Typography>
                        <Typography sx={Sx.typographySx} >{detailsData?.title}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Instytucja:</Typography>
                        <Typography sx={Sx.typographySx} >{detailsData?.institutionData}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Autor:</Typography>
                        <Typography sx={Sx.typographySx} >{detailsData?.author}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Alias:</Typography>
                        <Typography sx={Sx.typographySx} >{detailsData?.pNumber}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Data rozpoczęcia:</Typography>
                        <Typography sx={Sx.typographySx} >{detailsData?.dateStarted}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Data zakończenia:</Typography>
                        <Typography sx={Sx.typographySx} >{detailsData?.dateCompleted ? detailsData.dateCompleted : 'Brak'}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Źródło danych:</Typography>
                        <Typography sx={Sx.typographySx} >{detailsData?.dataSources}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Fundusz:</Typography>
                        <Typography sx={Sx.typographySx} >{detailsData?.financialFunds} zł</Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Typography color='primary' sx={Sx.typographySx} variant="h6">Status projektu:</Typography>
                        <Typography sx={Sx.typographySx} >{detailsData?.isFinished ? 'Zakończony' : 'W trakcie'}</Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ProjectDetails;