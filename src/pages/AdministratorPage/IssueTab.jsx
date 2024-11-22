// rafce
import { Box } from "@mui/material";
import React from "react";
import DataViewTable from "../../components/DataViewTable";

const IssueTab = () => {
    return (
        <Box sx={{width:"calc(100% - 10px)",margin:"0 0 10px 10px",display:"flex", bgcolor:"green"}}>
            <div>IssueTab</div>
            <DataViewTable />
        </Box>
    );
};

export default IssueTab;
