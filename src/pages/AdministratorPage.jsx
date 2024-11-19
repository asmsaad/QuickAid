import React, { useState } from 'react';

import { Box } from '@mui/material';
import { ReportingOrder, WorkDistribution } from '../components/WorkDistribution';

const AdministratorPage = () => {
    const [reportingOrderData,setReportingOrderData] = useState(null)
    return (
        <Box sx={{width:"100%"}}>
            <ReportingOrder setReportingOrderData={setReportingOrderData} />
            <WorkDistribution />
        </Box>
    );
}

export default AdministratorPage;
