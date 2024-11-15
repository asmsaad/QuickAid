import React, { useEffect, useState } from "react";
import { makeStyles, mergeClasses, tokens, Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, Tab, TabList, useIsOverflowItemVisible, useOverflowMenu, Overflow, OverflowItem } from "@fluentui/react-components";
import { Link, useLocation } from "react-router-dom";
import { BugFilled, HomeFilled, bundleIcon, BugRegular, HomeRegular, ClipboardTextEditFilled, ClipboardTextEditRegular, ClipboardTextRtlRegular, ClipboardTextRtlFilled, DataPieFilled, DataPieRegular, PeopleCommunityRegular, PeopleCommunityFilled, OrganizationRegular, OrganizationFilled, PersonStarburstRegular, PersonStarburstFilled, MoreHorizontalFilled, MoreHorizontalRegular, BranchRequestFilled, HistoryFilled, HistoryRegular, BranchRequestRegular, FormFilled, FormRegular } from "@fluentui/react-icons";
import { Box } from "@mui/material";
import { useQuery } from "react-query"; //* React Query
import axios from "axios"; //* React Query

import { getAPI } from "../apis/apis";
import { getLoginUserID } from "../authentication/localStorage";
import { logPrint } from "../authentication/logPrint";
import { getCookie } from "../utility";

import automation_team_logo from "./../media/automationTeam.png";

const MoreHorizontal = bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular);

const IconBug = bundleIcon(BugFilled, BugRegular);
const IconHome = bundleIcon(HomeFilled, HomeRegular);
const IconForm = bundleIcon(FormFilled , FormRegular );
const IconRequest = bundleIcon(BranchRequestFilled, BranchRequestRegular);
const IconHistory = bundleIcon(HistoryFilled, HistoryRegular);
// const IconAdministrator = bundleIcon(HistoryFilled, HistoryRegular);

const IconSubmission = bundleIcon(ClipboardTextEditFilled, ClipboardTextEditRegular);
const IconSubmission_ = bundleIcon(ClipboardTextRtlFilled, ClipboardTextRtlRegular);
const IconProjects = bundleIcon(DataPieFilled, DataPieRegular);
const IconSubordinates = bundleIcon(PeopleCommunityFilled, PeopleCommunityRegular);
const IconSuperuser = bundleIcon(PersonStarburstFilled, PersonStarburstRegular);
const IconAdministrator = bundleIcon(OrganizationFilled, OrganizationRegular);

const useStyles = makeStyles({
    root: {
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
});

export const ShortLeftNavBar = () => {
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
    } = useQuery("user-subordinates-UNIQUE-4", fetchAllSubordinatesNameData, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_subordinateData) {
            logPrint("🔍   allSubordinateUnderLoginUser-3  ➤  🔄");
        } else if (data_subordinateData?.data) {
            logPrint("🔍   allSubordinateUnderLoginUser-3  ➤  🟢", data_subordinateData?.data);
        } else if (isError_subordinateData) {
            logPrint("🔍   allSubordinateUnderLoginUser-3  ➤  ⚠️", [error_subordinateData.message, error_subordinateData.response.data]);
        }
    }, [isLoading_subordinateData, data_subordinateData, isError_subordinateData, error_subordinateData]);

    const tabs = [
        { id: "/quickaid", name: "Home", icon: <IconHome /> },
        { id: "/form", name: "Form", icon: <IconForm /> },
        { id: "/request", name: "Request", icon: <IconRequest /> },
        { id: "/history", name: "History", icon: <IconHistory /> },
        { id: "/administrator", name: "Administrator", icon: <IconAdministrator /> },
        // { id: "/administrator ", name: "Administrator ", icon: <IconAdministrator /> },
        // { id: "/subordinates", name: "Subordinates", icon: <IconSubordinates /> },
        // { id: "/administrator", name: "Administrator", icon: <IconAdministrator /> },
        // { id: "/superuser", name: "Superuser", icon: <IconSuperuser /> },
        // { id: "/report", name: "Report Bug", icon: <IconBug /> },
    ];

    const allowed_tabs = {
        "/quickaid": true,
        "/form": true,
        "/request": true,
        "/history": true,
        "/administrator": true,
        // "/subordinates": Object.keys(data_subordinateData?.data || {}).length > 0 ? true : false,
        // "/administrator": Object.keys(data_accessTags?.data?.["Administrator"] || {}).length > 0 ? true : false, //! Need to add loader sot that  after loading it can show
        // "/superuser": Object.keys(data_accessTags?.data?.["Superuser"] || {}).length > 0 ? true : false,
        // "/report": true,
    };

    // console.log(data_accessTags?.data?.["Superuser"],'==========!@@')

    const styles = useStyles();
    const location = useLocation();

    const [selectedTabId, setSelectedTabId] = useState((location.pathname.endsWith("/") ? location.pathname.slice(0, -1) : location.pathname).split("/")[1]);

    useEffect(() => {
        const newSelectedTab = location.pathname.split("/").length > 2 ? `/${location.pathname.split("/")[2]}` : `/${location.pathname.split("/")[1]}`;
        setSelectedTabId(newSelectedTab);
        // console.log(newSelectedTab, "===============");
    }, [location.pathname]);

    // const onTabSelect = (tabId) => {
    //     setSelectedTabId(tabId);
    // };

    const tabRootStyle = { position: "relative", flexDirection: "column", alignItems: "center", width: "100px", height: "45px" };
    const tabNameStyle = { position: "absolute", textAlign: "center", height: "20px", width: "100px", left: "0", bottom: "5px" };
    const iconStyle = { position: "absolute", top: "0", left: "calc(50% - 10px)" };

    const IconPosition = ({ tabicon }) => <div style={iconStyle}>{tabicon}</div>;

    return (
        <Box
            sx={{
                padding: "15px 10px",
                // display: "flex",
                display: { xs: "none", sm: "none", md: "none", lg: "flex" },
                flexDirection: "column",
                justifyContent: "space-between",
                background: "linear-gradient(90deg, rgba(231,231,231,1) 0%, rgba(242,242,242,1) 35%, rgba(251,251,251,1) 75%)",
                height: "calc(100vh -140px)",
            }}
        >
            <TabList
                // selectedValue={selectedTabId}

                className={styles.root}
                style={{
                    // background: "linear-gradient(90deg, rgba(231,231,231,1) 0%, rgba(242,242,242,1) 35%, rgba(251,251,251,1) 75%)",
                    // height: "calc(100vh -140px)",
                    gap: "10px",
                }}
                // defaultSelectedValue="/quickaid"
                vertical
                selectedValue={selectedTabId}
            >
                {tabs.map(
                    (tab, index) =>
                        allowed_tabs[tab.id] && (
                            <Link key={tab.id} to={`/quickaid${tab.id === "/quickaid" ? "" : tab.id}`}>
                                <Tab style={tabRootStyle} icon={<IconPosition tabicon={tab.icon} />} value={tab.id}>
                                    <div style={tabNameStyle}>{tab.name}</div>
                                </Tab>
                            </Link>
                        )
                )}
            </TabList>

            <Box style={{ width: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={automation_team_logo} alt="Descriptive Alt Text" style={{ maxWidth: "100px", height: "auto", userSelect: "none", pointerEvents: "none" }} draggable="false" />
            </Box>
        </Box>
    );
};
