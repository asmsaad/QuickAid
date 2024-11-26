import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ReportingOrder, WorkDistribution } from "../components/WorkDistribution";
import { Outlet, Link, useNavigate, useLocation, useParams } from "react-router-dom";

//*---------------------------------------------------------------------
import { useQuery } from "react-query"; //* React Query                 |
import axios from "axios"; //* React Query                              |
import { getAPI } from "../apis/apis"; //*                              |
import { getLoginUserID } from "../authentication/localStorage"; //*    |
import { logPrint } from "../authentication/logPrint"; //*              |
import { getCookie } from "../utility"; //*                             |
import { Tabs } from "antd";
import { Padding } from "@mui/icons-material";
//*---------------------------------------------------------------------

const AdministratorPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState(location.pathname.split("/").slice(-1)[0]);

    // Mapping object for paths and tab keys
    const tabMapping = {
        "/quickaid/admin/issue": "issue",
        "/quickaid/admin/sub-issue": "sub-issue",
        "/quickaid/admin/hierarchy": "hierarchy",
        "/quickaid/admin/distributions": "distributions",
        "/quickaid/admin/locations": "locations",
    };

    // Update the selected tab based on the current path
    useEffect(() => {
        const currentTab = tabMapping[location.pathname];
        if (currentTab) {
            setSelectedTab(currentTab);
        } else {
            navigate("/quickaid/admin/issue"); // Redirect to the default tab if the current path is not in the mapping
        }
    }, [location.pathname, navigate]);

    // Function to handle tab changes
    const onChange = (key) => {
        setSelectedTab(key);
        navigate(key); // Navigating relative to the current route
        logPrint("[SELECTED TAB]", key);
    };

    const items = [
        { key: "issue", label: <Link to="issue">Issue</Link> },
        { key: "sub-issue", label: <Link to="sub-issue">Sub-issue</Link> },
        { key: "hierarchy", label: <Link to="hierarchy">Hierarchy</Link> },
        { key: "distributions", label: <Link to="distributions">Distributions</Link> },
        { key: "locations", label: <Link to="locations">Locations</Link> },
    ];

    return (
        <Box flex="1" sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }} overflow="auto">
            <Box className="Tabs" sx={{ width: "100%", position: "sticky", top: "0", zIndex: "999" }}>
                <Tabs size="large" activeKey={selectedTab} items={items} onChange={onChange} style={{ width: `calc(100% - 20px)`, margin: "0 10px", position: "sticky", top: "0", zIndex: "100", backgroundColor: "white" }} />
            </Box>
            <Box style={{ width: "100%", overflowY: "auto", flex:1}}>
            {/* <Box style={{ width: "100%", overflowY: "auto", backgroundColor :'red', flex:1}}> */}
                <Outlet /> {/* Make sure this is included to render nested routes */}
            </Box>
        </Box>
    );
};

// return (
//     <Box flex="1" sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }} overflow="auto">
//         {isLoading_accessTags ? (
//             <LoadingSpin />
//         ) : Object.keys(data_accessTags?.data?.["Administrator"] || {}).length > 0 ? (
//             <>
//                 <Box className="Tabs" sx={{ width: "100%", position: "sticky", top: "0", zIndex: "999" }}>
//                     <Tabs size="large" activeKey={selectedTab} items={items} onChange={onChange} style={{ width: `calc(100% - 20px)`, margin: "0 10px", position: "sticky", top: "0", zIndex: "100", backgroundColor: "white" }} />
//                 </Box>
//                 <Box style={{ width: "100%", overflowY: "auto" }}>
//                     <Outlet /> {/* Make sure this is included to render nested routes */}
//                 </Box>
//             </>
//         ) : (
//             <PageDoNotAccese />
//         )}
//     </Box>
// );

// const AdministratorPage = () => {
//     // const [reportingOrderData,setReportingOrderData] = useState(null)
//     const [workDistributionData, setWorkDistributionData] = useState(null)
//     return (
//         <Box sx={{width:"100%"}}>
//             <ReportingOrder workDistributionData={workDistributionData} setWorkDistributionData={setWorkDistributionData} />
//             <WorkDistribution workDistributionData={workDistributionData} setWorkDistributionData={setWorkDistributionData}/>
//         </Box>
//     );
// }

export default AdministratorPage;
