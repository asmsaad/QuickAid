import React, { useState, useEffect, MouseEvent } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { HomeOutlined, PieChartOutlined, SignatureOutlined, TeamOutlined, BugOutlined, DeploymentUnitOutlined, CrownOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Leftbar from "../Segments/Leftbar";

import { useQuery } from "react-query"; //* React Query
import axios from "axios"; //* React Query
import { getCookie } from "../utility";
import { logPrint } from "../authentication/logPrint";
import { getAPI } from "../apis/apis";
import { getLoginUserID } from "../authentication/localStorage";

export default function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const location = useLocation();
    const currentPath = location.pathname;
    const [countKeys, setCountKeys] = useState(0);

    //Todo[QUEARY] tab access eligibility
    //*API Setup
    const fetchNewCreateVendor = () => {
        return axios.post(getAPI("all-access-tags-by-master"), { empid: getLoginUserID(), access_block_name: ["Administrator", "Superuser"] }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_accessTags,
        data: data_accessTags,
        isError: isError_accessTags,
        error: error_accessTags,
        isFetching: isFetching_accessTags,
        refetch: refetch_accessTags,
    } = useQuery("all-access-tags-by-master-UNIQUE-2", fetchNewCreateVendor, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_accessTags) {
            logPrint("🔍   administratorTabAvailabilityCheck  ➤  🔄");
        } else if (data_accessTags?.data) {
            logPrint("🔍   administratorTabAvailabilityCheck  ➤  🟢", data_accessTags?.data);
        } else if (isError_accessTags) {
            logPrint("🔍   administratorTabAvailabilityCheck  ➤  ⚠️", [error_accessTags.message, error_accessTags.response.data]);
        }
    }, [isLoading_accessTags, data_accessTags, isError_accessTags, error_accessTags]);

    //Todo🔍   All Subordinate Contributors for supervisor tab eligibility
    //*API Setup
    const fetchAllSubordinatesNameData = () => {
        return axios.post(getAPI("user-subordinates"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_subordinateData,
        data: data_subordinateData,
        isError: isError_subordinateData,
        error: error_subordinateData,
        isFetching: isFetching_subordinateData,
        refetch: refetch_subordinateData,
    } = useQuery("user-subordinates-UNIQUE-2", fetchAllSubordinatesNameData, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_subordinateData) {
            logPrint("🔍   allSubordinateUnderLoginUser-2  ➤  🔄");
        } else if (data_subordinateData?.data) {
            logPrint("🔍   allSubordinateUnderLoginUser-2  ➤  🟢", data_subordinateData?.data);
        } else if (isError_subordinateData) {
            logPrint("🔍   allSubordinateUnderLoginUser-2  ➤  ⚠️", [error_subordinateData.message, error_subordinateData.response.data]);
        }
    }, [isLoading_subordinateData, data_subordinateData, isError_subordinateData, error_subordinateData]);

    const DrawerList = (
        <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <Link to="/prosync" style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItem disablePadding sx={{ borderRadius: "5" }}>
                        <ListItemButton selected={currentPath.trim() === "/prosync"}>
                            <ListItemIcon>
                                <HomeOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                </Link>

                <Link disabled to="/prosync/submissions" style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItem disablePadding sx={{ borderRadius: "5" }}>
                        <ListItemButton selected={currentPath.includes("/prosync/submissions")}>
                            <ListItemIcon>
                                <SignatureOutlined />
                            </ListItemIcon>
                            <ListItemText primary="My Submissions" />
                        </ListItemButton>
                    </ListItem>
                </Link>

                <Link to="/prosync/projects" style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItem disablePadding>
                        <ListItemButton disabled selected={currentPath.includes("/prosync/projects")}>
                            <ListItemIcon>
                                <PieChartOutlined />
                            </ListItemIcon>
                            <ListItemText primary="My Projects" />
                        </ListItemButton>
                    </ListItem>
                </Link>

                {Object.keys(data_subordinateData?.data ?? {}).length > 0 && (
                    <Link to="/prosync/subordinates" style={{ textDecoration: "none", color: "inherit" }}>
                        <ListItem disablePadding>
                            <ListItemButton selected={currentPath.includes("/prosync/subordinates")}>
                                <ListItemIcon>
                                    <TeamOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Subordinates" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                )}
                {Object.keys(data_accessTags?.data["Administrator"] ?? {}).length > 0 && (
                    <Link to="/prosync/administrator" style={{ textDecoration: "none", color: "inherit" }}>
                        <ListItem disablePadding>
                            <ListItemButton selected={currentPath.includes("/prosync/administrator")}>
                                <ListItemIcon>
                                    <DeploymentUnitOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Administrator" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                )}

                {Object.keys(data_accessTags?.data["Superuser"] ?? {}).length > 0 && (
                    <Link to="/prosync/superuser" style={{ textDecoration: "none", color: "inherit" }}>
                        <ListItem disablePadding>
                            <ListItemButton selected={currentPath.includes("/prosync/superuser")}>
                                <ListItemIcon>
                                    <CrownOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Superuser" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                )}

                <Link to="/prosync/report" style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItem disablePadding>
                        <ListItemButton selected={currentPath.includes("/prosync/report")}>
                            <ListItemIcon>
                                <BugOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Report Bug" />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
        </Box>
    );

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <MenuIcon onClick={toggleDrawer(true)} />
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box>
    );
}
