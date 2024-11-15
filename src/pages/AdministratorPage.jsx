import React from 'react';

import { Box } from '@mui/material';
import { ReportingOrder, WorkDistribution } from '../components/WorkDistribution';

const AdministratorPage = () => {
    return (
        <Box sx={{width:"100%"}}>
            <ReportingOrder />
            <WorkDistribution />
        </Box>
    );
}

export default AdministratorPage;
